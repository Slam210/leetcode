/**
 *
 * We want to draw a vertical line through the brick wall from top to bottom that crosses the
 * fewest bricks possible. Crossing a brick means the line goes through the interior of a brick,
 * but not through the edge between bricks. Because the total width of each row is the same, we
 * can focus on the positions where brick edges occur. If we find the vertical line at a position
 * that aligns with the most common edge, the line will cross fewer bricks because it will cross
 * bricks only in rows that don't have an edge at that position.
 *
 */

function leastBricks(wall: number[][]): number {
  const edgeCount = new Map<number, number>();

  for (const row of wall) {
    let prefixSum = 0;
    for (let i = 0; i < row.length - 1; i++) {
      prefixSum += row[i];
      edgeCount.set(prefixSum, (edgeCount.get(prefixSum) ?? 0) + 1);
    }
  }

  let maxEdges = 0;
  for (const count of edgeCount.values()) {
    if (count > maxEdges) maxEdges = count;
  }

  return wall.length - maxEdges;
}

/**
 *
 * Time complexity is O(n * m)
 * Space complexity is O(n * m)
 *
 */
