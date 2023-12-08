// App.jsx
import React from "react";
import Board from "./components/Board";
import {
  help,
  resetGame,
  togglePlayer,
  checkWinner,
} from "./helpers/gameHelper";

class App extends React.Component {
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

    this.setState({
      board: newBoard,
      ...checkWinner(newBoard),
      currentPlayer: togglePlayer(currentPlayer),
    });
  };

  resetGame = () => {
    this.setState(resetGame());
  };

  help = () => {
    this.setState(help(this.state));
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
