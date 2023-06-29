export interface Updater {
	Update(): void;
}

export interface Owner {
	OnConnect(): void;
	OnDisconnect(): void;
	OnRemove(): void;
}