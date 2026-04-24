import { CONFIG } from "../config.js"
import type { GameState } from "../../types/GameState.js"
import type { RandomSource } from "../utils/random.js"
import { createWaveAsteroids } from "../utils/spawn.js"
import { Asteroid } from "../../entities/Asteroid.js"
import { AsteroidSize } from "../../types/AsteroidSize.js"
import { splitAsteroid } from "../utils/spawn.js"

function scoreForSize(size: AsteroidSize): number {
  if (size === AsteroidSize.Large) {
    return CONFIG.scoreLarge
  }
  if (size === AsteroidSize.Medium) {
    return CONFIG.scoreMedium
  }
  return CONFIG.scoreSmall
}

export function onShipHit(state: GameState): void {
  state.lives -= 1
  if (state.lives > 0) {
    state.ship.respawn(CONFIG.width / 2, CONFIG.height / 2)
    return
  }
  state.phase = "game_over"
}

export function onBulletAsteroidHit(state: GameState, asteroid: Asteroid, random: RandomSource): Asteroid[] {
  state.score += scoreForSize(asteroid.size)
  return splitAsteroid(asteroid, random)
}

export function onWaveCleared(state: GameState, random: RandomSource): void {
  if (state.phase !== "playing" || state.asteroids.length > 0) {
    return
  }
  state.wave += 1
  state.asteroids = createWaveAsteroids(state.wave, state.ship.position, CONFIG.width, CONFIG.height, random)
}

export function removeDestroyedEntities(state: GameState): void {
  state.asteroids = state.asteroids.filter((asteroid) => asteroid.alive)
  state.bullets = state.bullets.filter((bullet) => bullet.alive)
}
