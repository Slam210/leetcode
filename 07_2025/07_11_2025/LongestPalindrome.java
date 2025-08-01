import java.util.*;

public class LongestPalindrome {
    static class Solution {
        public int longestPalindrome(String s) {
            Map<Character, Integer> freq = new HashMap<>();
            for (char c : s.toCharArray()) {
                freq.put(c, freq.getOrDefault(c, 0) + 1);
            }

            int length = 0;
            boolean hasOdd = false;

            for (int count : freq.values()) {
                length += (count / 2) * 2;
                if (count % 2 == 1) {
                    hasOdd = true;
                }
            }

            if (hasOdd) {
                length += 1;
            }

            return length;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        String s1 = "abccccdd";
        System.out.println("Longest palindrome length (abccccdd): " + sol.longestPalindrome(s1)); 

        String s2 = "Aa";
        System.out.println("Longest palindrome length (Aa): " + sol.longestPalindrome(s2));
    }
}
