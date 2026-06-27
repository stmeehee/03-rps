function getPlayerInput(forceMove) {
    if (forceMove !== null) {
        return forceMove 
    }

}

function getCpuInput(forceMove) {
    if (forceMove !== null) {
        return forceMove
    }
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

function getWinner(pMove, cpuMove) {
    let playerWon = null
    let winner = ""

    if (pMove === cpuMove) {
    winner = "nobody"
    ties += 1
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
            winner = "Player won this round!"
        }
        else {
            cpuWins += 1
            winner = "CPU won the round!"
        }
    }
    return winner
}

// moves for debugging
let PLAYERMOVES = ["rock", "paper", "scissor", "rock", "paper"]
let CPUMOVES = ["scissor", "rock", "rock", "paper", "paper"]

function playRound(playerInput) {    
    let cpuInput;
    if (typeof document === "undefined") {
        playerInput = getPlayerInput(PLAYERMOVES[rounds % PLAYERMOVES.length])
        cpuInput = getCpuInput(CPUMOVES[rounds % CPUMOVES.length])
    }
    else {
        cpuInput = getCpuInput(null)
    }
    let res = getWinner(playerInput, cpuInput)
    rounds +=1
    return res
}

const MAXSCORE = 5
let playerWins = 0
let cpuWins = 0
let rounds = 0
let ties = 0

function runRpcGame(input) {    
    let res = ""
    if (typeof document === "undefined") {
        while ( checkGameRunning() ) {
        res = playRound(null)
        console.log(res)
        }
    }
    else {
        res = playRound(input)
    }
    res =  checkGameRunning()? res : getGameEndMsg()
    return res
}

function getGameEndMsg() {
        let winnerMsg = ""
        if (playerWins > cpuWins){
            winnerMsg = `WINNER: Player won ${playerWins} out of ${rounds} rounds`
        } 
        else if (playerWins < cpuWins) {
            winnerMsg = `WINNER: CPU won ${cpuWins} out of all ${rounds} rounds`
        }
        else {
            winnerMsg =  "WINNER: It's a tie"
        }
        let tieMsg = ` with ${ties} ties`
        try {
            alert(winnerMsg+tieMsg)
        }
        catch (error) {
            if (error instanceof ReferenceError) {
                console.log(winnerMsg+tieMsg)
            }
        }
    return winnerMsg
}

function checkGameRunning() {
    let res = cpuWins < MAXSCORE && playerWins < MAXSCORE
    return res
}

function updateUI(playerScoreElem, cpuScoreElem, statusMsgElem, winMsg, roundElem, tiesElem) {   
    playerScoreElem.textContent = playerWins
    cpuScoreElem.textContent = cpuWins
    statusMsgElem.textContent = winMsg
    roundElem.textContent = rounds
    tiesElem.textContent = ties
}

function getScores(playerScoreElem, cpuScoreElem, roundElem, tiesElem) {
    playerWins = Number(playerScoreElem.textContent)
    cpuWins = Number(cpuScoreElem.textContent)
    rounds = Number(roundElem.textContent)
    ties = Number(tiesElem.textContent)
}

function setup() {
    if (typeof document !== "undefined") {
        const playerScoreElem = document.querySelector(".player-score span")
        const cpuScoreElem = document.querySelector(".cpu-score span")
        const roundElem = document.querySelector(".round")
        const tiesElem = document.querySelector(".ties-score")
        const statusElem = document.querySelector(".status")
        const inputButton = document.querySelector(".button-container")

        document.addEventListener("playerChoice", (event) => {
            // getScores(playerScoreElem, cpuScoreElem, roundElem, tiesElem)
            let winner = runRpcGame(event.detail.toLowerCase())
            // sets score and updates UI
            updateUI(playerScoreElem, cpuScoreElem, statusElem, winner, roundElem, tiesElem)
            })        
        inputButton.addEventListener('click', (event) => {
            const myEvent = new CustomEvent("playerChoice", {
                detail: event.target.textContent
            }) 
            document.dispatchEvent(myEvent)
            })
    }
    else {
        let winner = runRpcGame()
    }
}

function main() {

    if (typeof document !== "undefined")
        setup()
    else {
        runRpcGame()
    }
}



// // ===================================================

main()





