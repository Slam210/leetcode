/**
 * 
 * We have a rand7() function that returns a uniform random integer from 1 to 7.
 * We must implement rand10() that returns a uniform random integer from 1 to 10
 * using only rand7(). We cannot use any built-in random function. We want to
 * use the randomness of rand7() to simulate the randomness of rand10(). Since 7
 * < 10, we need to combine multiple calls to rand7() to expand the range. Two
 * calls to rand7() gives us a 7×7 grid = 49 possible outcomes. If we map
 * numbers from 1 to 49, and just take the first 40 of them, we can map 1->40 to
 * 1-> 10 and the rest as a reject and retry.
 * 
 */

public class ImplementRand10UsingRand7 {
    /**
     * The rand7() API is already defined in the parent class SolBase.
     * public int rand7();
     * 
     * @return a random integer in the range 1 to 7
     */
    static class Solution extends SolBase {
        public int rand10() {
            while (true) {
                int row = rand7();
                int col = rand7();
                int idx = (row - 1) * 7 + col;
                if (idx <= 40) {
                    return 1 + (idx - 1) % 10;
                }
            }
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] counts = new int[11];

        for (int i = 0; i < 1_000_000; i++) {
            int val = sol.rand10();
            counts[val]++;
        }

        for (int i = 1; i <= 10; i++) {
            System.out.println("Value " + i + " occurred " + counts[i] + " times.");
        }
    }
}

/**
 * 
 * Time complexity is O(1)
 * Space complexity is O(1)
 * 
 */