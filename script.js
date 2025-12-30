 const submit = document.getElementById("submit");
  const message = document.querySelector(".message");
  const game = document.querySelector(".game");
  const cells = document.querySelectorAll(".cell");

  let player1, player2;
  let currentPlayer;
  let currentSymbol = "x";
  let gameOver = false;

  const winPatterns = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
  ];

  submit.addEventListener("click", () => {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (!player1 || !player2) return;

    currentPlayer = player1;
    currentSymbol = "x";

    game.style.display = "block";
    message.textContent = `${currentPlayer}, you're up`;
  });

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.textContent || gameOver) return;

      cell.textContent = currentSymbol;

      if (checkWin()) {
        message.textContent = `${currentPlayer} congratulations you won!`;
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
      currentSymbol = currentSymbol === "x" ? "o" : "x";

      message.textContent = `${currentPlayer}, you're up`;
    });
  });

  function checkWin() {
    return winPatterns.some(pattern =>
      pattern.every(id =>
        document.getElementById(id).textContent === currentSymbol
      )
    );
  }