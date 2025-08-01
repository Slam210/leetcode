
/**
 * 
 * We're given a 2D grid heightMap representing elevation heights. After it rains, water gets 
 * trapped in lower elevations surrounded by higher elevations. We must compute how much total 
 * water can be trapped. We can use a min-heap to process border cells by adding all border 
 * cells to a min-heap, sorted by height. Mark them as visited. While the heap is not empty we 
 * pop the cell with lowest height. For each of its 4 neighbors (up, down, left, right) if not 
 * visited and if the neighbor is lower, it can trap water water += max(0, height - neighborHeight). 
 * We then push the neighbor into the heap with max(height, neighborHeight) and mark it as visited. 
 * Return the total water trapped.
 * 
 */

import java.util.*;

public class TrappingRainWaterII {
    static class Cell {
        int row, col, height;

        Cell(int row, int col, int height) {
            this.row = row;
            this.col = col;
            this.height = height;
        }
    }

    static class Solution {
        public int trapRainWater(int[][] heightMap) {
            if (heightMap == null || heightMap.length == 0 || heightMap[0].length == 0)
                return 0;

            int m = heightMap.length, n = heightMap[0].length;
            boolean[][] visited = new boolean[m][n];
            PriorityQueue<Cell> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a.height));

            for (int i = 0; i < m; i++) {
                heap.offer(new Cell(i, 0, heightMap[i][0]));
                heap.offer(new Cell(i, n - 1, heightMap[i][n - 1]));
                visited[i][0] = visited[i][n - 1] = true;
            }

            for (int j = 1; j < n - 1; j++) {
                heap.offer(new Cell(0, j, heightMap[0][j]));
                heap.offer(new Cell(m - 1, j, heightMap[m - 1][j]));
                visited[0][j] = visited[m - 1][j] = true;
            }

            int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
            int water = 0;

            while (!heap.isEmpty()) {
                Cell cell = heap.poll();
                for (int[] d : dirs) {
                    int r = cell.row + d[0];
                    int c = cell.col + d[1];

                    if (r >= 0 && r < m && c >= 0 && c < n && !visited[r][c]) {
                        visited[r][c] = true;
                        int neighborHeight = heightMap[r][c];
                        water += Math.max(0, cell.height - neighborHeight);
                        heap.offer(new Cell(r, c, Math.max(cell.height, neighborHeight)));
                    }
                }
            }

            return water;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] heightMap = {
                { 1, 4, 3, 1, 3, 2 },
                { 3, 2, 1, 3, 2, 4 },
                { 2, 3, 3, 2, 3, 1 }
        };
        System.out.println("Water trapped: " + sol.trapRainWater(heightMap));
    }
}

/**
 * 
 * Time complexity is O(m * n * log(m * n))
 * Space complexity is O(m + n)
 * 
 */