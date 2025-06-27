/**
 * 
 * We are given n and tasked with returning whether or not it is a power of 3.
 * The mathmatical insight for this problem is to realize that if n is a power
 * 3,
 * it should divide into the largest possible power of 3 with no remainder.
 * 
 */

public class PowerofThree {
    public static class Solution {
        public boolean isPowerOfThree(int n) {
            return n > 0 && 1162261467 % n == 0;
        }

        public static void main(String[] args) {
            Solution solution = new Solution();

            int[] testCases = { 1, 3, 9, 27, 0, -3, 45, 1162261467 };
            for (int n : testCases) {
                System.out.printf("isPowerOfThree(%d) = %b%n", n, solution.isPowerOfThree(n));
            }
        }
    }

}

/**
 * 
 * Run time is O(1)
 * Space complexity is O(1)
 * 
 */