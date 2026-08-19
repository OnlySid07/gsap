/* Coordinar pantalla de carga, inicio de carga de vídeos y mostrar UI */

const READY = 'loading:ready'
const DONE = 'loading:done'

/* Estado compartido */
let ready = false // el contador ha llegado al 100%
let done = false // el overlay rojo ha salido de la pantalla

function subscribe(event: string, already: boolean, callback: () => void) {
  if (already) {
    callback()
    return
  }

  document.addEventListener(event, callback, { once: true })
}

/* Contador al 100% */
export function markLoadingReady() {
  if (ready) return

  ready = true
  document.dispatchEvent(new CustomEvent(READY))
}

export function markLoadingDone() {
  if (done) return

  done = true
  document.dispatchEvent(new CustomEvent(DONE))
}

export function onLoadingReady(callback: () => void) {
  subscribe(READY, ready, callback)
}

export function onLoadingDone(callback: () => void) {
  subscribe(DONE, done, callback)
}