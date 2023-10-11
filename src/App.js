import { useState } from 'react';
import ToggleSwitchButton from './ToggleSwitchButton';

function Square({ className, value, onSquareClick }) {
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const line = result ? result.line : [];
  const isDraw = result ? result.isDraw : false;

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const board = [];
  for (let i = 0; i < 3; i++) {
    const rowSquares = [];
    for (let j = 0; j < 3; j++) {
      const n = 3 * i + j;
      const squareClass = winner && line.includes(n) ? "square win" : "square";
      rowSquares.push(
        <Square key={n} className={squareClass} value={squares[n]} onSquareClick={() => handleClick(n)} />
      );
    }
    board.push(<div key={i} className="board-row">{rowSquares}</div>);
  }

  /*
  + const board = [...Array(3)].map((_, i) => {
  +   let threeSquares = [...Array(3)].map((_, j) => {
  +     let n = 3 * i + j;
  +     return <Square key={n} value={squares[n]} onSquareClick={() => handleClick(n)} />
  +   });
  +   return <div key={i} className="board-row">{threeSquares}</div>
  + });
  */

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move ?
      'Go to move #' + move + ' (' + (move % 3) + ', ' + Math.floor(move / 3) + ')' :
      'Go to game start';
    if (move === currentMove) {
      return <li key={move}>
        <p>{"You are at move #" + move}</p>
      </li>
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const [isAscending, setIsAscending] = useState(true);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ToggleSwitchButton
          isAscending={isAscending}
          onToggle={() => setIsAscending(!isAscending)}
        />
        <ol>{isAscending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
        isDraw: false
      }
    }
  }
  if (squares.filter((e) => !e).length === 0) {
    return {
      isDraw: true,
      winner: null,
      line: []
    }
  }
  return null;
}

