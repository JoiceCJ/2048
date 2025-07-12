let grid = Array(4).fill().map(() => Array(4).fill(0));
let score = 0;

const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const newGameBtn = document.getElementById("new-game-btn");

function initGame() {
    grid = Array(4).fill().map(() => Array(4).fill(0));
    score = 0;
    addRandomTile();
    addRandomTile();
    renderGrid();
}

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
            const tile = document.createElement("div");
            tile.classList.add("tile");
            const val = grid[row][col];
            if (val > 0) {
                tile.classList.add(`tile-${val}`);
                tile.innerText = val;
            }
            tile.classList.add("tile-moving");
            gridContainer.appendChild(tile);
        }
    }
    scoreDisplay.innerText = score;
}

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
        while (newRow.length < 4) newRow.push(0);
        grid[row] = newRow;
    }
}

function slideRight() {
    grid = grid.map(row => row.reverse());
    slideLeft();
    grid = grid.map(row => row.reverse());
}

function slideUp() {
    grid = transpose(grid);
    slideLeft();
    grid = transpose(grid);
}

function slideDown() {
    grid = transpose(grid);
    slideRight();
    grid = transpose(grid);
}

function transpose(arr) {
    return arr[0].map((_, i) => arr.map(row => row[i]));
}

function checkWin() {
    for (let row of grid) {
        if (row.includes(2048)) {
            alert("You Win!");
            return true;
        }
    }
    return false;
}

function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) return false;
            if (col < 3 && grid[row][col] === grid[row][col + 1]) return false;
            if (row < 3 && grid[row][col] === grid[row + 1][col]) return false;
        }
    }
    alert("Game Over!");
    return true;
}

document.addEventListener("keydown", function(event) {
    let moved = false;
    if (event.key === "ArrowLeft") {
        slideLeft();
        moved = true;
    } else if (event.key === "ArrowRight") {
        slideRight();
        moved = true;
    } else if (event.key === "ArrowUp") {
        slideUp();
        moved = true;
    } else if (event.key === "ArrowDown") {
        slideDown();
        moved = true;
    }

    if (moved) {
        addRandomTile();
        renderGrid();
        checkWin();
        checkGameOver();
    }
});

newGameBtn.addEventListener("click", initGame);

initGame();
