import React from "react";
import Cell from "./Cell";

class Board extends React.Component {
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

export default Board;
