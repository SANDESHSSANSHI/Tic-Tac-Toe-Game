const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const startGameBtn = document.getElementById("start-game-btn");
const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");
const symbolButtons = document.querySelectorAll(".symbol-btn");
const statusText = document.getElementById("status-text");
const gameBoard = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-btn");
const victoryDialog = document.getElementById("victory-dialog");
const victoryMessage = document.getElementById("victory-message");
const closeDialogBtn = document.getElementById("close-dialog-btn");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let player1Symbol = "";
let player2Symbol = "";
let currentSymbol = "";
let gameActive = true;
const board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Symbol Selection
symbolButtons.forEach(button => {
  button.addEventListener("click", () => {
    player1Symbol = button.getAttribute("data-symbol");
    player2Symbol = player1Symbol === "X" ? "O" : "X";
    startGameBtn.disabled = false;
  });
});

// Start Game
startGameBtn.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
  currentPlayer = player1;
  currentSymbol = player1Symbol;
  statusText.textContent = `${currentPlayer}'s Turn (${currentSymbol})`;
  welcomeScreen.classList.remove("active");
  gameScreen.classList.add("active");
});

// Handle Cell Click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameActive && !cell.textContent) {
      cell.textContent = currentSymbol;
      cell.classList.add("taken");
      board[index] = currentSymbol;

      if (checkWin(currentSymbol)) {
        endGame(`Hurray! ${currentPlayer} wins!`);
        return;
      }

      if (board.every(cell => cell)) {
        endGame("It's a tie!");
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
      currentSymbol = currentSymbol === player1Symbol ? player2Symbol : player1Symbol;
      statusText.textContent = `${currentPlayer}'s Turn (${currentSymbol})`;
    }
  });
});

// Check Win
function checkWin(symbol) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === symbol)
  );
}

// End Game
function endGame(message) {
  gameActive = false;
  victoryMessage.textContent = message;
  victoryDialog.classList.remove("hidden");
}

// Close Dialog
closeDialogBtn.addEventListener("click", () => {
  victoryDialog.classList.add("hidden");
});

// Reset Game
resetButton.addEventListener("click", () => {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  gameActive = true;
  currentPlayer = player1;
  currentSymbol = player1Symbol;
  statusText.textContent = `${currentPlayer}'s Turn (${currentSymbol})`;
});



// Exit Game
const exitButton = document.getElementById("exit-btn");

exitButton.addEventListener("click", () => {
  // Reset player names and symbols
  player1Input.value = "";
  player2Input.value = "";
  player1Symbol = "";
  player2Symbol = "";
  
  // Reset the board
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  
  // Hide game screen and show the welcome screen
  gameScreen.classList.remove("active");
  welcomeScreen.classList.add("active");
  
  // Disable start button initially
  startGameBtn.disabled = true;
  statusText.textContent = "";
});
