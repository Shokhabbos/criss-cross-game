import React, { Component } from "react";
import "./App.css";

class Cell extends Component {
  render() {
    return (
      <button className="cell" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {
  renderCell(i) {
    return (
      <Cell
        key={`cell-${i}`}
        value={this.props.board[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        {this.props.board.map((_, i) => this.renderCell(i))}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      gameStarted: false,
    };
  }

  handleClick = (i) => {
    const { board, winner, gameStarted, currentPlayer } = this.state;

    if (winner || board[i]) {
      return;
    }
    if (!gameStarted) {
      this.setState({ gameStarted: true });
    }

    const newBoard = [...board];
    newBoard[i] = currentPlayer;

    this.setState({ board: newBoard }, () => {
      this.checkWinner();
      this.togglePlayer();
    });
  };

  togglePlayer = () => {
    this.setState({
      currentPlayer: this.state.currentPlayer === "X" ? "O" : "X",
    });
  };

  checkWinner = () => {
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

    const { board } = this.state;

    const winnerLine = lines.find(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
    );

    if (winnerLine) {
      const [a] = winnerLine;
      this.setState({ winner: board[a] });
      return;
    }

    if (board.every(Boolean)) {
      this.setState({ winner: "draw" });
    }
  };

  resetGame = () => {
    this.setState({
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
    });
  };

  help = () => {
    const { board, currentPlayer } = this.state;
    const emptyCells = board
      .map((cell, i) => (!cell ? i : null))
      .filter((el) => el !== null);

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newBoard = board.map((cell, i) =>
        i === randomCell ? currentPlayer : cell
      );

      this.setState({ board: newBoard }, () => {
        this.checkWinner();
        this.togglePlayer();
      });
    } else {
      this.setState({ winner: "draw" });
    }
  };

  render() {
    const { currentPlayer, winner, gameStarted } = this.state;
    const status = winner
      ? `Player: ${winner} wins!`
      : `Player:${currentPlayer === "X" ? "X" : "O"}`;
    const isGameFinished = winner !== null || this.state.board.every(Boolean);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header-title">
            <a
              className="link"
              href="https://github.com/Shokhabbos/criss-cross-game"
            >
              Criss-Cross Game
            </a>
          </h1>
          <h5 className={`game-start-message ${gameStarted ? "hidden" : ""}`}>
            You can press any buttons to start the game
          </h5>
          <h2>{status}</h2>
        </header>
        <main>
          <Board
            board={this.state.board}
            onClick={(i) => this.handleClick(i)}
          />
          <button onClick={this.resetGame} className="action-button">
            New Game
          </button>
          <button
            onClick={this.help}
            className={`action-button ${isGameFinished ? "disabled" : ""}`}
            disabled={isGameFinished}
          >
            Help
          </button>
        </main>
      </div>
    );
  }
}

export default App;
