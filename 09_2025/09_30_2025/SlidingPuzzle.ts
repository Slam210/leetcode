/**
 *
 * We need to find the minimum moves to solve a sliding puzzle by exploring all possible board
 * configurations. By treating each board state as a node and using BFS, we can explore states
 * level by level. Each move swaps the empty tile 0 with an adjacent tile, generating new states.
 * Keeping track of visited states ensures we do not revisit configurations, allowing us to find
 * the shortest solution efficiently or determine if it’s impossible.
 *
 */

export default function slidingPuzzle(board: number[][]): number {
  // Flatten the board to a string for easier comparison and storage in visited set
  const start = board.flat().join("");
  // Define the solved state
  const target = "123450";

  // Precomputed mapping of adjacent indices for each position of 0 in the flattened board
  const neighbors = [
    [1, 3], // index 0
    [0, 2, 4], // index 1
    [1, 5], // index 2
    [0, 4], // index 3
    [1, 3, 5], // index 4
    [2, 4], // index 5
  ];

  // BFS queue stores [board state, number of moves to reach it]
  const queue: [string, number][] = [[start, 0]];
  // Track visited states to avoid revisiting and cycles
  const visited = new Set<string>();
  visited.add(start);

  // BFS loop explore states level by level to guarantee minimum moves
  while (queue.length) {
    const [curr, moves] = queue.shift()!;
    // Check if current state is solved
    if (curr === target) return moves;

    // Find index of 0 to determine possible swaps
    const zeroIndex = curr.indexOf("0");
    for (const nextIndex of neighbors[zeroIndex]) {
      // Swap 0 with neighbor to generate new state
      const newStateArr = curr.split("");
      [newStateArr[zeroIndex], newStateArr[nextIndex]] = [
        newStateArr[nextIndex],
        newStateArr[zeroIndex],
      ];
      const newState = newStateArr.join("");
      // Only enqueue new states we haven't visited
      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push([newState, moves + 1]);
      }
    }
  }

  // If BFS finishes without finding solved state, puzzle is unsolvable
  return -1;
}

function main() {
  const board1 = [
    [1, 2, 3],
    [4, 0, 5],
  ];
  const board2 = [
    [1, 2, 3],
    [5, 4, 0],
  ];
  const board3 = [
    [4, 1, 2],
    [5, 0, 3],
  ];
  console.log(slidingPuzzle(board1));
  console.log(slidingPuzzle(board2));
  console.log(slidingPuzzle(board3));
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */
