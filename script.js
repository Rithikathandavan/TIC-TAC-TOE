const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameBtn = document.getElementById('new-game');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== "" || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        endGame(`Player ${currentPlayer} wins!`);
        return;
    }

    if (gameState.every(cell => cell !== "")) {
        endGame("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function endGame(message) {
    gameActive = false;
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = "Player X's turn";
    board.innerHTML = "";
    createBoard();
}

function createBoard() {
    gameState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
}

function newGame() {
    resultScreen.style.display = 'none';
    resetGame();
}

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);

createBoard();