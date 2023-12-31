import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");

const allGameIcons = document.querySelectorAll(".fa-regular");

const choices = {
  rock: { name: "Rock", defeats: ["scissors"] },
  paper: { name: "Paper", defeats: ["rock"] },
  scissors: { name: "Scissors", defeats: ["paper"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// Reset all 'selected icons'
const resetSelected = function () {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
};

// Reset Score & playerChoice/computerChoice
const resetAll = function () {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = "";
  resultText.textContent = "";
  resetSelected();
};
window.resetAll = resetAll;

// Random computer choice
const computerRandomChoice = function () {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "scissors";
  }
};

// Add 'selected' styling & computerChoice
const displayComputerChoice = function () {
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    default:
      break;
  }
};

// Check results, increase scores, update resultText
const updateScore = function (playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = "You won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
};

// Call functions to process turn
const checkResult = function (playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

// Passing player selection value and styling icons
const select = function (playerChoice) {
  checkResult(playerChoice);
  // Add 'selected' styling & playerChoice
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    default:
      break;
  }
};

window.select = select;

// On startup, set initial values
resetAll();
