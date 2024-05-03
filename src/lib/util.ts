export function random(min: number, max: number) {
	return min + Math.random() * (max - min);
}

export function wait(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}
export function sleep(ms: number) {
	return wait(ms);
}
