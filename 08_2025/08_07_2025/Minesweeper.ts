/**
 *
 * The problem simulates a click in the Minesweeper game, where we're given a board of characters
 * representing unrevealed ('E', 'M') and revealed ('B', '1'-'8', 'X') squares, and a click position.
 * If a mine ('M') is clicked, it turns into 'X', ending the game. If an empty square ('E') is clicked,
 * the behavior depends on how many mines surround it: if at least one mine is adjacent, it becomes a
 * digit '1'–'8'; if none, it becomes 'B' and recursively reveals all adjacent unrevealed squares.
 * The intuition is to treat this like a flood fill problem (similar to painting adjacent regions),
 * where we reveal cells using DFS until we hit cells adjacent to mines or out of bounds, ensuring we
 * only reveal safe zones. This recursive behavior mimics the actual Minesweeper game logic.
 *
 */

function updateBoard(board: string[][], click: number[]): string[][] {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function countMines(board: string[][], r: number, c: number): number {
    let count = 0;
    for (const [dr, dc] of directions) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nr < board.length &&
        nc >= 0 &&
        nc < board[0].length &&
        board[nr][nc] === "M"
      ) {
        count++;
      }
    }
    return count;
  }

  function dfs(board: string[][], r: number, c: number) {
    if (
      r < 0 ||
      r >= board.length ||
      c < 0 ||
      c >= board[0].length ||
      board[r][c] !== "E"
    )
      return;

    const mines = countMines(board, r, c);

    if (mines > 0) {
      board[r][c] = mines.toString();
    } else {
      board[r][c] = "B";
      for (const [dr, dc] of directions) {
        dfs(board, r + dr, c + dc);
      }
    }
  }

  const [r, c] = click;

  if (board[r][c] === "M") {
    board[r][c] = "X";
  } else {
    dfs(board, r, c);
  }

  return board;
}

function main() {
  const board = [
    ["E", "E", "E", "E", "E"],
    ["E", "E", "M", "E", "E"],
    ["E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E"],
  ];

  const click = [3, 0];

  const result = updateBoard(board, click);
  console.log("Updated Board:");
  for (const row of result) {
    console.log(row.join(" "));
  }
}

main();

/**
 *
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 *
 */
