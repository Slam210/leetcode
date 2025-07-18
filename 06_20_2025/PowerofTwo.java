/*
 * 
 * The intuition behind this problem is in the fact that there is exactly
 * 1 one in the bit formation of n if it is a power of 2. 
 * Thus, if we and it with n-1, then we should exactly 0. If the result is
 * not 0, then n is not a power of 2.
 * 
 */
public class PowerOfTwo {

    public static class Solution {
        public boolean isPowerOfTwo(int n) {
            if (n <= 0)
                return false;
            return (n & (n - 1)) == 0;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isPowerOfTwo(1));
        System.out.println(sol.isPowerOfTwo(2));
        System.out.println(sol.isPowerOfTwo(16));
        System.out.println(sol.isPowerOfTwo(18));
        System.out.println(sol.isPowerOfTwo(0));
        System.out.println(sol.isPowerOfTwo(-8));
    }
}

/*
 * 
 * Time complexity is O(1)
 * Space complexity is O(1)
 * 
 */