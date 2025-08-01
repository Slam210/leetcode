/**
 *
 * We are given a list of unique words and need to find all words that can be formed by concatenating at
 * least two other words from the same list. These are called concatenated words. The key insight is to
 * treat this like a word break problem, where for each word we check if it can be split into smaller
 * valid words using a dynamic programming (DP) approach. To avoid matching a word with itself, we
 * temporarily remove the word from the dictionary while checking it. We use a DP array to represent
 * whether a prefix of the word can be formed using other words in the set. If the entire word can be
 * formed from other words in the set, it's added to the result.
 *
 */

import java.util.*;

public class ConcatenatedWords {

  class Solution {

    public List<String> findAllConcatenatedWordsInADict(String[] words) {
      // Result list to hold all concatenated words
      List<String> result = new ArrayList<>();

      // Create a HashSet from the words array for fast lookup
      Set<String> dict = new HashSet<>(Arrays.asList(words));

      // Iterate over each word in the input
      for (String word : words) {
        // Temporarily remove the current word from the set to avoid matching with itself
        dict.remove(word);

        // Check if the current word can be formed using other words in the set
        if (canForm(word, dict)) {
          result.add(word);
        }

        // Add the word back to the set for future checks
        dict.add(word);
      }

      return result;
    }

    private boolean canForm(String word, Set<String> dict) {
      // if the dictionary is empty, we can't form anything
      if (dict.isEmpty()) return false;

      // dp[i] means whether word[0:i] can be segmented into valid words from the dict
      boolean[] dp = new boolean[word.length() + 1];
      dp[0] = true; // Empty prefix is always valid

      // Check all substrings of the word
      for (int i = 1; i <= word.length(); i++) {
        for (int j = 0; j < i; j++) {
          // If word[0:j] is valid and word[j:i] is in the dictionary
          if (dp[j] && dict.contains(word.substring(j, i))) {
            dp[i] = true;
            break;
          }
        }
      }

      // If the entire word can be formed, return true
      return dp[word.length()];
    }
  }

  public static void main(String[] args) {
    ConcatenatedWords.Solution sol = new ConcatenatedWords().new Solution();

    String[] input1 = {
      "cat",
      "cats",
      "catsdogcats",
      "dog",
      "dogcatsdog",
      "hippopotamuses",
      "rat",
      "ratcatdogcat",
    };
    System.out.println(sol.findAllConcatenatedWordsInADict(input1));

    String[] input2 = { "cat", "dog", "catdog" };
    System.out.println(sol.findAllConcatenatedWordsInADict(input2));
  }
}
/**
 *
 * Time complexity is O(n * k^2)
 * Space complexity is O(k) for dp and O(L) for the disctionary
 *
 */
