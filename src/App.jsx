import React, { Component } from 'react';
import './App.css';

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
        {this.props.board.map((cell, i) => this.renderCell(i))}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      gameStarted:false
    };
  }

  handleClick(i) {
    const board = this.state.board.slice();
    const winner = this.state.winner;

    if (winner || board[i]) {
      return;
    }
     if (!this.state.gameStarted) {
      this.setState({ gameStarted: true }); 
    }

    board[i] = this.state.currentPlayer;
    this.setState({ board: board }, () => {
      this.checkWinner();
      this.togglePlayer();
    });
  }

  togglePlayer() {
    this.setState({
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
    });
  }

  checkWinner() {
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

    for (let line of lines) {
      const [a, b, c] = line;
      const board = this.state.board;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({ winner: board[a] });
        return;
      }
    }

    if (this.state.board.every((cell) => cell)) {
      this.setState({ winner: 'draw' });
    }
  }

  resetGame() {
    this.setState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    });
  }

help() {
  const board = this.state.board.slice();
  const emptyCells = [];

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      emptyCells.push(i);
    }
  }

  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = this.state.currentPlayer;
    this.setState({ board: board }, () => {
      this.checkWinner();
      this.togglePlayer();
    });
  } else {
    this.setState({ winner: 'draw' });
  }
}
 render() {
    const currentPlayer = this.state.currentPlayer;
    const winner = this.state.winner;
    const status = winner ? `Player: ${winner} wins!` : `Player:${currentPlayer === 'X' ? 'X' : 'O'}`;
    const isGameFinished = winner !== null || this.state.board.every((cell) => cell);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Criss-Cross Game</h1>
               <h5
            className={`game-start-message ${this.state.gameStarted ? 'hidden' : ''}`}
          >
            You can press any buttons to start the game
          </h5>
          <h2>{status}</h2>
        </header>
        <main>
          <Board
            board={this.state.board}
            onClick={(i) => this.handleClick(i)}
          />
          <button
            onClick={() => this.resetGame()}
            className="action-button"
          >
            New Game
          </button>
          <button
            onClick={() => this.help()}
            className={`action-button ${isGameFinished ? 'disabled' : ''}`}
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