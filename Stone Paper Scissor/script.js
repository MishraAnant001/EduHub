let stone = document.getElementById("stone");
let paper = document.getElementById("paper");
let scissor = document.getElementById("scissor");
let game = document.getElementById("game");
let start = document.getElementsByClassName("start")[0];
let res = document.getElementById("res");
let u = document.getElementById("u");
let c = document.getElementById("c");
let chance = document.getElementById("chances");
start.onclick = (() => {
    game.classList.remove("d-none")
    start.classList.add("d-none");
    len = 1;
    compscore = 0;
    userscore = 0;
    stone.classList.remove("d-none")
    paper.classList.remove("d-none")
    paper.innerHTML = "Paper";
    scissor.classList.remove("d-none")
    res.innerHTML = "Choose Your Option";
    startGame();
})

let compscore = 0;
let userscore = 0;
let comp = null;
let len = 1;
let userOption = null;
let array = ["Stone", "Paper", "Scissor"]

function generateguess() {
    let random = Math.floor(Math.random() * 3);
    // console.log(random);
    let compGuess = array[random];
    return compGuess;
    //     console.log(compGuess);
}
function calculateResult(userguess, compguess) {
    if (len > 7) {
        u.classList.add("d-none");
        c.classList.add("d-none");
        chance.classList.add("d-none");
        stone.classList.add("d-none")
        paper.classList.add("d-none")
        scissor.classList.add("d-none")
        let winner = null;
        if (userscore > compscore) {
            winner = "User"
        }
        else if (userscore < compscore) {
            winner = "Computer"
        }
        else {
            winner = "no one It's a Tie!"
        }
        res.innerHTML = `Your Score is : ${userscore}<br> Computer score is : ${compscore}<br>Winner is : ${winner}`
        start.classList.remove("d-none")
        start.innerHTML = "Play Again";

    }
    else {

        u.classList.remove("d-none");
        c.classList.remove("d-none");
        chance.classList.remove("d-none");
        u.innerHTML = `You Guessed : ${userguess}`
        c.innerHTML = `Computer Guessed :${compguess}`
        let num = 7 - len;
        chance.innerHTML = `Chances left : ${num}`
        if (userguess == "Stone") {
            if (compguess == "Paper") {
                compscore++;
            }
            else if (compguess == "Scissor") {
                userscore++;
            }
        }
        else if (userguess == "Paper") {
            if (compguess == "Stone") {
                userscore++;
            }
            else if (compguess == "Scissor") {
                compscore++;
            }
        }
        else if (userguess == "Scissor") {
            if (compguess == "Paper") {
                userscore++;
            }
            else if (compguess == "Stone") {
                compscore++;
            }
        }
        if (len == 7) {
            u.classList.add("d-none");
            c.classList.add("d-none");
            chance.classList.add("d-none");
            stone.classList.add("d-none")
            paper.innerHTML = "Finish";
            scissor.classList.add("d-none")
        }
        len++;
    }
}

function startGame() {
    stone.onclick = (() => {
        userOption = stone.textContent;
        // console.log("🚀 ~ startGame ~ userOption:", userOption)
        comp = generateguess();
        // console.log("🚀 ~ startGame ~ comp:", comp)
        // calculateResult("Stone", "Paper");
        calculateResult(userOption, comp);
        // calculateResult("Paper", "Paper");
        // console.log(userOption);
    })
    paper.onclick = (() => {
        userOption = paper.textContent;
        // console.log("🚀 ~ startGame ~ userOption:", userOption)
        comp = generateguess();
        // console.log("🚀 ~ startGame ~ comp:", comp)
        calculateResult(userOption, comp);
        // calculateResult("Stone", "Paper");
        // calculateResult("Paper", "Paper");
        // console.log(userOption);
    })
    scissor.onclick = (() => {
        userOption = scissor.textContent;
        // console.log("🚀 ~ startGame ~ userOption:", userOption)
        comp = generateguess();
        // console.log("🚀 ~ startGame ~ comp:", comp)
        calculateResult(userOption, comp);
        // calculateResult("Paper", "Paper");
        // console.log(userOption);
    })
}

// generateguess()

