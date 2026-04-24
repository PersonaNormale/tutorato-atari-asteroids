# Tutorato Atari Asteroids

## Come avviare il gioco 

### Prerequisiti
- Node.js
- npm

### Avvio rapido
1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Compila TypeScript:
   ```bash
   npm run build
   ```
3. Avvia il server locale:
   ```bash
   npm run serve
   ```
4. Apri il browser su:
   - `http://localhost:5173`

## Cosa fa il progetto

Il gioco implementa le meccaniche base di Asteroids:
- controllo della nave (rotazione, thrust, sparo, hyperspace)
- movimento con wrapping ai bordi
- collisioni nave/asteroidi e proiettili/asteroidi
- punteggio, vite e avanzamento a wave
- schermata di game over

### Controlli
- `←` / `→`: ruota la nave
- `↑`: accelera (thrust)
- `Space`: spara
- `Shift` (o `H`): hyperspace

## Struttura del progetto

```text
src/
  main.ts                     # bootstrap canvas, stato iniziale, loop update/draw
  entities/
    Ship.ts                   # logica nave
    Bullet.ts                 # logica proiettili
    Asteroid.ts               # logica asteroidi
  game/
    Game.ts                   # game loop
    Input.ts                  # gestione input tastiera
    config.ts                 # costanti di gioco
    systems/
      runFrame.ts             # orchestrazione del frame
      updateInput.ts          # applica input al gameplay
      updateWorld.ts          # update entità nel mondo
      resolveCollisions.ts    # gestione collisioni e punteggio
      lifecycle.ts            # cleanup e avanzamento wave
    state/
      transitions.ts          # transizioni di stato
    utils/
      collision.ts, wrap.ts, spawn.ts, random.ts, math/
  renderers/
    drawShip.ts
    drawAsteroid.ts
    drawBullet.ts
```
