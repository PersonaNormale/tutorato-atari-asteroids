/*
  Qui Utilities per i Vettori
  Sono tutte semplici operazioni di Algebra Lineare
*/

export class Vector2 {
  constructor(public x: number = 0, public y: number = 0) { }

  copy(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  add(v: Vector2): Vector2 {
    this.x += v.x
    this.y += v.y
    return this
  }

  scale(s: number): Vector2 {
    this.x *= s
    this.y *= s
    return this
  }

  length(): number {
    return Math.hypot(this.x, this.y)
  }

  normalize(): Vector2 {
    const len = this.length()
    if (len === 0) {
      return this
    }
    this.x /= len
    this.y /= len
    return this
  }

  static fromAngle(angle: number): Vector2 {
    return new Vector2(Math.cos(angle), Math.sin(angle))
  }
}
