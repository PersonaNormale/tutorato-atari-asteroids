import type { InputFrameSnapshot } from "../Input.js"
import { CONFIG } from "../config.js"
import type { RandomSource } from "../utils/random.js"
import type { GameState } from "../../types/GameState.js"

/* Questo file è il ponte tra tastiera e meccaniche di gioco */

export function updateFromInput(
  state: GameState,
  inputFrame: InputFrameSnapshot,
  dt: number,
  random: RandomSource,
): void {
  // Qui si vede cosa è stato premuto
  const turnLeft = inputFrame.isDown("ArrowLeft")
  const turnRight = inputFrame.isDown("ArrowRight")
  const thrust = inputFrame.isDown("ArrowUp")
  const shootPressed = inputFrame.wasPressed("Space")
  const hyperspacePressed = inputFrame.wasPressed("ShiftLeft") || inputFrame.wasPressed("KeyH")

  // Codice abbastanza auto esplicativo :)

  if (hyperspacePressed) {
    state.ship.hyperspace(CONFIG.width, CONFIG.height, random)
  }

  if (turnLeft) {
    state.ship.rotate(-1, dt)
  }
  if (turnRight) {
    state.ship.rotate(1, dt)
  }
  if (thrust) {
    state.ship.applyThrust(dt)
  }

  // Prima avanza il cooldown di sparo...
  state.ship.tickShootCooldown(dt)
  if (shootPressed) {
    // Contiamo i proiettili presenti ma prendiamo solo quelli ancora in vita
    // Lasciamo stare quelli ancora non rimossi ma morti
    const aliveBullets = state.bullets.filter((bullet) => bullet.alive).length
    // Qui usiamo CONFIG al posto di una proprietà che poteva essere messa in ship
    // Poiché sarebbe stata un'ottima opzione se il progetto fosse stato più grande
    // Vedendo lo scope didattico e la brevità del tutto risulterebbe meglio così
    // che introducendo bloat :)
    // La dissonanza deriva che in config maxBullets è globale
    // Ma noi stiamo sparando proiettili per conto di una sola entità, ovvero Ship
    // In caso di aggiunta di altre entità che sparano, questo andrebbe modificato
    // oltreché potrebbe essere motivo silenzioso di introduzione di bug
    if (aliveBullets < CONFIG.bullets.maxBullets) {
      const bullet = state.ship.shootBullet()
      if (bullet !== null) {
        state.bullets.push(bullet)
        // ...poi, solo se il proiettile viene creato, si applica il cooldown configurato.
        state.ship.markBulletShot(CONFIG.ship.shootCooldown)
      }
    }
  }
}
