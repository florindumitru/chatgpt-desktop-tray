import { Menu, Tray } from "electron";
import path from "node:path";
import * as window from "./window";

const tray = new Tray(path.join(__dirname, "assets", "tray-icon.png"));
export const instance = tray;

const contextMenu = Menu.buildFromTemplate([
	{ label: "Quit", type: "normal", role: "quit" },
]);

tray.on("click", () => {
	const isVisible = window.toggleVisibility();
	if (isVisible) {
		window.alignWithTray(tray);
	}
});

tray.on("right-click", () => {
	tray.popUpContextMenu(contextMenu);
});

