/*
 * 
 * We can use an array of 26 to increment and decrement.
 * If any cell is not 0 then we return false.
 * 
 */

public class ValidAnagram {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.isAnagram("anagram", "nagaram"));
        System.out.println(solution.isAnagram("rat", "car"));
    }
}

class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length())
            return false;

        int[] count = new int[26];

        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int c : count) {
            if (c != 0)
                return false;
        }

        return true;
    }
}

/*
 * 
 * Time complexity is O(n)
 * Space complexty is O(1)
 * 
 */