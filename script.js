const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".square").forEach((square) => {
      square.textContent = "";
    });
    document.getElementById("message").textContent = "";
  };

  const makeSquare = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const getBoard = () => board;

  return { getBoard, makeSquare, resetBoard };
})();

const player = (name, marker) => {
  return { name, marker };
};

const game = (() => {
  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");
  let currentPlayer;

  const startGame = () => {
    gameBoard.resetBoard();
    currentPlayer = player1;
    document.getElementById(
      "message"
    ).textContent = `${currentPlayer.name}'s turn`;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combo of winConditions) {
      const [index1, index2, index3] = combo;
      if (
        gameBoard.getBoard()[index1] &&
        gameBoard.getBoard()[index1] === gameBoard.getBoard()[index2] &&
        gameBoard.getBoard()[index1] === gameBoard.getBoard()[index3]
      ) {
        return true;
      }
    }
    return false;
  };

  const checkTie = () => {
    return !gameBoard.getBoard().includes("");
  };

  const makeMove = (index) => {
    if (!currentPlayer) {
      document.getElementById("message").textContent =
        "Click on Start Button to start the game!";
    }
    if (gameBoard.makeSquare(index, currentPlayer.marker)) {
      document.querySelector(`.square[data-index="${index}"]`).textContent =
        currentPlayer.marker;

      if (checkWinner()) {
        document.getElementById(
          "message"
        ).textContent = `${currentPlayer.name} wins!`;

        return true;
      }
      if (checkTie()) {
        document.getElementById("message").textContent = "It's a tie!";
        return true;
      }
      switchPlayer();
      document.getElementById(
        "message"
      ).textContent = `${currentPlayer.name}'s turn`;
    } else {
      document.getElementById("message").textContent =
        "Square already taken! Try another square.";
    }
    return false;
  };

  return { startGame, makeMove };
})();

document.getElementById("start-btn").addEventListener("click", () => {
  game.startGame();
});

document.getElementById("reset-btn").addEventListener("click", () => {
  gameBoard.resetBoard();
  document.getElementById("message").textContent = "";
});

document.querySelectorAll(".square").forEach((square) => {
  square.addEventListener("click", () => {
    const index = square.getAttribute("data-index");
    game.makeMove(index);
  });
});
