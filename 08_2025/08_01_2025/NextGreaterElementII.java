/**
 *
 * We're given a circular integer array nums. For each element x, we must find the next greater
 * number when traversing forward in the array. If there's no such number, return -1 for that
 * element. This is like the classic Next Greater Element problem, but the circularity means we
 * may have to wrap around to the beginning. We can use a monotonic stack to track indices whose
 * next greater hasn't been found yet. We traverse the array twice. While looping, pop from stack
 * if current number is greater than the number at stack top. Only push indices from the first pass
 * to avoid duplicates.
 *
 */

import java.util.Arrays;
import java.util.Stack;

public class NextGreaterElementII {

  static class Solution {

    public int[] nextGreaterElements(int[] nums) {
      int n = nums.length;
      int[] result = new int[n];
      Arrays.fill(result, -1);

      Stack<Integer> stack = new Stack<>();

      for (int i = 2 * n - 1; i >= 0; i--) {
        int index = i % n;
        while (!stack.isEmpty() && nums[stack.peek()] <= nums[index]) {
          stack.pop();
        }
        if (i < n) {
          result[index] = stack.isEmpty() ? -1 : nums[stack.peek()];
        }
        stack.push(index);
      }

      return result;
    }

    public static void main(String[] args) {
      Solution solution = new Solution();

      int[] nums1 = { 1, 2, 1 };
      int[] result1 = solution.nextGreaterElements(nums1);
      System.out.println("Input: " + Arrays.toString(nums1));
      System.out.println("Next Greater: " + Arrays.toString(result1));

      int[] nums2 = { 5, 4, 3, 2, 1 };
      int[] result2 = solution.nextGreaterElements(nums2);
      System.out.println("Input: " + Arrays.toString(nums2));
      System.out.println("Next Greater: " + Arrays.toString(result2));
    }
  }
}
/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
