/*-------------------------------- Constants --------------------------------*/
const textX = "It's X's turn"
const textO = "It's O's turn"
const textTie = "It's a tie!"

/*-------------------------------- Variables --------------------------------*/
let currentPlayer = "X"
let clickedCell;
let isGameWon = false;
let isGameTied = false;

let cellElementsArray = []
let winningCombos = []
let winningCombosText = []

/*------------------------ Cached Element References ------------------------*/
let cellElements = document.querySelectorAll(".cell")

cellElementsArray = Array.from(cellElements)

winningCombos = [
    [cellElementsArray[0], cellElementsArray[1], cellElementsArray[2]],
    [cellElementsArray[3], cellElementsArray[4], cellElementsArray[5]],
    [cellElementsArray[6], cellElementsArray[7], cellElementsArray[8]],
    [cellElementsArray[0], cellElementsArray[3], cellElementsArray[6]],
    [cellElementsArray[1], cellElementsArray[4], cellElementsArray[7]],
    [cellElementsArray[2], cellElementsArray[5], cellElementsArray[8]],
    [cellElementsArray[0], cellElementsArray[4], cellElementsArray[8]],
    [cellElementsArray[2], cellElementsArray[4], cellElementsArray[6]],
]

const h3Element = document.querySelector("h3")

const resetButton = document.querySelector("button")

/*-------------------------------- Functions --------------------------------*/
function inputXorO() {

    clickedCell.innerText = currentPlayer
    if (currentPlayer === "X") {
        clickedCell.classList.add("xStyle")
    } else if (currentPlayer === "O") {
        clickedCell.classList.add("oStyle")
    }

    winningCombosText = winningCombos.map((array) => {
        return array.map((element) => {
            return element.innerText
        })
    })
}

function winGame() {

    if (
        winningCombosText.some((winningCombo) => {
            return winningCombo[0] === "X" && winningCombo[1] === "X" && winningCombo[2] === "X" || winningCombo[0] === "O" && winningCombo[1] === "O" && winningCombo[2] === "O"
        })
    ) {
        h3Element.innerText = `${currentPlayer} wins!`
        isGameWon = true;
    }
}

function tieGame() {

    if (!isGameWon) {   

        if (cellElementsArray.every((element) => {
            return element.innerText === "X" || element.innerText === "O"
        })) 
        {
            h3Element.innerText = textTie
            isGameTied = true;
        }
    }
}

function continueGame() {

    if (!isGameWon && !isGameTied) {

        if (currentPlayer === "X") {
            currentPlayer = "O"
            h3Element.innerText = textO

        } else {
            currentPlayer = "X"
            h3Element.innerText = textX
        }
    }
}

function playGame(event) {

    clickedCell = event.target
    
    if (!isGameWon && !isGameTied && clickedCell.innerText === "") {
        inputXorO()
        winGame()
        tieGame()
        continueGame()
    }
}

function resetGame() {
    
    cellElements.forEach((element) => {
        element.innerText = ""
        element.classList.remove("xStyle")
        element.classList.remove("oStyle")
    })

    currentPlayer = "X"
    h3Element.innerText = textX
    isGameTied = false;
    isGameWon = false;
}

/*----------------------------- Event Listeners -----------------------------*/
cellElements.forEach((element) => {
    element.addEventListener("click", playGame);
})

resetButton.addEventListener("click", resetGame)