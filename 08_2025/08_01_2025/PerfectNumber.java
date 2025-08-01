public class PerfectNumber {

  static class Solution {

    public boolean checkPerfectNumber(int num) {
      if (num <= 1) return false;

      int sum = 1;
      int sqrt = (int) Math.sqrt(num);

      for (int i = 2; i <= sqrt; i++) {
        if (num % i == 0) {
          sum += i;
          int pairedDivisor = num / i;
          if (pairedDivisor != i) {
            sum += pairedDivisor;
          }
        }
      }

      return sum == num;
    }
  }

  public static void main(String[] args) {
    Solution solution = new Solution();

    int[] testNumbers = { 28, 6, 496, 12, 1, 2 };
    for (int num : testNumbers) {
      boolean result = solution.checkPerfectNumber(num);
      System.out.printf("Is %d a perfect number? %b%n", num, result);
    }
  }
}
