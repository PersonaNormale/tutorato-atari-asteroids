import { Asteroid } from "../../entities/Asteroid.js"
import type { GameState } from "../../types/GameState.js"
import type { RandomSource } from "../utils/random.js"
import { circlesCollide } from "../utils/collision.js"
import { onBulletAsteroidHit } from "../state/transitions.js"

// Risolve le collisioni tra Bullets e Asteroids
// Codice abbastanza autoesplicativo
export function resolveBulletAsteroidCollisions(state: GameState, random: RandomSource): void {
  const spawnedFragments: Asteroid[] = []
  for (const bullet of state.bullets) {
    if (!bullet.alive) {
      continue
    }

    for (const asteroid of state.asteroids) {
      if (!asteroid.alive) {
        continue
      }

      if (circlesCollide(bullet, asteroid)) {
        bullet.alive = false
        asteroid.alive = false
        spawnedFragments.push(...onBulletAsteroidHit(state, asteroid, random))
        break
      }
    }
  }
  state.asteroids.push(...spawnedFragments)
}

// Risolve le collisioni tra Ship e Asteroids
export function shipCollidesWithAsteroid(state: GameState): boolean {
  if (state.ship.invulnerabilityTimer > 0) {
    return false
  }

  for (const asteroid of state.asteroids) {
    // circlesCollide perché l'hitbox è un cerchio
    if (asteroid.alive && circlesCollide(state.ship, asteroid)) {
      return true
    }
  }
  return false
}
