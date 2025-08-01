/**
 * 
 * Given a m x n matrix, return the length of the longest increasing path in the
 * matrix. This is a graph traversal problem disguised as a matrix problem.
 * Since values can decrease, a DFS search with memoization will work as a
 * regular search will cause recomputation.
 * 
 */

public class LongestIncreasingPathinaMatrix {
    public static class Solution {
        int[][] directions = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } };

        private int dfs(int[][] matrix, int[][] dp, int i, int j) {
            if (dp[i][j] != 0)
                return dp[i][j];

            int max = 1;
            for (int[] dir : directions) {
                int x = i + dir[0], y = j + dir[1];
                if (x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length
                        && matrix[x][y] > matrix[i][j]) {
                    int len = 1 + dfs(matrix, dp, x, y);
                    max = Math.max(max, len);
                }
            }
            dp[i][j] = max;
            return max;
        }

        public int longestIncreasingPath(int[][] matrix) {
            if (matrix == null || matrix.length == 0 || matrix[0].length == 0)
                return 0;

            int m = matrix.length, n = matrix[0].length;
            int[][] dp = new int[m][n];
            int maxPath = 0;

            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    maxPath = Math.max(maxPath, dfs(matrix, dp, i, j));
                }
            }
            return maxPath;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[][] matrix = {
                { 9, 9, 4 },
                { 6, 6, 8 },
                { 2, 1, 1 }
        };

        int result = sol.longestIncreasingPath(matrix);
        System.out.println("Longest Increasing Path Length: " + result);
    }
}

/**
 * 
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 * 
 */