import java.util.Arrays;

public class RelativeRanks {

  static class ScoreIndex {

    int score;
    int index;

    ScoreIndex(int score, int index) {
      this.score = score;
      this.index = index;
    }
  }

  static class Solution {

    public String[] findRelativeRanks(int[] score) {
      int n = score.length;
      ScoreIndex[] scoreIndices = new ScoreIndex[n];

      for (int i = 0; i < n; i++) {
        scoreIndices[i] = new ScoreIndex(score[i], i);
      }

      Arrays.sort(scoreIndices, (a, b) -> b.score - a.score);

      String[] result = new String[n];
      for (int i = 0; i < n; i++) {
        int originalIndex = scoreIndices[i].index;
        switch (i) {
          case 0:
            result[originalIndex] = "Gold Medal";
            break;
          case 1:
            result[originalIndex] = "Silver Medal";
            break;
          case 2:
            result[originalIndex] = "Bronze Medal";
            break;
          default:
            result[originalIndex] = String.valueOf(i + 1);
            break;
        }
      }

      return result;
    }
  }

  public static void main(String[] args) {
    Solution solution = new Solution();

    int[] score = { 10, 3, 8, 9, 4 };
    String[] ranks = solution.findRelativeRanks(score);

    System.out.println("Relative Ranks:");
    for (String rank : ranks) {
      System.out.println(rank);
    }
  }
}
