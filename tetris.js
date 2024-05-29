import {
  PLAYFIELD_COLUMS,
  PLAYFIELD_ROWS,
  TETROMINO_NAMES,
  TETROMINOS,
  getRandomElement,
  rotateMatrix,
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
    const row = -2;

    this.tetromino = {
      name,
      matrix,
      row,
      column,
    };
  }

  /**
   * Method to move tetromino down.
   */
  moveTetrominoDown() {
    this.tetromino.row += 1;
    if (!this.isValid()) {
      this.tetromino.row -= 1;
      this.placeTetromino();
    }
  }

  /**
   * Method to move tetromino left.
   */
  moveTetrominoLeft() {
    this.tetromino.column -= 1;
    if (!this.isValid()) {
      this.tetromino.column += 1;
    }
  }

  /**
   * Method to move tetromino right.
   */
  moveTetrominoRight() {
    this.tetromino.column += 1;
    if (!this.isValid()) {
      this.tetromino.column -= 1;
    }
  }

  /**
   * Method to rotate tetromino.
   */
  rotateTetromino() {
    const oldMatrix = this.tetromino.matrix;
    const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
    this.tetromino.matrix = rotatedMatrix;
    if (!this.isValid()) {
      this.tetromino.matrix = oldMatrix;
    }
  }

  /**
   * Method to check if tetromino is valid
   */
  isValid() {
    const matrixSize = this.tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
      for (let column = 0; column < matrixSize; column++) {
        if (!this.tetromino.matrix[row][column]) continue;
        if (this.isOutsideOfGameBoard(row, column)) return false;
        if (this.isCollides(row, column)) return false;
      }
    }
    return true;
  }

  /**
   * Method to check if tetromino is collides with other tetromino.
   * @param {Number} row
   * @param {Number} column
   * @returns true/false
   */
  isCollides(row, column) {
    return this.playfield[this.tetromino.row + row]?.[
      this.tetromino.column + column
    ];
  }

  /**
   * Method to check if tetromino is not outside of the game board.
   * @param {Number} row
   * @param {Number} column
   * @returns true/false
   */
  isOutsideOfGameBoard(row, column) {
    return (
      this.tetromino.column + column < 0 ||
      this.tetromino.column + column >= PLAYFIELD_COLUMS ||
      this.tetromino.row + row >= this.playfield.length
    );
  }

  /**
   * Method to place current tetromino to the bottom of the playfield.
   */
  placeTetromino() {
    const matrixSize = this.tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
      for (let column = 0; column < matrixSize; column++) {
        if (!this.tetromino.matrix[row][column]) continue;

        this.playfield[this.tetromino.row + row][
          this.tetromino.column + column
        ] = this.tetromino.name;
      }
    }

    this.generateTetromino();
  }
}
