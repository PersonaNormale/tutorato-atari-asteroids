import type { GameState } from "../../types/GameState.js"
import { CONFIG } from "../config.js"
import { wrapPosition } from "../utils/wrap.js"

// La funzione chiama sullo stato del gioco tutte le funzioni
// di update delle entità presenti
// In più applica l'effetto toroidale alle entità nello spazio
export function updateWorld(state: GameState, dt: number): void {
  state.ship.update(dt)

  for (const asteroid of state.asteroids) {
    asteroid.update(dt)
  }

  for (const bullet of state.bullets) {
    bullet.update(dt)
  }

  wrapPosition(state.ship.position, CONFIG.width, CONFIG.height)
  for (const asteroid of state.asteroids) {
    wrapPosition(asteroid.position, CONFIG.width, CONFIG.height)
  }
  for (const bullet of state.bullets) {
    wrapPosition(bullet.position, CONFIG.width, CONFIG.height)
  }
}
