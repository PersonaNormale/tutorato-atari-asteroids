import { Vector2 } from "../math/Vector2.js"

export type RandomSource = () => number

/*
  Funzioni Random di Utility
*/

export function randomRange(min: number, max: number, random: RandomSource = Math.random): number {
  return min + random() * (max - min)
}

export function randomDirection(random: RandomSource = Math.random): Vector2 {
  const angle = randomRange(0, Math.PI * 2, random)
  return Vector2.fromAngle(angle)
}
