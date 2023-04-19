import { BrowserWindow, type Tray } from "electron";
import path from "node:path";
import positioner from "electron-traywindow-positioner";

const window = new BrowserWindow({
	width: 400,
	height: 600,
	show: false,
	frame: false,
	icon: path.join(__dirname, "static", "iconp.png"),
	webPreferences: {
		nodeIntegration: false,
	},
	titleBarStyle: "hidden",
	skipTaskbar: true,
});
export const instance = window;

window.on("blur", () => {
	window.hide();
});

export const navigateToHome = async () => {
	await window.loadURL("https://chat.openai.com/chat");
};

export const toggleVisibility = () => {
	if (window.isVisible()) {
		window.hide();
	} else {
		window.show();
	}

	return window.isVisible();
};

export const alignWithTray = (tray: Tray) => {
	positioner.position(window, tray.getBounds());
};
