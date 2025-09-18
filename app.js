let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false; // New flag

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
    gameOver = false; // reset flag
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return; // prevent click after game over
        if (box.innerText !== "") return; // prevent overwrite

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
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true; // set flag
    disableBoxes(); // disable all boxes
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }
};

// Event listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
