const { app, BrowserWindow, Tray, Menu, shell } = require("electron");
const path = require("path");
const process = require("process");
const positioner = require("electron-traywindow-positioner");

let window = null;
let tray = null;

const showWindow = () => {
	positioner.position(window, tray.getBounds());
	window.show();
};

const toggleWindow = () => {
	if (window.isVisible()) {
		return window.hide();
	}

	return showWindow();
};

const createTray = () => {
	tray = new Tray(path.join(__dirname, "static", "Icon.png"));
	tray.on("click", () => {
		toggleWindow();
	});
	tray.on("right-click", () => {
		const contextMenu = Menu.buildFromTemplate([
			{
				label: "Github",
				type: "normal",
				click() {
					shell.openExternal(
						"https://github.com/florindumitru/chatgpt-desktop-tray"
					);
				},
			},

			{ type: "separator" },
			{ label: "Quit", type: "normal", role: "quit" },
		]);

		tray.popUpContextMenu(contextMenu);
	});
};

const createWindow = () => {
	// Create the browser window.
	window = new BrowserWindow({
		width: 400,
		height: 600,
		show: false,
		frame: false,
		icon: path.join(__dirname, "static", "iconp.png"),
		webPreferences: {
			nodeIntegration: true,
		},
	});

	window.menuBarVisible = false;
	window.loadURL("https://chat.openai.com/chat");
	window.setSkipTaskbar(true);
	if (process.platform === "darwin") {
		app.dock.hide();
		app.dock.setIcon(path.join(__dirname, "static", "iconp.png"));
	}
};

app.on("ready", () => {
	createWindow();
	createTray();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
app.on("will-quit", () => {
	// GlobalShortcut.unregisterAll();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
