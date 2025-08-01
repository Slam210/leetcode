
/**
 * 
 * We want to find the longest subsequence such that suq * k is a subsequence of s.
 * If multiple instances exist, we return the lexicographically largest one.
 * We know that we can't try all possible subsequences of s, as it's way too
 * exponential, so we build candidates from frequent characters only. We can use
 * a dfs search as it will allow us to build short strings first using the characters in
 * lexicographically decreasing order. 
 * 
 */

import java.util.*;

public class LongestSubsequenceRepeatedkTimes {
    class Solution {

        private boolean isKRepeatedSubsequence(String s, String candidate, int k) {
            int j = 0, count = 0;
            for (char c : s.toCharArray()) {
                if (c == candidate.charAt(j)) {
                    j++;
                    if (j == candidate.length()) {
                        j = 0;
                        count++;
                        if (count == k)
                            return true;
                    }
                }
            }
            return false;
        }

        public String longestSubsequenceRepeatedK(String s, int k) {
            int[] freq = new int[26];
            for (char c : s.toCharArray()) {
                freq[c - 'a']++;
            }

            List<Character> validChars = new ArrayList<>();
            for (int i = 25; i >= 0; i--) {
                if (freq[i] >= k) {
                    validChars.add((char) (i + 'a'));
                }
            }

            Queue<String> queue = new LinkedList<>();
            queue.offer("");

            String answer = "";

            while (!queue.isEmpty()) {
                String current = queue.poll();

                for (char c : validChars) {
                    String next = current + c;

                    if (isKRepeatedSubsequence(s, next, k)) {
                        queue.offer(next);
                        if (next.length() > answer.length() ||
                                (next.length() == answer.length() && next.compareTo(answer) > 0)) {
                            answer = next;
                        }
                    }
                }
            }

            return answer;
        }
    }
}

/**
 * 
 * The solution uses a Breadth-First Search (BFS) strategy to
 * efficiently find the longest subsequence seq such that seq * k is a
 * subsequence of the input string s. It starts by filtering characters that
 * appear at least k times, since any valid subsequence must consist of such
 * characters. Beginning with the empty string, the algorithm builds candidate
 * sequences by appending characters in lexicographically decreasing order (to
 * prioritize larger results) and checks each with a helper function that
 * determines whether repeating the candidate k times forms a subsequence of s.
 * This function scans s linearly, counting how many times the candidate pattern
 * can be matched in order. By using BFS, the algorithm explores shorter
 * subsequences first and only retains the longest and lexicographically largest
 * valid result, significantly reducing the search space and avoiding the
 * exponential time complexity of checking all possible subsequences.
 * 
 * Run time is O((m^l) * n) where m is number of valid charcters, n is length of
 * string, and l is max length of candidate sequences to consider
 * 
 * Space time is O((m^l) * l)
 * 
 */