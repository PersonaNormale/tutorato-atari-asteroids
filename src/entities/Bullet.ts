import { Vector2 } from "../game/math/Vector2.js"

export type BulletSettings = {
  // Raggio della hitbox del proiettile
  radius: number
  // Velocità iniziale del proiettile
  speed: number
  // Vita massima in secondi
  lifetime: number
}

export class Bullet {
  // Posizione corrente
  position: Vector2
  // Velocità lineare
  velocity: Vector2
  // Raggio per collisioni
  radius: number
  // Tempo residuo prima della distruzione
  life: number
  // Flag vita/morte dell'entità
  alive: boolean

  constructor(position: Vector2, velocity: Vector2, settings: BulletSettings) {
    this.position = position
    this.velocity = velocity
    this.radius = settings.radius
    this.life = settings.lifetime
    this.alive = true
  }

  update(dt: number): void {
    // Integrazione lineare del moto
    this.position.add(this.velocity.copy().scale(dt))
    // Countdown del tempo di vita
    this.life -= dt
    if (this.life <= 0) {
      this.alive = false
    }
  }
}
