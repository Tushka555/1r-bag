// Create the Connect 4 Board
const createConnect4Board = () => {
  const gameBoard = document.getElementById("container");

  const board = document.createElement("div");
  board.classList.add("board");
  gameBoard.appendChild(board);

  // Loop to create 42 slots (7 columns x 6 rows) for the Connect 4 grid
  for (let i = 0; i < 42; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.id = (i % 7) + "-" + Math.floor(i / 7);
    slot.dataset.column = i % 7;
    slot.dataset.row = Math.floor(i / 7);
    board.appendChild(slot);
  }

  // Reset Button
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset Game";
  resetButton.classList.add("reset_button");
  resetButton.addEventListener("click", resetGame);

  // Append the reset button to the game board
  gameBoard.appendChild(resetButton);

  // Add a status message (h3) for the winner or turn
  const status = document.createElement("h3");
  gameBoard.appendChild(status);
};

document.addEventListener("DOMContentLoaded", createConnect4Board);

// Initialize the game board state array
let array = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

let currentPlayer = 1;
let currentPlayerName = "Player 1";
let playerOneColor = "red";
let playerTwoColor = "yellow";
let currentColor = playerOneColor; // Start with player one's color
let isLocked = false;

// Function to toggle between players
function togglePlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    currentColor = playerTwoColor;
    currentPlayerName = "Player 2";
  } else {
    currentPlayer = 1;
    currentColor = playerOneColor;
    currentPlayerName = "Player 1";
  }

  console.log(`Current player: ${currentPlayerName}`);
}

// Check for a win after each move
function checkWin(row, col) {
  const directions = [
    { x: 0, y: 1 }, // Horizontal
    { x: 1, y: 0 }, // Vertical
    { x: 1, y: 1 }, // Diagonal (down-right)
    { x: 1, y: -1 }, // Diagonal (up-right)
  ];

  for (let { x, y } of directions) {
    let count = 1; // Start by counting the current disc

    // Check in both directions (positive and negative) along the direction (x, y)
    for (let i = 1; i <= 3; i++) {
      const r = row + i * x;
      const c = col + i * y;

      if (r >= 0 && r < 6 && c >= 0 && c < 7 && array[r][c] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i <= 3; i++) {
      const r = row - i * x;
      const c = col - i * y;

      if (r >= 0 && r < 6 && c >= 0 && c < 7 && array[r][c] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 4) {
      return true;
    }
  }

  return false;
}

// Handle the click event on the slots
function onClick(event) {
  if (isLocked) return;

  const slot = event.target;
  const columnIndex = parseInt(slot.dataset.column);
  const column = array.map((row) => row[columnIndex]);
  const rowIndex = column.lastIndexOf(null); // Find the lowest empty slot in the column

  if (rowIndex !== -1) {
    array[rowIndex][columnIndex] = currentPlayer;

    const disc = document.createElement("div");
    disc.classList.add("disc", `${currentColor}Disc`);

    const targetSlot = document.querySelector(
      `.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`
    );

    targetSlot.classList.add(currentColor);
    // Check for a win
    if (checkWin(rowIndex, columnIndex)) {
      alert(`${currentPlayerName} wins!`);
      isLocked = true;
      return;
    }

    // Toggle player
    togglePlayer();
  }
}

// Add click event listener to all the slots
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("click", onClick);
  });
});

// Reset the game
function resetGame() {
  array = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];

  document.querySelectorAll(".slot").forEach((slot) => {
    slot.innerHTML = "";
    slot.classList.remove("red", "yellow");
  });

  currentPlayer = 1;
  currentColor = playerOneColor;
}
