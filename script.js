// checks whether text added to p element exists 
function checkHtmlJsConn() {
    addElementTOHtml()
    let para  = document.querySelector(".result")
    let checkParaExists = para.textContent.length > 0
    return checkParaExists
}

// adds an element and its text in linked html 
function addElementTOHtml() {
    let para = document.createElement("p")
    para.textContent = "script is connected to html!"
    para.className = "result"
    document.body.append(para)
}

function getPlayerInput(round, forceMove) {
    if (forceMove === undefined) {
        let pInput = ""
        const validpInputs = new Set(["rock", "paper", "scissor"])
        while (!validpInputs.has(pInput)) {
            if (round === GAMEROUNDS - 1) {
                pInput = prompt("Last round! Enter rock, paper or scissors")
            }
            else {
            pInput = window.prompt(`Round ${round+1}: Enter rock, paper or scissors`)
            }
        }
        return pInput.toLowerCase()
    }
    return forceMove.toLowerCase()
}

function getCpuInput(forceMove) {
    if (forceMove === undefined) {
        const prob = Math.random().toFixed(2)
        let cpuRes = ""
        if (prob < 0.33) {
            cpuRes = "rock"
        }
        else if (prob >= 0.33 && prob < 0.66) {
            cpuRes = "paper"
        }
        else {
            cpuRes = "scissor"
        }
        return cpuRes 
    }
    return forceMove
}

function checkWinner(pMove, cpuMove) {
    let playerWon = null
    let winner = ""

    if (pMove === cpuMove) {
    winner = "nobody"
    } 
    else {
        if (playerWon == null) {
            playerWon = (pMove == "rock" && cpuMove == "scissor") ? true : null;
        }
        if (playerWon == null) {
            playerWon = (pMove === "paper" && cpuMove === "rock") ? true : null;
        }
        if (playerWon == null) {
            playerWon = (pMove === "scissor" && cpuMove === "paper") ? true : null;
        }
        if (playerWon === true) {
            playerWins += 1
            winner = "Player"
        }
        else {
            cpuWins += 1
            winner = "CPU"
        }
    }

    return winner
}

function playRound(roundNumber) {
    let playerMoves = ["rock", "paper", "scissor", "rock", "paper"]
    let cpuMoves = ["scissor", "rock", "rock", "paper", "paper"]
    
    let playerInput;
    if (typeof window === "undefined") {
        playerInput = getPlayerInput(roundNumber, playerMoves[roundNumber])
    }
    else {
        playerInput = getPlayerInput(roundNumber)
    }
    let cpuInput = getCpuInput()//cpuMoves[i])
    let res = checkWinner(playerInput, cpuInput)
    try {
        alert(`${res} won this round`)
    }
    catch (error) {
        if (error instanceof ReferenceError) {
            console.log(`${res} won this round`)
        }
        else {
            throw error;
        }
    }
}

const GAMEROUNDS = 5
let playerWins = 0
let cpuWins = 0

function runRpcGame() {
    for (let i = 0; i < GAMEROUNDS; i += 1) {

        playRound(i)
    }
    let winnerMsg = ""
    if (playerWins > cpuWins){
        winnerMsg = `WINNER: Player won ${playerWins} out of ${GAMEROUNDS} rounds`
    } 
    else if (playerWins < cpuWins) {
        winnerMsg = `WINNER: CPU won ${cpuWins} out of all ${GAMEROUNDS} rounds`
    }
    else {
        winnerMsg =  "WINNER: It's a tie"
    }
    let tieMsg = ` with ${Math.abs((playerWins+cpuWins) - GAMEROUNDS)} ties`
    try {
        alert(winnerMsg+tieMsg)
    }
    catch (error) {
        if (error instanceof ReferenceError) {
            console.log(winnerMsg+tieMsg)
        }
    }
}


function main() {
    // posts a log in the browser, not when manually run
    // if (typeof window !== "undefined" ) {
    // console.log("checkHtmlJsConn: ",checkHtmlJsConn())

    // }
    // runRpcGame()

}



// // ===================================================

main()





