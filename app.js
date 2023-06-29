console.log("app.js running!");
/*----- constants -----*/
/*----- app's state (variables) -----*/
const state = {
    score: 0,
    playerSequence: [],
    computerSequence: [],
};
/*----- cached element references -----*/
const h2 = document.querySelector("h2");
const dialpad = document.querySelectorAll(".is-custom-width");
const scoreDisplay = document.querySelector("#scoreDisplay");
const newGame = document.querySelector("#newGame");
const submitButton = document.querySelector("#submitButton");

/*----- event listeners -----*/

/*----- functions -----*/

const init = () => {
    newGame.addEventListener("click", init);
    state.score = 0;
    state.playerSequence = [];
    state.computerSequence = [];

    dialpad.forEach((keypad, idx) => {
        keypad.addEventListener("click", handleKeypadClick);
    });

    newGame.addEventListener("click", () => {
        init();
    });

    render();
};

const render = () => {
    scoreDisplay.textContent = `Your score: ${state.score}`;
    h2.textContent = "Repeat the order back!";
    generateSequence();
    displaySequence();
    if (state.computerSequence.length === state.playerSequence.length) {
        compareSequences();
    }
};

const handleKeypadClick = (e) => {
    const buttonNumber = parseInt(e.target.id.toString().slice(3));
    state.playerSequence.push(buttonNumber);
    if (state.computerSequence.length === state.playerSequence.length) {
        compareSequences();
    }
};

const generateSequence = () => {
    let randomNum = Math.floor(Math.random() * 12) + 1;
    state.computerSequence.push(randomNum);
};

const displaySequence = () => {
    let idx = 0;
    const timer = setInterval(() => {
        const id = state.computerSequence[idx];
        document
            .querySelector(`#key${id}`)
            .classList.add("animate__animated", "animate__pulse", "is-light");
        setTimeout(() => {
            document
                .querySelector(`#key${id}`)
                .classList.remove(
                    "animate__animated",
                    "animate__pulse",
                    "is-light"
                );
        }, 800);
        idx++;
        if (idx >= state.computerSequence.length) {
            clearInterval(timer);
        }
    }, 1000);
};

const compareSequences = () => {
    if (state.computerSequence.toString() === state.playerSequence.toString()) {
        state.score++;
        scoreDisplay.textContent = `Your Score:${state.score}`;
        state.playerSequence = [];
        render();
    } else {
        state.score = 0;
        scoreDisplay.textContent = "Try again!";
    }
};

init();
