import { Asteroid } from "../entities/Asteroid.js"
import { Bullet } from "../entities/Bullet.js"
import { Ship } from "../entities/Ship.js"

// Si definisce la forma dello stato globale del gioco
export type GameState = {
  score: number
  lives: number
  wave: number
  phase: "playing" | "game_over"
  ship: Ship
  asteroids: Asteroid[]
  bullets: Bullet[]
}
