import { Vector2 } from "../math/Vector2.js"

// Implementazione di uno spazio toroidale
// Più facile a farsi che a dirsi
// Non fatevi spaventare dai paroloni,
// in informatica spesso sono un paio di if :)
export function wrapPosition(position: Vector2, width: number, height: number): void {
  if (position.x < 0) {
    position.x += width
  }
  if (position.x > width) {
    position.x -= width
  }
  if (position.y < 0) {
    position.y += height
  }
  if (position.y > height) {
    position.y -= height
  }
}
