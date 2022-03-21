let matrix = [
    [],
    [],
    []
]

let turn = true; //true - X, false -O
let gameRunning = true;
let computerScore = localStorage.getItem("computerScore") || 0;
let playerScore = localStorage.getItem("playerScore") || 0;
const score = document.getElementsByClassName("score")[0]
score.innerHTML = "You: " + playerScore + "<br> Computer: " + computerScore;
const tbody = document.getElementsByClassName("game-table")[0].children[0]
const resetButton = document.getElementsByClassName("reset")[0]
resetButton.onclick = resetGame;
const clearButton = document.getElementsByClassName("clear-score")[0]
clearButton.onclick = clearScore;
for (let i = 0; i < 3; i++) {
    const tr = tbody.children[i]
    for (let j = 0; j < 3; j++) {
        tr.children[j].dataset.i = i
        tr.children[j].dataset.j = j
        tr.children[j].dataset.sign = ""
        matrix[i][j] = tr.children[j]
    }
}


tbody.addEventListener("click", playHandler)


function playHandler(event) {
    const box = event.target
    if (box.tagName === "TD" && turn) {
        turn = !turn;
        box.dataset.sign = "X"
        box.style.backgroundImage = "url(images/X.png)"
        checkBoard()
        computerPlay()
    } else {
        checkBoard()
    }

}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrix[i][j].dataset.sign = ""
            matrix[i][j].style.backgroundImage = "none"
            gameRunning = true;
            turn = true;
        }
    }
}

function clearScore() {
    computerScore = 0;
    playerScore = 0;
    localStorage.clear()
    renderScore();
    resetGame()
}


function computerPlay() {
    if (gameRunning) {
        turn = !turn
        // console.dir(matrix.flat()[0].dataset);
        const freeBoxes = matrix.flat().filter(element => element.dataset.sign === "")
        // console.log(freeBoxes);
        if (freeBoxes.length) {
            const chosen = freeBoxes[Math.floor(Math.random() * freeBoxes.length)]
            console.log(chosen);
            chosen.dataset.sign = "O"
            chosen.style.backgroundImage = "url(images/O.png)"
        }
        checkBoard()
    }
    renderScore()

}

function checkBoard() {
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0].dataset.sign === matrix[i][1].dataset.sign && matrix[i][1].dataset.sign === matrix[i][2].dataset.sign) {
            if (matrix[i][0].dataset.sign === "X") {
                playerScore++;
                gameRunning = false;
                return;
            }
            else if (matrix[i][0].dataset.sign === "O") {
                computerScore++;
                gameRunning = false;
                return;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        if (matrix[0][i].dataset.sign === matrix[1][i].dataset.sign && matrix[1][i].dataset.sign === matrix[2][i].dataset.sign) {
            if (matrix[0][i].dataset.sign === "X") {
                playerScore++;
                gameRunning = false;
                return;
            }
            else if (matrix[0][i].dataset.sign === "O") {
                computerScore++;
                gameRunning = false;
                return;
            }
        }
    }
    if (matrix[0][0].dataset.sign === matrix[1][1].dataset.sign && matrix[1][1].dataset.sign === matrix[2][2].dataset.sign) {
        if (matrix[0][0].dataset.sign === "X") {
            playerScore++;
            gameRunning = false;
            return;
        }
        else if (matrix[0][0].dataset.sign === "O") {
            computerScore++;
            gameRunning = false;
            return;
        }
    } else if (matrix[0][2].dataset.sign === matrix[1][1].dataset.sign && matrix[1][1].dataset.sign === matrix[2][0].dataset.sign) {
        if (matrix[0][2].dataset.sign === "X") {
            playerScore++;
            gameRunning = false;
            return;
        }
        else if (matrix[0][2].dataset.sign === "O") {
            computerScore++;
            gameRunning = false;
            return;
        }
    }
    renderScore()
}

function renderScore() {
    score.innerHTML = "You: " + playerScore + "<br> Computer: " + computerScore;
    localStorage.setItem("playerScore", playerScore)
    localStorage.setItem("computerScore", computerScore)
}
