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
    this.isGameOver = false;
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
        if (this.isOutsideOfTopBoard(row)) {
          this.isGameOver = true;
          return;
        }

        this.playfield[this.tetromino.row + row][
          this.tetromino.column + column
        ] = this.tetromino.name;
      }
    }

    this.processFilledRows();
    this.generateTetromino();
  }

  /**
   * Method to check if tetromino is outside of the top board.
   * @param {Number} row
   * @returns true/false
   */
  isOutsideOfTopBoard(row) {
    return this.tetromino.row + row < 0;
  }

  /**
   * Method to process filled rows.
   */
  processFilledRows() {
    const filledRows = this.findFilledRows();
    this.removeFilledRows(filledRows);
  }

  /**
   * Method to find filled rows.
   */
  findFilledRows() {
    const filledRows = [];
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
      if (this.playfield[row].every((cell) => Boolean(cell))) {
        filledRows.push(row);
      }
    }

    return filledRows;
  }

  /**
   * Method to remove filled fows.
   * @param {Array} filledRows
   */
  removeFilledRows(filledRows) {
    filledRows.forEach((row) => {
      this.dropRowsAbove(row);
    });
  }

  /**
   * Method to drop rows above.
   * @param {Number} rowToDelete
   */
  dropRowsAbove(rowToDelete) {
    for (let row = rowToDelete; row > 0; row--) {
      this.playfield[row] = this.playfield[row - 1];
    }
    this.playfield[0] = new Array(PLAYFIELD_COLUMS).fill(0);
  }
}
