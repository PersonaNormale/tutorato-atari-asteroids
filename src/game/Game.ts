export class Game {
  // Timestamp dall'ultimo frame
  private lastTime = 0
  // Per fixed Timestep
  // Accumula tempo non ancora simulato
  private accumulator = 0

  // Sintassi SWAG che esula dagli obiettivi del corso
  // Per private readonly etc...
  // 1. Il parametro viene ricevuto in input
  // 2. Viene creato automaticamente un campo della classe con quel nome
  // 3. Il campo viene assegnato automaticamente
  constructor(
    // Aggiorna lo stato del gioco, dt è il tempo in secondi dall'ultimo update
    private readonly update: (dt: number) => void,
    // Funzione che disegna lo stato corrente su canvas
    private readonly draw: () => void,
    // Oggetto Opzionale di Configurazione
    // Decisione su Timestep fisso o variabile
    private readonly options: { fixedDt?: number; maxFrameTime?: number } = {},
  ) { }

  // Avvia il loop al prossimo repaint del browser
  start(): void {
    // Non fatevi troppe domande su questa funzione
    // Serve al browser per far funzionare tutto :)
    // (Che non sia questo a fermarvi dall'essere curiosi)
    requestAnimationFrame(this.loop)
  }

  private loop = (timestamp: number): void => {
    // Differenza tra timestamp corrente e precedente
    const dt = this.lastTime === 0 ? 0 : (timestamp - this.lastTime) / 1000
    this.lastTime = timestamp

    // Modalità Fixed Timestep
    if (this.options.fixedDt) {
      const maxFrameTime = this.options.maxFrameTime ?? 0.25
      this.accumulator += Math.min(dt, maxFrameTime)

      while (this.accumulator >= this.options.fixedDt) {
        this.update(this.options.fixedDt)
        this.accumulator -= this.options.fixedDt
      }
    } else {
      // Invece con timestep vi è solo un update con dt reale
      this.update(dt)
    }
    // Si disegna sempre una volta per frame video
    this.draw()

    // Si pianifica il frame successivo
    // Non fatevi troppe domande su questa funzione
    // Serve al browser per far funzionare tutto :)
    // (Che non sia questo a fermarvi dall'essere curiosi)
    requestAnimationFrame(this.loop)
  }
}
