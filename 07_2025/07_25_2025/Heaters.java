/**
 *
 * Houses and heaters are points on a horizontal line. Each heater has the same radius. The radius should be
 * minimized so all houses are covered by at least one heater. Return the minimum radius needed. For each house,
 * find the closest heater. The radius must be at least the maximum distance from any house to its closest heater.
 * So for each house, find the minimum distance to any heater. We then take the max of those distances → this is the
 * minimum radius required.
 *
 */

import java.util.Arrays;

public class Heaters {

  class Solution {

    public int findRadius(int[] houses, int[] heaters) {
      Arrays.sort(heaters);
      int radius = 0;

      for (int house : houses) {
        int pos = Arrays.binarySearch(heaters, house);
        if (pos < 0) {
          pos = -pos - 1;
        }

        int dist1 = pos - 1 >= 0 ? house - heaters[pos - 1] : Integer.MAX_VALUE;
        int dist2 = pos < heaters.length
          ? heaters[pos] - house
          : Integer.MAX_VALUE;

        int closestDist = Math.min(dist1, dist2);
        radius = Math.max(radius, closestDist);
      }

      return radius;
    }
  }

  public static void main(String[] args) {
    Heaters.Solution sol = new Heaters().new Solution();

    int[] houses1 = { 1, 2, 3 };
    int[] heaters1 = { 2 };
    System.out.println(sol.findRadius(houses1, heaters1));

    int[] houses2 = { 1, 2, 3, 4 };
    int[] heaters2 = { 1, 4 };
    System.out.println(sol.findRadius(houses2, heaters2));

    int[] houses3 = { 1, 5 };
    int[] heaters3 = { 2 };
    System.out.println(sol.findRadius(houses3, heaters3));
  }
}
/**
 *
 * Time complexity is O(N log(H)) where N is number of houses and H is number of heaters
 * Space complexity is O(1)
 *
 */
