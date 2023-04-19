import { app } from "electron";
import { isMacOs } from "./platform";

export const createApp = () => {
	app.on("ready", async () => {
		const tray = await import("./tray");
		const window = await import("./window");

		await window.navigateToHome();
		window.alignWithTray(tray.instance);
	});

	app.on("window-all-closed", () => {
		if (isMacOs) {
			app.quit();
		}
	});
};

