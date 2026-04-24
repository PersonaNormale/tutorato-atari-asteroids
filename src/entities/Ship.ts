import { Vector2 } from "../game/math/Vector2.js"
import type { RandomSource } from "../game/utils/random.js"
import { Bullet } from "./Bullet.js"
import type { BulletSettings } from "./Bullet.js"

export type ShipSettings = {
  // Raggio usato per disegno e collisioni
  radius: number
  // Velocità angolare in radianti al secondo
  rotationSpeed: number
  // Accelerazione applicata quando si tiene premuto thrust
  thrust: number
  // Freno "spaziale": riduce la velocità nel tempo
  linearDampingPerSecond: number
  // Durata dello scudo dopo il respawn
  respawnInvulnerability: number
}

export class Ship {
  // Centro della nave nel mondo di gioco
  position: Vector2
  // Velocità lineare corrente
  velocity: Vector2
  // Angolo in radianti (0 = destra)
  rotation: number
  // Raggio della hitbox
  radius: number
  // Flag entità attiva
  alive: boolean
  // Timer per ignorare collisioni dopo il respawn
  invulnerabilityTimer: number
  // Timer che regola la cadenza di fuoco
  shootCooldown: number
  private readonly settings: ShipSettings
  private readonly bulletSettings: BulletSettings

  constructor(x: number, y: number, settings: ShipSettings, bulletSettings: BulletSettings) {
    this.settings = settings
    this.bulletSettings = bulletSettings
    this.position = new Vector2(x, y)
    this.velocity = new Vector2(0, 0)
    this.rotation = -Math.PI / 2
    this.radius = settings.radius
    this.alive = true
    this.invulnerabilityTimer = 0
    this.shootCooldown = 0
  }

  update(dt: number): void {
    // Integrazione posizione: p = p + v * dt
    this.position.add(this.velocity.copy().scale(dt))

    // Damping lineare semplice per evitare velocità infinita
    const damping = Math.max(0, 1 - this.settings.linearDampingPerSecond * dt)
    this.velocity.scale(damping)

    // Conta alla rovescia dell'invulnerabilità
    this.invulnerabilityTimer = Math.max(0, this.invulnerabilityTimer - dt)
  }

  applyThrust(dt: number): void {
    // Spinta nella direzione del muso della nave
    const acceleration = Vector2.fromAngle(this.rotation).scale(this.settings.thrust * dt)
    this.velocity.add(acceleration)
  }

  rotate(direction: -1 | 1, dt: number): void {
    this.rotation += direction * this.settings.rotationSpeed * dt
  }

  tickShootCooldown(dt: number): void {
    this.shootCooldown = Math.max(0, this.shootCooldown - dt)
  }

  shootBullet(): Bullet | null {
    // Se il cooldown non è scaduto non si può sparare
    if (this.shootCooldown > 0) {
      return null
    }

    const direction = Vector2.fromAngle(this.rotation)
    // Il proiettile nasce sulla punta della nave
    const spawnPos = this.position.copy().add(direction.copy().scale(this.radius))
    // Velocità iniziale del proiettile lungo il facing
    const bulletVelocity = direction.scale(this.bulletSettings.speed)

    return new Bullet(spawnPos, bulletVelocity, this.bulletSettings)
  }

  markBulletShot(cooldownSeconds: number): void {
    this.shootCooldown = cooldownSeconds
  }

  respawn(x: number, y: number): void {
    // Reset stato fisico e flag vitali al punto di respawn
    this.position.x = x
    this.position.y = y
    this.velocity.x = 0
    this.velocity.y = 0
    this.invulnerabilityTimer = this.settings.respawnInvulnerability
    this.shootCooldown = 0
    this.alive = true
  }

  hyperspace(width: number, height: number, random: RandomSource = Math.random): void {
    // Teletrasporto casuale + stop immediato del movimento
    this.position.x = random() * width
    this.position.y = random() * height
    this.velocity.x = 0
    this.velocity.y = 0
  }
}
