let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameOver = false;

    enableBoxes();

    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver || box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
    });
};

const showWinner = (winner, pattern) => {

    pattern.forEach((index) => {
        boxes[index].classList.add("winner");
    });

    msg.innerText = `Winner: ${winner}`;
    msgContainer.classList.remove("hide");

    newGameBtn.classList.remove("hide");

    gameOver = true;
    disableBoxes();
};

const showDraw = () => {

    msg.innerText = "Match Draw!";
    msgContainer.classList.remove("hide");

    newGameBtn.classList.remove("hide");

    gameOver = true;
    disableBoxes();
};

const checkWinner = () => {

    for (let pattern of winPatterns) {

        let [a, b, c] = pattern;

        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1, pattern);
            return;
        }
    }

    let filledBoxes = 0;

    boxes.forEach((box) => {
        if (box.innerText !== "") {
            filledBoxes++;
        }
    });

    if (filledBoxes === 9) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Hide New Game button when page loads
newGameBtn.classList.add("hide");
