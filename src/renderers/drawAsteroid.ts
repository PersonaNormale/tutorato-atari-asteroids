import type { Asteroid } from "../entities/Asteroid.js"

/*
  Questa parte esula dagli scopi del tutorato siccome inerente il browser,
  Feel free di cercare sulla Doc di Mozilla :3
*/

export function drawAsteroid(ctx: CanvasRenderingContext2D, asteroid: Asteroid): void {
  ctx.save()
  ctx.translate(asteroid.position.x, asteroid.position.y)
  ctx.rotate(asteroid.rotation)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let i = 0; i < asteroid.shape.length; i += 1) {
    const angle = (i / asteroid.shape.length) * Math.PI * 2
    const r = asteroid.radius * asteroid.shape[i]
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}
