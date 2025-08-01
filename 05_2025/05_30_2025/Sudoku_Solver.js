/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const isValid = (board, row, col, char) => {
    for (let i = 0; i < 9; i++) {
      // Check row
      if (board[row][i] === char) return false;
      // Check column
      if (board[i][col] === char) return false;
      // Check 3x3 box
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === char) return false;
    }
    return true;
  };

  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === ".") {
          for (
            let char = "1";
            char <= "9";
            char = String.fromCharCode(char.charCodeAt(0) + 1)
          ) {
            if (isValid(board, row, col, char)) {
              board[row][col] = char;

              if (solve()) return true;
              board[row][col] = "."; // backtrack
            }
          }
          return false; // no valid number found
        }
      }
    }
    return true; // board is complete
  };

  solve();
};

solveSudoku([
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
]);
