
/**
 * 
 * We are given a list of n unique 2D points. A boomerang is a tuple of points (i, j, k) where i, 
 * j, and k are distinct points, the distance from i to j equals the distance from i to k, and 
 * order matters. The goal is to count the total number of such boomerang tuples across all 
 * points. For each point i we count how many other points are at the same distance from i. For 
 * each point i, build a map from distance → count of points at that distance. For each distance 
 * with count ≥ 2, compute count * (count - 1) and add to the result.
 * 
 */

import java.util.*;

public class NumberofBoomerangs {

    class Solution {
        public int numberOfBoomerangs(int[][] points) {
            int result = 0;
            for (int i = 0; i < points.length; i++) {
                Map<Integer, Integer> distMap = new HashMap<>();
                for (int j = 0; j < points.length; j++) {
                    if (i == j)
                        continue;
                    int dx = points[i][0] - points[j][0];
                    int dy = points[i][1] - points[j][1];
                    int dist = dx * dx + dy * dy;
                    distMap.put(dist, distMap.getOrDefault(dist, 0) + 1);
                }
                for (int count : distMap.values()) {
                    result += count * (count - 1);
                }
            }
            return result;
        }
    }

    public static void main(String[] args) {
        NumberofBoomerangs outer = new NumberofBoomerangs();
        Solution solution = outer.new Solution();

        int[][] points1 = { { 0, 0 }, { 1, 0 }, { 2, 0 } };
        int[][] points2 = { { 1, 1 }, { 2, 2 }, { 3, 3 } };
        int[][] points3 = { { 1, 1 } };

        System.out.println("Output 1: " + solution.numberOfBoomerangs(points1));
        System.out.println("Output 2: " + solution.numberOfBoomerangs(points2));
        System.out.println("Output 3: " + solution.numberOfBoomerangs(points3));
    }
}

/**
 * 
 * Run time is O(n^2)
 * Space time is O(n)
 * 
 */