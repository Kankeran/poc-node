export interface Updater {
	Update(): void;
}

export interface OnConnector {
	OnConnect(): void;
	OnDisconnect(): void;
}