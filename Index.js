const DisplayTurn = document.querySelector('.showturn');
const crosswin = document.querySelector('.Xwon');
const zerowin = document.querySelector('.zerowon');
var currentPlayer = "X";
var RestartButton = document.querySelector('.restart');
var NewGameButton = document.querySelector('.reagain');
var Allcell = document.querySelectorAll('.cell');
var count = 0;
var ca = 0;
var gameState = ["", "", "", "", "", "", "", "", ""];
var gamestatus = true;

var WINCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

DisplayTurn.innerHTML = `IT'S ${currentPlayer}'S TURN`

function PlayerTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    DisplayTurn.innerHTML = currentPlayerTurn();
}

function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

Allcell.forEach(cell => cell.addEventListener('click', handleCellClicked));

function handleCellClicked(e) {
    var clickedCell = e.target;
    var clickedCellIndex = parseInt(clickedCell.getAttribute('cell'));

    if (gameState[clickedCellIndex] !== "" || !gamestatus) {
        return 0;
    }
    CellPlayed(clickedCell, clickedCellIndex);
    main();
}

function main() {

    let roundWon = false;
    for (var i = 0; i <= 7; i++) {
        var winCondition = WINCondition[i];
        var a = gameState[winCondition[0]];
        var b = gameState[winCondition[1]];
        var c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        DisplayTurn.innerHTML = winningMessage();
        if (currentPlayer == "X") {
            count = count + 1;
            currentPlayer = "O"
            console.log(' X  won  the number of match . ' + count);
            crosswin.innerHTML = countWin();
        } else {
            ca = ca + 1;
            currentPlayer = "X"
            console.log(currentPlayer);
            console.log(' 0  won  the number of match . ' + ca);
            zerowin.innerHTML = zeroWin();

        }

        // reload the new game 
        if (ca == 3 && count < 3) {
            NewGame();
        } else if (count == 3 && ca < 3) {
            NewGame();
        }

        gamestatus = false;
        ResetGame();
        return;
    }
    var roundDraw = !gameState.includes("");
    if (roundDraw) {
        DisplayTurn.innerHTML = drawMessage();
        gamestatus = false;

        return;
    }
    PlayerTurn();
}

function PlayerTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    DisplayTurn.innerHTML = currentPlayerTurn();
}

RestartButton.addEventListener('click', ResetGame);

function ResetGame() {
    //alert(' game is done');
    gamestatus = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    DisplayTurn.innerHTML = currentPlayerTurn();
    Allcell.forEach(cell => cell.innerHTML = "");

}

NewGameButton.addEventListener('click', NewGame);

function NewGame() {
    //alert('DO YOU WANT TO START NEW GAME ?');
    gamestatus = true;
    count = 0;
    ca = 0;
    zerowin.innerHTML = zeroWin();
    crosswin.innerHTML = countWin();
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    DisplayTurn.innerHTML = currentPlayerTurn();
    Allcell.forEach(cell => cell.innerHTML = "");

}

console.log(currentPlayer);

function currentPlayerTurn() {
    return `IT's ${currentPlayer} TURN`

}

function winningMessage() {
    return `PLAYER ${currentPlayer} HAS WON THE GAME`
}

function draw() {
    return `GAME HAS ENDED DRAW`
}

function countWin() {
    return ` X won ${count} times`
}

function zeroWin() {
    return ` O won ${ca} times`
}