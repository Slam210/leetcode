/**
 * 
 * We start at a random point on the graph. For each index we move
 * counterclockwise, with the first index moving north. We return whether or not
 * we cross the path we're already traveled. We know the shape of out movement
 * will behave similar to a sprail. As such, we only need to consider the
 * previous 6 moves when looking at potential crossings. As such, we only need
 * to compare line 4,5,6 in each case.
 * 
 */

public class SelfCrossing {

    static class Solution {
        public boolean isSelfCrossing(int[] d) {
            int n = d.length;
            for (int i = 3; i < n; i++) {
                // Case 1: current crosses 3 steps before
                if (d[i] >= d[i - 2] && d[i - 1] <= d[i - 3]) {
                    return true;
                }
                // Case 2: current meets 4 steps before
                if (i >= 4 && d[i - 1] == d[i - 3] && d[i] + d[i - 4] >= d[i - 2]) {
                    return true;
                }
                // Case 3: current crosses 5 steps before
                if (i >= 5 &&
                        d[i - 2] >= d[i - 4] &&
                        d[i] + d[i - 4] >= d[i - 2] &&
                        d[i - 1] <= d[i - 3] &&
                        d[i - 1] + d[i - 5] >= d[i - 3]) {
                    return true;
                }
            }
            return false;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] distance1 = { 2, 1, 1, 2 };
        int[] distance2 = { 1, 2, 3, 4 };
        int[] distance3 = { 1, 1, 2, 1, 1 };

        System.out.println("Test 1: " + sol.isSelfCrossing(distance1));
        System.out.println("Test 2: " + sol.isSelfCrossing(distance2));
        System.out.println("Test 3: " + sol.isSelfCrossing(distance3));
    }
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(1)
 * 
 */