/*
  Questa parte esula dagli scopi del tutorato siccome inerente il browser,
  ma vista la curiosità avuta nei confronti di come funzionasse viene
  commentata lo stesso
  Feel free di cercare sulla Doc di Mozilla :3
*/

export type InputFrameSnapshot = {
  // Restituisce true se il tasto è tenuto premuto nel frame
  isDown: (code: string) => boolean
  // Restituisce true solo nel frame in cui il tasto viene premuto
  wasPressed: (code: string) => boolean
}

export class Input {
  // Set dei tasti attualmente giù
  private down = new Set<string>()
  // Set dei tasti premuti dall'ultimo beginFrame
  private pressedSinceLastFrame = new Set<string>()

  constructor() {
    // keydown: marca il tasto come "just pressed" solo al primo evento
    window.addEventListener("keydown", (event) => {
      if (!this.down.has(event.code)) {
        this.pressedSinceLastFrame.add(event.code)
      }
      this.down.add(event.code)
    })

    // keyup: il tasto non è più considerato premuto
    window.addEventListener("keyup", (event) => {
      this.down.delete(event.code)
    })
  }

  beginFrame(): InputFrameSnapshot {
    // Snapshot immutabile del frame corrente
    const downSnapshot = new Set(this.down)
    const pressedSnapshot = new Set(this.pressedSinceLastFrame)
    // Reset del "just pressed" per il frame successivo
    this.pressedSinceLastFrame.clear()

    return {
      isDown: (code: string): boolean => downSnapshot.has(code),
      wasPressed: (code: string): boolean => pressedSnapshot.has(code),
    }
  }
}
