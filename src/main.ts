import { Ship } from "./entities/Ship.js"
import type { BulletSettings } from "./entities/Bullet.js"
import type { ShipSettings } from "./entities/Ship.js"
import { Game } from "./game/Game.js"
import { Input } from "./game/Input.js"
import { CONFIG } from "./game/config.js"
import { runFrame } from "./game/systems/runFrame.js"
import type { RandomSource } from "./game/utils/random.js"
import { createWaveAsteroids } from "./game/utils/spawn.js"
import { GameState } from "./types/GameState.js"
import { drawAsteroid } from "./renderers/drawAsteroid.js"
import { drawBullet } from "./renderers/drawBullet.js"
import { drawShip } from "./renderers/drawShip.js"

// Si creano le configurazioni della Nave
const SHIP_SETTINGS: ShipSettings = {
  radius: CONFIG.ship.radius,
  rotationSpeed: CONFIG.ship.rotationSpeed,
  thrust: CONFIG.ship.thrust,
  linearDampingPerSecond: CONFIG.ship.linearDampingPerSecond,
  respawnInvulnerability: CONFIG.ship.respawnInvulnerability,
}
const BULLET_SETTINGS: BulletSettings = {
  radius: CONFIG.bullets.radius,
  speed: CONFIG.bullets.speed,
  lifetime: CONFIG.bullets.lifetime,
}

// Linee riguardanti il canvas
const canvas = document.createElement("canvas")
canvas.width = CONFIG.width
canvas.height = CONFIG.height
document.body.style.margin = "0"
document.body.style.background = "black"
document.body.appendChild(canvas)

const context = canvas.getContext("2d")
if (!context) {
  throw new Error("Canvas 2D context not available")
}
const ctx = context
// Fine linee inizializzazione canvas

// Creazione istanza per gli input
// Creazione e assegnazione source per il random
// Creazione della nave secondo configurazione
const input = new Input()
const random: RandomSource = Math.random
const ship = new Ship(CONFIG.width / 2, CONFIG.height / 2, SHIP_SETTINGS, BULLET_SETTINGS)

// Creazione dello Stato del Gioco che chiamiamo Game State
const state: GameState = {
  score: 0,
  lives: CONFIG.startingLives,
  wave: 1,
  phase: "playing",
  ship,
  asteroids: createWaveAsteroids(1, ship.position, CONFIG.width, CONFIG.height, random),
  bullets: [],
}

// Funzione update
// Prende un:
//  \delta t
// 1. Campiona l'input del frame corrente
// 2. Avanza lo stato del gioco tramite la funzione runFrame (orchestrazione)
// Ritorna:
//  void
function update(dt: number): void {
  const inputFrame = input.beginFrame()
  runFrame(state, inputFrame, dt, random)
}

// Funzione draw
// Per disegnare entità, HUD e schermate di stato sul canvas
function draw(): void {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, CONFIG.width, CONFIG.height)

  drawShip(ctx, state.ship)
  for (const asteroid of state.asteroids) {
    drawAsteroid(ctx, asteroid)
  }
  for (const bullet of state.bullets) {
    drawBullet(ctx, bullet)
  }

  ctx.fillStyle = "white"
  ctx.font = "20px monospace"
  ctx.textAlign = "left"
  ctx.fillText(`SCORE: ${state.score}`, 20, 30)
  ctx.fillText(`LIVES: ${state.lives}`, 20, 55)
  ctx.fillText(`WAVE: ${state.wave}`, 20, 80)

  if (state.phase === "game_over") {
    ctx.textAlign = "center"
    ctx.font = "56px monospace"
    ctx.fillText("GAME OVER", CONFIG.width / 2, CONFIG.height / 2)
  }
}

// Decisione su Timestep fisso o variabile
// Utile per il Debug
const useFixedTimestep = false
const game = useFixedTimestep
  ? new Game(update, draw, { fixedDt: 1 / 60, maxFrameTime: 0.25 })
  : new Game(update, draw)
game.start()
