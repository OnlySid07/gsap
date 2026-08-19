/* Coordinar pantalla de carga, inicio de carga de vídeos y mostrar UI.
 * El estado vive en `documentElement` para que funcione aunque Astro
 * empaquete una copia distinta de este módulo por componente. */

const READY = "loading:ready";
const DONE = "loading:done";

function hasFlag(key: "loadingReady" | "loadingDone") {
	return document.documentElement.dataset[key] === "true";
}

function subscribe(event: string, already: boolean, callback: () => void) {
	if (already) {
		callback();
		return;
	}

	document.addEventListener(event, callback, { once: true });
}

export function markLoadingReady() {
	if (hasFlag("loadingReady")) return;

	document.documentElement.dataset.loadingReady = "true";
	document.dispatchEvent(new CustomEvent(READY));
}

export function markLoadingDone() {
	if (hasFlag("loadingDone")) return;

	document.documentElement.dataset.loadingDone = "true";
	document.dispatchEvent(new CustomEvent(DONE));
}

export function onLoadingReady(callback: () => void) {
	subscribe(READY, hasFlag("loadingReady"), callback);
}

export function onLoadingDone(callback: () => void) {
	subscribe(DONE, hasFlag("loadingDone"), callback);
}