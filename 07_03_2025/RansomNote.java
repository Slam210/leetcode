/**
 * 
 * You can only use each letter in magazine once. So to construct ransomNote,
 * each character in it must be available in magazine with equal or greater
 * frequency. Count the frequency of each character in magazine.
 * For each character in ransomNote, check if it's available in the magazine
 * frequency map. If yes, decrement the count. If no or the count is zero,
 * return false. If all characters in ransomNote are satisfied, return true.
 * 
 */

public class RansomNote {
    static class Solution {
        public boolean canConstruct(String ransomNote, String magazine) {
            int[] counts = new int[26];

            for (char c : magazine.toCharArray()) {
                counts[c - 'a']++;
            }

            for (char c : ransomNote.toCharArray()) {
                if (counts[c - 'a'] == 0) {
                    return false;
                }
                counts[c - 'a']--;
            }

            return true;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        String ransomNote = "aa";
        String magazine = "aab";
        System.out.println("Can construct? " + sol.canConstruct(ransomNote, magazine));
    }
}

/**
 * 
 * Time complexity is O(m + n)
 * Space complexity is O(1)
 * 
 */