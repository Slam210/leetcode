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
