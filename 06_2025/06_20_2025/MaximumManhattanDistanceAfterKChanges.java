/*
 * 
 * The intuition behind the final code is based on tracking the net effect 
 * of the given directional moves and strategically using up to k changes to
 *  aximize the final distance from the origin. Each move in the string modifies 
 * the x or y coordinate depending on the direction ('N', 'S', 'E', or 'W'). 
 * After processing the entire string, the Manhattan distance from the origin is 
 * calculated as |x| + |y|. Since changing a single move can increase the overall 
 * distance by up to 2 units, we can gain a maximum of 2 * k additional distance 
 * through optimal changes. However, we cannot change more moves than the 
 * total number of steps, so the potential gain is capped at min(2 * k, s.length()). 
 * Therefore, the maximum possible Manhattan distance after up to k optimal changes 
 * is the original distance plus this potential gain.
 * 
 */

public class MaximumManhattanDistanceAfterKChanges {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.maxDistance("NESW", 2));
        System.out.println(solution.maxDistance("NENWWS", 1));
    }
}

class Solution {
    public int maxDistance(String s, int k) {
        int ans = 0;
        int north = 0, south = 0, east = 0, west = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c == 'N')
                north++;
            else if (c == 'S')
                south++;
            else if (c == 'E')
                east++;
            else if (c == 'W')
                west++;

            int vertical = Math.abs(north - south);
            int horizontal = Math.abs(east - west);
            int currentDistance = vertical + horizontal;

            int stepsSoFar = i + 1;
            int fixableSteps = stepsSoFar - currentDistance;

            int boost = Math.min(2 * k, fixableSteps);

            int totalDistance = currentDistance + boost;
            ans = Math.max(ans, totalDistance);
        }

        return ans;
    }
}

/*
 * 
 * Run time is O(n)
 * Space time is O(1)
 * 
 */