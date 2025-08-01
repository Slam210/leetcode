/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = [];
  const board = Array.from({ length: n }, () => ".".repeat(n));
  const cols = new Set();
  const posDiagonals = new Set();
  const negDiagonals = new Set();

  function backtrack(row) {
    if (row === n) {
      result.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (
        cols.has(col) ||
        posDiagonals.has(row + col) ||
        negDiagonals.has(row - col)
      ) {
        continue;
      }

      const rowStr = board[row].split("");
      rowStr[col] = "Q";
      board[row] = rowStr.join("");

      cols.add(col);
      posDiagonals.add(row + col);
      negDiagonals.add(row - col);

      backtrack(row + 1);

      rowStr[col] = ".";
      board[row] = rowStr.join("");
      cols.delete(col);
      posDiagonals.delete(row + col);
      negDiagonals.delete(row - col);
    }
  }

  backtrack(0);
  return result;
};

console.log(solveNQueens(4));
