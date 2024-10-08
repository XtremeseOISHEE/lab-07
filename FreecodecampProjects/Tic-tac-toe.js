const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restart");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions for the Tic-Tac-Toe game
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

// Display status messages
const displayStatus = () => {
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;

    // Change the color based on the current player
    if (currentPlayer === "X") {
        statusDisplay.className = "status-turn-x"; // Apply class for X's turn
    } else {
        statusDisplay.className = "status-turn-o"; // Apply class for O's turn
    }
};

const winningMessage = () => {
    statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
    statusDisplay.className = "status-win"; // Apply class for winning message
};

const drawMessage = () => {
    statusDisplay.innerHTML = `It's a draw!`;
    statusDisplay.className = "status-draw"; // Apply class for draw message
};

displayStatus();  // Initialize the status message

// Handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    // Check if the cell has already been played or the game is inactive
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Update the game state and UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for a win or draw
    checkResult();
}

// Check the game result
function checkResult() {
    let roundWon = false;

    // Check each winning condition
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winningMessage();
        gameActive = false;
        return;
    }

    // Check for a draw
    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        drawMessage();
        gameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayStatus();
}

// Restart the game
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    displayStatus();
    document.querySelectorAll(".cell").forEach(cell => (cell.innerHTML = ""));
}

// Add event listeners to each cell
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));

// Add event listener to the restart button
restartButton.addEventListener("click", restartGame);
