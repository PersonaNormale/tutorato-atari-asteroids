import type { GameState } from "../../types/GameState.js"
import type { RandomSource } from "../utils/random.js"
import { onShipHit, onWaveCleared, removeDestroyedEntities } from "../state/transitions.js"

/*
  Questo file espone piccoli wrapper tra il loop di gioco
  e le transizioni dello stato.
*/

export function handleShipDeath(state: GameState): void {
  onShipHit(state)
}

export function cleanupDestroyedEntities(state: GameState): void {
  removeDestroyedEntities(state)
}

export function advanceWaveIfCleared(state: GameState, random: RandomSource): void {
  onWaveCleared(state, random)
}
