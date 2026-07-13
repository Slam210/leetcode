/*
 * @lc app=leetcode id=807 lang=typescript
 *
 * [807] Max Increase to Keep City Skyline
 */
// @lc code=start
function maxIncreaseKeepingSkyline(grid: number[][]): number {
    const n = grid.length;

    const rowMax = new Array(n).fill(0);
    const colMax = new Array(n).fill(0);

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            rowMax[row] = Math.max(rowMax[row], grid[row][col]);
            colMax[col] = Math.max(colMax[col], grid[row][col]);
        }
    }

    let totalIncrease = 0;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const allowedHeight = Math.min(rowMax[row], colMax[col]);
            totalIncrease += allowedHeight - grid[row][col];
        }
    }

    return totalIncrease;
};
// @lc code=end
