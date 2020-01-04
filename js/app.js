/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// how to create our fundamental game variables
var scores, roundScore, activePlayer, gamePlaying;

init();

// how to generate a random number
// dice = Math.floor(Math.random() * 6) + 1;

// how to manipulate the DOM
// document.querySelector("#current-" + activePlayer).textContent = dice;

// how to read from the DOM
// var x = document.querySelector("#score-0").textContent;
// console.log(x);

// part 2 of project //
// setup a event handler
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      // add the score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
  }
});

// button hold
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add the current score to the global score
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // hide dice after player change
  document.querySelector(".dice").style.display = "none";
}

// new game button
document.querySelector(".btn-new").addEventListener("click", init);
// reset the player score)

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // how to change css styles
  document.querySelector(".dice").style.display = "none";

  // reset the score
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// challenges
//1
