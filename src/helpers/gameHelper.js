// GameHelpers.js
export const help = (state) => {
  const { board, currentPlayer } = state;
  const emptyCells = board
    .map((cell, i) => (!cell ? i : null))
    .filter((el) => el !== null);

  if (emptyCells.length > 0) {
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map((cell, i) =>
      i === randomCell ? currentPlayer : cell
    );

    return {
      board: newBoard,
      ...checkWinner(newBoard),
      currentPlayer: togglePlayer(currentPlayer),
    };
  } else {
    return { winner: "draw" };
  }
};

export const resetGame = () => {
  return {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
  };
};

export const togglePlayer = (currentPlayer) => {
  return currentPlayer === "X" ? "O" : "X";
};

export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winnerLine = lines.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
  );

  if (winnerLine) {
    const [a] = winnerLine;
    return { winner: board[a] };
  }

  if (board.every(Boolean)) {
    return { winner: "draw" };
  }

  return {};
};
