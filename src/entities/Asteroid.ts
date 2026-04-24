import { Vector2 } from "../game/math/Vector2.js"
import { randomRange } from "../game/utils/random.js"
import { AsteroidSize } from "../types/AsteroidSize.js"

export class Asteroid {
  // Centro dell'asteroide nel mondo
  position: Vector2
  // Velocità lineare
  velocity: Vector2
  // Rotazione corrente
  rotation: number
  // Velocità di rotazione (spin)
  angularVelocity: number
  // Raggio usato per collisioni/disegno
  radius: number
  // Taglia logica (large/medium/small)
  size: AsteroidSize
  // Flag vita/morte dell'entità
  alive: boolean
  // Profilo irregolare normalizzato per il rendering
  shape: number[]

  constructor(position: Vector2, velocity: Vector2, radius: number, size: AsteroidSize) {
    this.position = position
    this.velocity = velocity
    this.rotation = randomRange(0, Math.PI * 2)
    this.angularVelocity = randomRange(-1.2, 1.2)
    this.radius = radius
    this.size = size
    this.alive = true
    // 10 campioni radiali per ottenere una sagoma frastagliata
    this.shape = Array.from({ length: 10 }, () => randomRange(0.8, 1.2))
  }

  update(dt: number): void {
    // Aggiorna moto traslazionale e rotazione
    this.position.add(this.velocity.copy().scale(dt))
    this.rotation += this.angularVelocity * dt
  }
}
