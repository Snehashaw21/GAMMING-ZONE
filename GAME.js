let userScore = 0;
let compScore = 0;
let totalGames = 0;
let level = 1;
let gameActive = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const userChoiceSpan = document.querySelector("#user-choice");
const compChoiceSpan = document.querySelector("#comp-choice");
const saveNameBtn = document.querySelector("#save-name-btn");
const usernameInput = document.querySelector("#username-input");
const userNameDisplay = document.querySelector("#user-name");
const nextLevelBtn = document.querySelector("#next-level-btn");
const rpsGame = document.querySelector("#rps-game");
const tttGame = document.querySelector("#tictactoe-game");
const boardEl = document.querySelector("#board");
const tttMsg = document.querySelector("#ttt-msg");
const restartTttBtn = document.querySelector("#restart-ttt-btn");
const nextLevelBtnTtt = document.querySelector("#next-level-btn-ttt");
const tttControls = document.querySelector(".ttt-controls");

let board = [];
let tttOver = false;

saveNameBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    userNameDisplay.innerText = name;
    usernameInput.value = "";
    gameActive = true;
    msg.innerText = "Play your move";
  }
});

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (!gameActive) return;
    const userChoice = choice.id;
    playGame(userChoice);
  });
});

function playGame(userChoice) {
  const compChoice = getCompChoice();
  userChoiceSpan.innerText = userChoice;
  compChoiceSpan.innerText = compChoice;
  totalGames++;

  if (userChoice === compChoice) {
    msg.innerText = `It's a draw! Both chose ${userChoice}`;
    msg.style.backgroundColor = "#808080";
  } else {
    const userWins =
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper");

    if (userWins) {
      userScore++;
      userScorePara.innerText = userScore;
      msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
    } else {
      compScore++;
      compScorePara.innerText = compScore;
      msg.innerText = `You lost! ${compChoice} beats ${userChoice}`;
      msg.style.backgroundColor = "red";
    }
  }

  if (totalGames >= 20) {
    gameActive = false;
    let winner =
      userScore > compScore ? `${userNameDisplay.innerText} wins!`
      : compScore > userScore ? "Computer wins!" : "It's a draw!";
    msg.innerText = `🎉 LEVEL ${level} COMPLETE! ${winner}`;
    msg.style.backgroundColor = "#ff9800";
    nextLevelBtn.style.display = "inline-block";
  }
}

function getCompChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

nextLevelBtn.addEventListener("click", () => {
  level++;
  document.querySelector(".level-text").innerText = `LEVEL ${level}`;
  rpsGame.style.display = "none";
  tttGame.style.display = "block";
  nextLevelBtn.style.display = "none";
  startTicTacToe();
});

function startTicTacToe() {
  board = Array(9).fill("");
  tttOver = false;
  boardEl.innerHTML = "";
  tttMsg.innerText = "Your turn!";
  tttMsg.style.backgroundColor = "transparent";
  tttMsg.style.color = "#0a3d62";
  tttControls.style.display = "none";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    boardEl.appendChild(cell);
  }
}

boardEl.addEventListener("click", e => {
  if (tttOver) return;
  const idx = e.target.dataset.index;
  if (!idx || board[idx]) return;

  board[idx] = "X";
  e.target.innerText = "X";

  if (checkWin("X")) {
    tttOver = true;
    tttMsg.innerText = `🎉 LEVEL ${level} COMPLETE! You win!`;
    tttMsg.style.backgroundColor = "green";
    tttMsg.style.color = "white";
    tttControls.style.display = "flex";
    return;
  }

  if (board.every(cell => cell)) {
    tttOver = true;
    tttMsg.innerText = `🎉 LEVEL ${level} COMPLETE! It's a draw!`;
    tttMsg.style.backgroundColor = "grey";
    tttMsg.style.color = "white";
    tttControls.style.display = "flex";
    return;
  }

  compMove();
});

function compMove() {
  let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  if (!empty.length) return;
  let idx = empty[Math.floor(Math.random() * empty.length)];
  board[idx] = "O";
  boardEl.children[idx].innerText = "O";

  if (checkWin("O")) {
    tttOver = true;
    tttMsg.innerText = `🎉 LEVEL ${level} COMPLETE! Computer wins!`;
    tttMsg.style.backgroundColor = "red";
    tttMsg.style.color = "white";
    tttControls.style.display = "flex";
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => pattern.every(i => board[i] === player));
}

restartTttBtn.addEventListener("click", startTicTacToe);

nextLevelBtnTtt.addEventListener("click", () => {
  alert("🎉 Level 3 coming soon!");
});
