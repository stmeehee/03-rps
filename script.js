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
    if (!forceMove) {
        let pInput = ""
        if (round === GAMEROUNDS - 1) {
            pInput = prompt("Last round! Enter rock, paper or scissors")
        }
        else {
        pInput = window.prompt(`Round ${round+1}: Enter rock, paper or scissors`)
        }
        return pInput.toLowerCase()
    }
    return forceMove.toLowerCase()

}

function getCpuInput() {
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

function checkWinner(pMove, cpuMove) {
    const ro = "rock"
    const pa = "paper"
    const sc = "scissor"
    let winner = ""

    if (!winner) {
        winner = (pMove == ro && cpuMove == sc) ? "Player" : "CPU";
    }
    if (!winner) {
        winner = (pMove === pa && cpuMove === ro) ? "Player" : "CPU";
    }
    if (!winner) {
        winner = (pMove === sc && cpuMove === pa) ? "Player" : "CPU";
    }

    if (pMove === cpuMove) {
        winner = "nobody"
    }
    else {
        if (winner === "Player") {
            playerWins += 1
        }
        else if (winner === "CPU") {
            cpuWins += 1
        }
    }

    return winner
}

const GAMEROUNDS = 5
let playerWins = 0
let cpuWins = 0
let ties = 0

function runRpcGame() {
    let playerMoves = ["rock", "paper", "scissor", "rock", "paper"]

    for (let i = 0; i < GAMEROUNDS; i += 1) {

        let playerInp = getPlayerInput(i, playerMoves[i])
        let cpuInp = getCpuInput()
        let res = checkWinner(playerInp, cpuInp)
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
    let winnerMsg = (playerWins > cpuWins)
                    ? `Player won ${playerWins} out of ${GAMEROUNDS} rounds`
                    : `CPU won ${cpuWins} out of all ${GAMEROUNDS} rounds`
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
    if (typeof window !== "undefined" ) {
    console.log("checkHtmlJsConn: ",checkHtmlJsConn())

    }
    runRpcGame()

}



// // ===================================================

main()





