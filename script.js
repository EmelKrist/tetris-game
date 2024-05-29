import { Tetris } from "./tetris.js";
import {
  PLAYFIELD_COLUMS,
  PLAYFIELD_ROWS,
  convertPositionToIndex,
  rotateMatrix,
} from "./utilities.js";

let requestId;
let timeoutId;
const tetris = new Tetris();
const cells = document.querySelectorAll(".grid>div");

initKeydown();

moveDown();

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
  stopLoop();
  startLoop();

  if (tetris.isGameOver) {
    gameOver();
  }
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
 * Method to start auto-movement of tetrominoes.
 */
function startLoop() {
  timeoutId = setTimeout(
    () => (requestId = requestAnimationFrame(moveDown)),
    700
  );
}

/**
 * Method to stop auto-movement of tetrominoes.
 */
function stopLoop() {
  cancelAnimationFrame(requestId);
  clearTimeout(timeoutId);
}

/**
 * Method of drawing.
 */
function draw() {
  // clear class attribute of div's
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawPlayfield();
  drawTetromino();
}

/**
 * Method to draw playfield for current tetromino saving.
 */
function drawPlayfield() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMS; column++) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
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

/**
 * Method to set the game over.
 */
function gameOver() {
  stopLoop();
  document.removeEventListener("keydown", onKeydown);
}
