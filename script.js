import { Tetris } from "./tetris.js";
import { convertPositionToIndex, rotateMatrix } from "./utilities.js";

const tetris = new Tetris();
const cells = document.querySelectorAll(".grid>div");

initKeydown();

draw();

function initKeydown() {
  document.addEventListener("keydown", onKeydown);
}

function onKeydown(event) {
  switch (event.key) {
    case "ArrowUp":
      rotate();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      break;
  }
}

/**
 * Method to move tetromino down.
 */
function moveDown() {
  tetris.moveTetrominoDown();
  draw();
}

/**
 * Method to move tetromino left.
 */
function moveLeft() {
  tetris.moveTetrominoLeft();
  draw();
}

/**
 * Method to move tetromino right.
 */
function moveRight() {
  tetris.moveTetrominoRight();
  draw();
}

/**
 * Method to rotate tetromino.
 */
function rotate() {
  tetris.rotateTetromino();
  draw();
}

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
