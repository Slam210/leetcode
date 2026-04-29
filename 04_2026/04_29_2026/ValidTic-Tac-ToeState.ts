/**
 *
 * We are given a 3x3 Tic-Tac-Board represented as an array of strings.
 * Each cell is either 'X', the first player, 'O', the second player, or ' ', which
 * is an empty space. Our task is to return true if the board could have occurred
 * during a valud game, otherwise false. The trick to this problem is that the problem
 * is asking whether or not the game state is possible, and not to simulate the steps.
 * Therefore, we only need to verify a set constraint of rules that can determine if
 * every board is possible or not.
 *
 */

function validTicTacToe(board: string[]): boolean {
  let countX = 0;
  let countO = 0;

  // First step is to count the total moves each player has made
  for (let row of board) {
    for (let cell of row) {
      if (cell === "X") countX++;
      if (cell === "O") countO++;
    }
  }

  // Next step is to validate turn order of both players
  if (countO > countX || countX > countO + 1) {
    return false;
  }

  // Check win states
  const xWins = hasWon(board, "X");
  const oWins = hasWon(board, "O");

  // Now that we have win states, we can verify they are within bounds
  if (xWins && oWins) return false;
  if (xWins && countX !== countO + 1) return false;
  if (oWins && countO !== countX) return false;

  return true;
}

function hasWon(board: string[], player: string): boolean {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    )
      return true;
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    )
      return true;
  }

  // Check both diagonals
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  )
    return true;

  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  )
    return true;

  return false;
}

const board: string[] = ["O  ", "   ", "   "];
console.log(validTicTacToe(board));

/**
 *
 * Time complexity for this is O(1) as the board is a constant size
 * Space complexity for this is O(1) as no extra data structures are used.
 *
 */
