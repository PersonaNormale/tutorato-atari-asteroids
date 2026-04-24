import type { Bullet } from "../entities/Bullet.js"

/*
  Questa parte esula dagli scopi del tutorato siccome inerente il browser,
  Feel free di cercare sulla Doc di Mozilla :3
*/

export function drawBullet(ctx: CanvasRenderingContext2D, bullet: Bullet): void {
  ctx.save()
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(bullet.position.x, bullet.position.y, bullet.radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}
