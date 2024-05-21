import { Tetris } from "./tetris.js";
import { convertPositionToIndex } from "./utilities.js";

const tetris = new Tetris();
const cells = document.querySelectorAll(".grid>div");

draw();

/**
 * Method of drawing.
 */
function draw() {
  // clear class attribute of div's
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawTetromino();
}

/**
 * Method to draw a tetromino.
 */
function drawTetromino() {
  // get name and size of tetromino
  const name = tetris.tetromino.name;
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      // if matrix point is 0 then skip
      if (!tetris.tetromino.matrix[row][column]) continue;
      // if it isn't visible then skip
      if (tetris.tetromino.row + row < 0) continue;
      // convert the position to cell index
      const cellIndex = convertPositionToIndex(
        tetris.tetromino.row + row,
        tetris.tetromino.column + column
      );
      /* add tetromino name to classlist of cell 
      with the converted index */
      cells[cellIndex].classList.add(name);
    }
  }
}
