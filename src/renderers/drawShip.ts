import { Vector2 } from "../game/math/Vector2.js"
import type { Ship } from "../entities/Ship.js"

/*
  Questa parte esula dagli scopi del tutorato siccome inerente il browser,
  Feel free di cercare sulla Doc di Mozilla :3
*/

export function drawShip(ctx: CanvasRenderingContext2D, ship: Ship): void {
  const forward = Vector2.fromAngle(ship.rotation)
  const right = Vector2.fromAngle(ship.rotation + Math.PI / 2)

  const tip = ship.position.copy().add(forward.copy().scale(ship.radius))
  const backCenter = ship.position.copy().add(forward.copy().scale(-ship.radius * 0.8))
  const left = backCenter.copy().add(right.copy().scale(-ship.radius * 0.7))
  const rightPoint = backCenter.copy().add(right.copy().scale(ship.radius * 0.7))

  const flicker = ship.invulnerabilityTimer > 0 && Math.floor(ship.invulnerabilityTimer * 12) % 2 === 0
  if (flicker) {
    return
  }

  ctx.save()
  ctx.strokeStyle = "white"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(tip.x, tip.y)
  ctx.lineTo(left.x, left.y)
  ctx.lineTo(rightPoint.x, rightPoint.y)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
