/*
 * 
 * A number modulo 9 is the same as the sum of its digits modulo 9.
 * We add in a +1 since num % 9 returns 0 when it a number such as 9 or 18
 * 
 */

public class AddDigits {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.addDigits(38));
        System.out.println(solution.addDigits(0));
    }
}

class Solution {
    public int addDigits(int num) {
        return num == 0 ? 0 : 1 + (num - 1) % 9;
    }
}

/*
 * 
 * Run time is O(1)
 * Space time is O(1)
 * 
 */