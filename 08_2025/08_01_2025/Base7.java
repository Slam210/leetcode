public class Base7 {

  static class Solution {

    public String convertToBase7(int num) {
      if (num == 0) return "0";

      boolean isNegative = num < 0;
      num = Math.abs(num);

      StringBuilder sb = new StringBuilder();

      while (num > 0) {
        sb.append(num % 7);
        num /= 7;
      }

      if (isNegative) {
        sb.append('-');
      }

      return sb.reverse().toString();
    }
  }

  public static void main(String[] args) {
    Solution solution = new Solution();

    int[] testCases = { 100, -7, 0, 343, -49, 1 };
    for (int num : testCases) {
      String result = solution.convertToBase7(num);
      System.out.printf("Base 7 of %d is: %s%n", num, result);
    }
  }
}
