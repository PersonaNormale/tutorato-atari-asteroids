import { Asteroid } from "../../entities/Asteroid.js"
import { CONFIG } from "../config.js"
import { Vector2 } from "../math/Vector2.js"
import type { RandomSource } from "./random.js" 
import { randomDirection, randomRange } from "./random.js"
import { AsteroidSize } from "../../types/AsteroidSize.js"

function getRadiusBySize(size: AsteroidSize): number {
  if (size === AsteroidSize.Large) {
    return CONFIG.asteroidLargeRadius
  }
  if (size === AsteroidSize.Medium) {
    return CONFIG.asteroidMediumRadius
  }
  return CONFIG.asteroidSmallRadius
}

function getSpeedRangeBySize(size: AsteroidSize): [number, number] {
  if (size === AsteroidSize.Large) {
    return [CONFIG.asteroidLargeMinSpeed, CONFIG.asteroidLargeMaxSpeed]
  }
  if (size === AsteroidSize.Medium) {
    return [CONFIG.asteroidMediumMinSpeed, CONFIG.asteroidMediumMaxSpeed]
  }
  return [CONFIG.asteroidSmallMinSpeed, CONFIG.asteroidSmallMaxSpeed]
}

function createAsteroidAt(position: Vector2, size: AsteroidSize, random: RandomSource): Asteroid {
  const [minSpeed, maxSpeed] = getSpeedRangeBySize(size)
  const speed = randomRange(minSpeed, maxSpeed, random)
  const velocity = randomDirection(random).scale(speed)
  return new Asteroid(position.copy(), velocity, getRadiusBySize(size), size)
}

export function createWaveAsteroids(
  wave: number,
  shipPosition: Vector2,
  width: number,
  height: number,
  random: RandomSource = Math.random,
): Asteroid[] {
  const index = Math.min(wave - 1, CONFIG.waveAsteroidCounts.length - 1)
  const count = CONFIG.waveAsteroidCounts[index]
  const asteroids: Asteroid[] = []

  while (asteroids.length < count) {
    const border = Math.floor(randomRange(0, 4, random))
    let x = 0
    let y = 0

    if (border === 0) {
      x = randomRange(0, width, random)
      y = 0
    } else if (border === 1) {
      x = width
      y = randomRange(0, height, random)
    } else if (border === 2) {
      x = randomRange(0, width, random)
      y = height
    } else {
      x = 0
      y = randomRange(0, height, random)
    }

    const candidate = new Vector2(x, y)
    const dx = candidate.x - shipPosition.x
    const dy = candidate.y - shipPosition.y
    const distance = Math.hypot(dx, dy)

    if (distance >= CONFIG.spawnSafeDistanceFromShip) {
      asteroids.push(createAsteroidAt(candidate, AsteroidSize.Large, random))
    }
  }

  return asteroids
}

export function splitAsteroid(asteroid: Asteroid, random: RandomSource = Math.random): Asteroid[] {
  if (asteroid.size === AsteroidSize.Small) {
    return []
  }

  const nextSize = asteroid.size === AsteroidSize.Large ? AsteroidSize.Medium : AsteroidSize.Small
  return [
    createAsteroidAt(asteroid.position, nextSize, random),
    createAsteroidAt(asteroid.position, nextSize, random),
  ]
}
