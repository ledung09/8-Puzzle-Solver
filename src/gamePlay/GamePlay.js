function isMoveValid(board, move) {
  // Check if the move is valid (not moving the empty tile out of bounds)
  const emptyIndex = board.indexOf(0); // Find the empty tile
  const row = Math.floor(emptyIndex / 3);
  const col = emptyIndex % 3;

  switch (move) {
    case 'up':
      return row > 0;
    case 'down':
      return row < 2;
    case 'left':
      return col > 0;
    case 'right':
      return col < 2;
    default:
      return false;
  }
}

function makeRandomMove(board) {
  const moves = ['up', 'down', 'left', 'right'];
  const validMoves = moves.filter(move => isMoveValid(board, move));
  if (validMoves.length === 0) {
    return board; // No valid moves
  }
  const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];

  // Apply the random move to the board
  const emptyIndex = board.indexOf(0);
  const targetIndex = emptyIndex + (randomMove === 'up' ? -3 : randomMove === 'down' ? 3 : randomMove === 'left' ? -1 : 1);
  board[emptyIndex] = board[targetIndex];
  board[targetIndex] = 0;

  return board;
}

function generateRandomBoardWithMoves(n) {
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  for (let i = 0; i < n; i++) {
    board = makeRandomMove(board);
  }

  return board;
}


export function randomBoard() {
  const n = Math.floor(Math.random() * 21) + 20; // Random number between 10 and 20
  return generateRandomBoardWithMoves(n);
}

export function validMove(board, idx) {
  var newBoard = board;
  var ans = [];
  if (board[0] === 0) {
    if (idx === 1 || idx === 3) [newBoard[0], newBoard[idx]] = [newBoard[idx], newBoard[0]];
    if (idx === 1) ans = [-1,0]
    if (idx === 3) ans = [0,-1]
  }

  if (board[1] === 0) {
    if (idx === 0 || idx === 2 || idx === 4) [newBoard[1], newBoard[idx]] = [newBoard[idx], newBoard[1]];
    if (idx === 0) ans = [1,0]
    if (idx === 2) ans = [-1,0]
    if (idx === 4) ans = [0,-1]
  }

  if (board[2] === 0) {
    if (idx === 1 || idx === 5) [newBoard[2], newBoard[idx]] = [newBoard[idx], newBoard[2]];
    if (idx === 1) ans = [1,0]
    if (idx === 5) ans = [0,-1]
  }

  if (board[3] === 0) {
    if (idx === 0 || idx === 4 || idx === 6) [newBoard[3], newBoard[idx]] = [newBoard[idx], newBoard[3]];
    if (idx === 0) ans = [0,1]
    if (idx === 4) ans = [-1,0]
    if (idx === 6) ans = [0,-1]
  }

  if (board[4] === 0) {
    if (idx === 1 || idx === 3 || idx === 5 || idx === 7) [newBoard[4], newBoard[idx]] = [newBoard[idx], newBoard[4]];
    if (idx === 1) ans = [0,1]
    if (idx === 3) ans = [1,0]
    if (idx === 5) ans = [-1,0]
    if (idx === 7) ans = [0,-1]
  }

  if (board[5] === 0) {
    if (idx === 2 || idx === 4 || idx === 8) [newBoard[5], newBoard[idx]] = [newBoard[idx], newBoard[5]];
    if (idx === 2) ans = [0,1]
    if (idx === 4) ans = [1,0]
    if (idx === 8) ans = [0,-1]
  }

  if (board[6] === 0) {
    if (idx === 3 || idx === 7) [newBoard[6], newBoard[idx]] = [newBoard[idx], newBoard[6]];
    if (idx === 3) ans = [0,1]
    if (idx === 7) ans = [-1,0]
  }
  if (board[7] === 0) {
    if (idx === 4 || idx === 6 || idx === 8) [newBoard[7], newBoard[idx]] = [newBoard[idx], newBoard[7]];
    if (idx === 4) ans = [0,1]
    if (idx === 6) ans = [1,0]
    if (idx === 8) ans = [-1,0]
  }
  if (board[8] === 0) {
    if (idx === 5 || idx === 7) [newBoard[8], newBoard[idx]] = [newBoard[idx], newBoard[8]];
    if (idx === 5) ans = [0,1]
    if (idx === 7) ans = [1,0]
  }
  
  return [ans, newBoard];
}


