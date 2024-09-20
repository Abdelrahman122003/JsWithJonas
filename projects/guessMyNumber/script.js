"use strict";

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Send Message using function;

const sendMessage = (message) => {
  document.querySelector(".message").textContent = message;
};
document.querySelector(".number").textContent = number;
document.querySelector(".check").addEventListener("click", function () {
  document.querySelector(".number").textContent = number;
  const guss = Number(document.querySelector(".guess").value);
  if (!guss) {
    sendMessage("No Number");
  } else if (guss < number) {
    if (score > 1) {
      sendMessage("Too Low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      sendMessage("You Are Lose!");
      document.querySelector(".score").textContent = 0;
    }
  } else if (guss > number) {
    if (score > 1) {
      sendMessage("Too High");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      sendMessage("You Are Lose!");
      document.querySelector(".score").textContent = 0;
    }
  } else if (guss === number) {
    sendMessage("Correct Number");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  sendMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
