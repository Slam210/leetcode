/**
 *
 * @lc app=leetcode id=803 lang=typescript
 *
 * [803] Bricks Falling When Hit
 */
 // @lc code=start

class Union {
  parent: number[];
  size: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
  }

  union(x: number, y: number): void {
    let rx = this.find(x);
    let ry = this.find(y);

    if (rx === ry) return;

    if (this.size[rx] < this.size[ry]) {
      [rx, ry] = [ry, rx];
    }

    this.parent[ry] = rx;
    this.size[rx] += this.size[ry];
  }

  componentSize(x: number): number {
    return this.size[this.find(x)];
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
}

function hitBricks(grid: number[][], hits: number[][]): number[] {
  const rows = grid.length;
  const cols = grid[0].length;
  const roof = rows * cols;

  const copy = grid.map(row => [...row]);

  // Remove all hits first
  for (const [r, c] of hits) {
    if (copy[r][c] === 1) {
      copy[r][c] = 0;
    }
  }

  const union = new Union(rows * cols + 1);

  const index = (r: number, c: number) => r * cols + c;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // Build initial unions
  for (let row = 0; row < rows; row++){
    for (let col = 0; col < cols; col++) {
      if (copy[row][col] === 0) {
        continue;
      }

      if (row === 0) {
        union.union(index(row, col), roof);
      }

      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && copy[nr][nc] === 1) {
          union.union(index(row,col),index(nr,nc))
        }
      }
    }
  }

  const result = new Array(hits.length);

  for (let i = hits.length - 1; i >= 0; i--) {
    const [row, col] = hits[i];

      if (grid[row][col] === 0) {
        result[i] = 0;
        continue;
      }

      const before = union.componentSize(roof);

      copy[row][col] = 1;

      if (row === 0) {
        union.union(index(row, col), roof);
      }

      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;

        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          copy[nr][nc] === 1
        ) {
          union.union(index(row, col), index(nr, nc));
        }
      }

      const after = union.componentSize(roof);

      result[i] = Math.max(0, after - before - 1);
    }

  return result;
}
 // @lc code=end
