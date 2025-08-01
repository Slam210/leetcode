/**
 *
 * We're given an array matchsticks[], where each value is a stick's length. We must use all matchsticks
 * exactly once and form exactly 4 sides of equal length. We cannot break matchsticks or omit any
 * matchstick. Return true if it’s possible to form a square, false otherwise.To make a square the total
 * length of all sticks must be divisible by 4 and each side of the square must be exactly side = total / 4.
 * This is a classic partitioning problem as we ask can we partition the matchsticks into 4 groups, each summing to side?
 *
 */

import java.util.Arrays;

public class MatchstickstoSquare {

  class Solution {

    public boolean makesquare(int[] matchsticks) {
      if (matchsticks.length < 4) return false;

      int total = 0;
      for (int m : matchsticks) total += m;
      if (total % 4 != 0) return false;
      int target = total / 4;

      Arrays.sort(matchsticks);
      reverse(matchsticks);

      int[] sides = new int[4];
      return backtrack(0, matchsticks, sides, target);
    }

    private boolean backtrack(
      int index,
      int[] matchsticks,
      int[] sides,
      int target
    ) {
      if (index == matchsticks.length) {
        return (
          sides[0] == target &&
          sides[1] == target &&
          sides[2] == target &&
          sides[3] == target
        );
      }

      int current = matchsticks[index];
      for (int i = 0; i < 4; i++) {
        if (sides[i] + current > target) continue;

        sides[i] += current;
        if (backtrack(index + 1, matchsticks, sides, target)) return true;
        sides[i] -= current;

        if (sides[i] == 0) break;
      }

      return false;
    }

    private void reverse(int[] arr) {
      for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }

  public static void main(String[] args) {
    MatchstickstoSquare.Solution sol = new MatchstickstoSquare().new Solution();

    int[] case1 = { 1, 1, 2, 2, 2 };
    int[] case2 = { 3, 3, 3, 3, 4 };

    System.out.println("Can form square (case1)? " + sol.makesquare(case1));
    System.out.println("Can form square (case2)? " + sol.makesquare(case2));
  }
}
/**
 *
 * Time complexity is O(4^n)
 * Space complexity is O(n) for recusion stack
 *
 */
