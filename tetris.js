import {
  PLAYFIELD_COLUMS,
  PLAYFIELD_ROWS,
  TETROMINO_NAMES,
  TETROMINOS,
  getRandomElement,
} from "./utilities.js";

export class Tetris {
  constructor() {
    this.playfield;
    this.tetromino;
    this.init();
  }

  /**
   * Init method.
   */
  init() {
    this.generatePlayfield();
    this.generateTetromino();
  }

  /**
   * Method to generate the play field.
   */
  generatePlayfield() {
    this.playfield = new Array(PLAYFIELD_ROWS)
      .fill()
      .map(() => new Array(PLAYFIELD_COLUMS).fill(0));
  }

  /**
   * Method to generate a tetromino.
   */
  generateTetromino() {
    const name = getRandomElement(TETROMINO_NAMES);
    const matrix = TETROMINOS[name];

    const column = PLAYFIELD_COLUMS / 2 - Math.floor(matrix.length / 2);
    // const row = -2;
    const row = 3;
    this.tetromino = {
      name,
      matrix,
      row,
      column,
    };
  }
}
