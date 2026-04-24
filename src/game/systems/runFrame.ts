import type { InputFrameSnapshot } from "../Input.js"
import type { GameState } from "../../types/GameState.js"
import type { RandomSource } from "../utils/random.js"
import { updateFromInput } from "./updateInput.js"
import { shipCollidesWithAsteroid, resolveBulletAsteroidCollisions } from "./resolveCollisions.js"
import { handleShipDeath, cleanupDestroyedEntities, advanceWaveIfCleared } from "./lifecycle.js"
import { updateWorld } from "./updateWorld.js"

// Funzione di ausilio per la morte della nave alla collisione con un asteroide 
function checkShipCollisionAndHandle(state: GameState): void {
  if (shipCollidesWithAsteroid(state)) {
    handleShipDeath(state)
  }
}

// Funzione di orchestrazione del frame
export function runFrame(state: GameState, inputFrame: InputFrameSnapshot, dt: number, random: RandomSource): void {
  // Se il gioco è finito non c'è niente da orchestrare
  if (state.phase === "game_over") {
    return
  }

  // Si applica rotazione, thrust, sparo, hyperspace
  updateFromInput(state, inputFrame, dt, random)
  // Vediamo se dopo aver applicato i comandi vi è stata una collisione
  checkShipCollisionAndHandle(state)
  if (state.lives <= 0) {
    return
  }

  // Si aggiorna lo stato della simulazione
  updateWorld(state, dt)
  // Qua andiamo a vedere gli asteroidi colpiti per:
  //  1. Aggiornare lo score
  //  2. Generare frammenti
  //  3. Segnare entità colpite come morte 
  resolveBulletAsteroidCollisions(state, random)
  // Vediamo se abbiamo colliso con qualcosa
  // Serve a catturare collisioni nate durante il frame
  // La nave si muove e finisce dentro un asteroide
  // Oppure un asteroide si muove dentro la nave
  checkShipCollisionAndHandle(state)

  // Rimuoviamo entità morte dallo stato
  cleanupDestroyedEntities(state)
  // Se non ci sono asteroidi si va alla wave successiva
  advanceWaveIfCleared(state, random)
}
