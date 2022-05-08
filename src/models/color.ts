export class RandomColor {
  red: number;

  green: number;

  blue: number;

  constructor(
    red = RandomColor.generateColorNumber(),
    green = RandomColor.generateColorNumber(),
    blue = RandomColor.generateColorNumber()
  ) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  static generateColorNumber(): number {
    return Math.floor(Math.random() * (255 + 1));
  }
}
