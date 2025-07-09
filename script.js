// Initialize the game grid and score
let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;
const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");

// Initialize the grid with random tiles
function initGame() {
    addRandomTile();
    addRandomTile();
    renderGrid();
}

// Add a new tile (2 or 4) randomly
function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length === 0) return;

    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function renderGrid() {
    gridContainer.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tileValue = grid[row][col];
            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (tileValue > 0) {
                tile.classList.add(`tile-${tileValue}`);
                tile.innerText = tileValue;
            }
            gridContainer.appendChild(tile);
        }
    }
    scoreDisplay.innerText = score;
}

function slideTiles(direction) {

}


initGame();
function slideLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(val => val !== 0); 
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2; 
                score += newRow[i];
                newRow.splice(i + 1, 1); 
            }
        }
        
        while (newRow.length < 4) {
            newRow.push(0);
        }
        grid[row] = newRow;
    }
    addRandomTile();
    renderGrid();
}

function renderGrid() {
    gridContainer.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tileValue = grid[row][col];
            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (tileValue > 0) {
                tile.classList.add(`tile-${tileValue}`);
                tile.innerText = tileValue;
            }

            tile.classList.add("tile-moving");
            gridContainer.appendChild(tile);
        }
    }
    scoreDisplay.innerText = score;
}

function slideRight() {

    grid = grid.map(row => row.reverse());
    slideLeft();
    grid = grid.map(row => row.reverse());
    addRandomTile();
    renderGrid();
}

function slideUp() {
    
    grid = transpose(grid);
    slideLeft();
    grid = transpose(grid);
    addRandomTile();
    renderGrid();
}

function slideDown() {
    
    grid = transpose(grid);
    slideRight();
    grid = transpose(grid);
    addRandomTile();
    renderGrid();
}


function transpose(arr) {
    return arr[0].map((_, i) => arr.map(row => row[i]));
}


document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        slideLeft();
    } else if (event.key === "ArrowRight") {
        slideRight();
    } else if (event.key === "ArrowUp") {
        slideUp();
    } else if (event.key === "ArrowDown") {
        slideDown();
    }
});


function checkWin() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 2048) {
                alert("You Win!");
            }
        }
    }
}


function checkGameOver() {
    
    let hasValidMove = false;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                hasValidMove = true;
            }
        }
    }
    if (!hasValidMove) {
        alert("Game Over!");
    }
}
const newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", function() {
    resetGame();
});

function resetGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    addRandomTile();
    addRandomTile();
    renderGrid();
}
