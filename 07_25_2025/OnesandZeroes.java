/**
 *
 * Given an array of binary strings strs and integers m and n, find the size of the largest subset of strs
 * where the total count of zeros is at most m and ones at most n. This problem is a variation of the 0/1
 * Knapsack problem, but with two constraints: count of zeros and count of ones. We want to pick strings to
 * maximize the subset size without exceeding m zeros and n ones. Each string has a "cost" in zeros and ones,
 * and "value" 1.
 *
 */

public class OnesandZeroes {

  class Solution {

    public int findMaxForm(String[] strs, int m, int n) {
      int[][] dp = new int[m + 1][n + 1];

      for (String s : strs) {
        int[] counts = countZerosOnes(s);
        int zeros = counts[0];
        int ones = counts[1];

        for (int i = m; i >= zeros; i--) {
          for (int j = n; j >= ones; j--) {
            dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
          }
        }
      }

      return dp[m][n];
    }

    private int[] countZerosOnes(String s) {
      int zeros = 0, ones = 0;
      for (char c : s.toCharArray()) {
        if (c == '0') zeros++;
        else ones++;
      }
      return new int[] { zeros, ones };
    }
  }

  public static void main(String[] args) {
    OnesandZeroes.Solution sol = new OnesandZeroes().new Solution();

    String[] strs1 = { "10", "0001", "111001", "1", "0" };
    int m1 = 5, n1 = 3;
    System.out.println(sol.findMaxForm(strs1, m1, n1));

    String[] strs2 = { "10", "0", "1" };
    int m2 = 1, n2 = 1;
    System.out.println(sol.findMaxForm(strs2, m2, n2));
  }
}
/**
 *
 * Time complexity is O(len(strs) * m * n)
 * Space complexity is O(m * n)
 *
 */
