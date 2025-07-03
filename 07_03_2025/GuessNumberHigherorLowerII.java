/**
 * 
 * We are given a number from 1 to n. If we guess wrong, we are told whether the
 * number is higher or lower. Additionally, an incorrect guess costs $guess. We
 * are tasked with find the lowest amount of money needed to gaurentee the
 * guess, regardless of the number picked. The intuition behind this problem is
 * to realize that it's a minimax problem. We find the maximum cost and try to
 * minimize the value with the amount we currentlt have.
 * 
 */

public class GuessNumberHigherorLowerII {
    public static class Solution {
        public int getMoneyAmount(int n) {
            int[][] dp = new int[n + 2][n + 2];

            for (int len = 2; len <= n; len++) {
                for (int start = 1; start <= n - len + 1; start++) {
                    int end = start + len - 1;
                    dp[start][end] = Integer.MAX_VALUE;

                    for (int x = start; x <= end; x++) {
                        int left = (x - 1 >= start) ? dp[start][x - 1] : 0;
                        int right = (x + 1 <= end) ? dp[x + 1][end] : 0;
                        int cost = x + Math.max(left, right);
                        dp[start][end] = Math.min(dp[start][end], cost);
                        System.out.println(dp[start][end]);
                    }
                }
            }

            return dp[1][n];
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int n = 10;
        System.out.println("Minimum cost to guarantee a win: $" + sol.getMoneyAmount(n));
    }
}

/**
 * 
 * Time complexity is O(n^3)
 * Space complexity is O(n^2)
 * 
 */