import { Vector2 } from "../math/Vector2.js"

type CircleLike = {
  position: Vector2
  radius: number
}

export function circlesCollide(a: CircleLike, b: CircleLike): boolean {
  const dx = a.position.x - b.position.x
  const dy = a.position.y - b.position.y
  const distance = Math.hypot(dx, dy)
  return distance < a.radius + b.radius
}
