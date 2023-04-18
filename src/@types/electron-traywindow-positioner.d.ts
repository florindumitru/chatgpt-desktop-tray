type BrowserWindow = import("electron").BrowserWindow;
type Rectangle = import("electron").Rectangle;

declare module "electron-traywindow-positioner" {
	declare const positioner: Positioner;
	export default positioner;

	export type TaskbarPosition = "top" | "right" | "bottom" | "left";

	export type Coordinate2D = {
		x: number;
		y: number;
	};

	export type Positioner = {
		getTaskbarPosition(trayBounds: Rectangle): TaskbarPosition;
		calculate(windowBounds: Rectangle, trayBounds: Rectangle, alignment?: Partial<Coordinate2D>): Coordinate2D;
		position(window: BrowserWindow, trayBounds: Rectangle, alignment?: Partial<Coordinate2D>): void;
	};
}
