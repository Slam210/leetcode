/**
 * 
 * Given an array of integers, return true if we can find a sequence of three
 * increasing subsequences. The idea behind this is that rather than checking
 * every triplet we can check for the current sequence in the triplet.
 * 
 */

public class IncreasingTripletSubsequence {
    public static class Solution {
        public boolean increasingTriplet(int[] nums) {
            int first = Integer.MAX_VALUE;
            int second = Integer.MAX_VALUE;

            for (int num : nums) {
                if (num <= first) {
                    first = num;
                } else if (num <= second) {
                    second = num;
                } else {
                    return true;
                }
            }
            return false;
        }

    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[][] testCases = {
                { 1, 2, 3, 4, 5 },
                { 5, 4, 3, 2, 1 },
                { 2, 1, 5, 0, 4, 6 },
                { 20, 100, 10, 12, 5, 13 },
                { 1, 1, 1, 1, 1 },
                { 2, 4, -2, -3 }
        };

        for (int[] testCase : testCases) {
            System.out.printf("Input: %s -> %b%n", java.util.Arrays.toString(testCase),
                    solution.increasingTriplet(testCase));
        }
    }

}

/**
 * 
 * Run time is O(n)
 * Space complexity is O(1)
 * 
 */