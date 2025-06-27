
/**
 * 
 * We are given a 0 indexed array of unique strings. We are to find all pairs
 * of palindromes using the indexes with run within O(sum of words[i].length).
 * The intuition for this problem is that instead of checking all possible pairs,
 * we use a hash map and string manipulation techniques.
 * 
 */

import java.util.*;

public class PalindromePairs {
    static class Solution {
        public List<List<Integer>> palindromePairs(String[] words) {
            Map<String, Integer> map = new HashMap<>();
            List<List<Integer>> result = new ArrayList<>();

            for (int i = 0; i < words.length; i++) {
                map.put(words[i], i);
            }

            for (int i = 0; i < words.length; i++) {
                String word = words[i];
                int len = word.length();

                for (int j = 0; j <= len; j++) {
                    String prefix = word.substring(0, j);
                    String suffix = word.substring(j);

                    // Case 1: prefix is palindrome, reversed suffix exists
                    if (isPalindrome(prefix)) {
                        String reversedSuffix = new StringBuilder(suffix).reverse().toString();
                        if (map.containsKey(reversedSuffix) && map.get(reversedSuffix) != i) {
                            result.add(Arrays.asList(map.get(reversedSuffix), i));
                        }
                    }

                    // Case 2: suffix is palindrome, reversed prefix exists
                    // j != len avoids duplicate when prefix == ""
                    if (j != len && isPalindrome(suffix)) {
                        String reversedPrefix = new StringBuilder(prefix).reverse().toString();
                        if (map.containsKey(reversedPrefix) && map.get(reversedPrefix) != i) {
                            result.add(Arrays.asList(i, map.get(reversedPrefix)));
                        }
                    }
                }
            }

            return result;
        }

        private boolean isPalindrome(String s) {
            int l = 0, r = s.length() - 1;
            while (l < r) {
                if (s.charAt(l++) != s.charAt(r--))
                    return false;
            }
            return true;
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String[] words = { "abcd", "dcba", "lls", "s", "sssll" };
        List<List<Integer>> res = solution.palindromePairs(words);
        for (List<Integer> pair : res) {
            System.out.println(pair);
        }
    }
}

/**
 * 
 * The solution works be considering all possible ways to split it into prefix
 * and suffix. Store all words and their indices in a Map<String, Integer>.
 * For each word w, split it into all prefix/suffix combinations.
 * If prefix is palindrome and reversed(suffix) exists in map, we add pair.
 * If suffix is palindrome and reversed(prefix) exists in map, we add pair.
 * Addionally, we have to be careful not to add (i, i).
 * 
 * Run time is O(n * k^2) where k is each palindrome check
 * Space time is O(nk) for the hash map adn result storage
 * 
 */