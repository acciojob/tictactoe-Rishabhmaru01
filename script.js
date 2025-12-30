//your JS code here. If required.
  const submitBtn = document.getElementById("submit");
  const playerForm = document.getElementById("player-form");
  const game = document.querySelector(".game");
  const message = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  let player1 = "";
  let player2 = "";
  let currentPlayer = "";
  let currentSymbol = "X";
  let gameOver = false;

  const winPatterns = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
  ];

  submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (!player1 || !player2) {
      alert("Please enter both player names");
      return;
    }

    playerForm.style.display = "none";
    game.style.display = "block";

    currentPlayer = player1;
    message.textContent = `${currentPlayer}, you're up`;
  });

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.textContent !== "" || gameOver) return;

      cell.textContent = currentSymbol;

      if (checkWinner()) {
        message.textContent = `${currentPlayer} congratulations you won!`;
        gameOver = true;
        return;
      }

      if (isDraw()) {
        message.textContent = "It's a draw!";
        gameOver = true;
        return;
      }

      if (currentSymbol === "X") {
        currentSymbol = "O";
        currentPlayer = player2;
      } else {
        currentSymbol = "X";
        currentPlayer = player1;
      }

      message.textContent = `${currentPlayer}, you're up`;
    });
  });

  function checkWinner() {
    return winPatterns.some(pattern => {
      return pattern.every(id => {
        return document.getElementById(id).textContent === currentSymbol;
      });
    });
  }

  function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
  }