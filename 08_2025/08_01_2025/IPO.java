/**
 *
 * Given a list of projects, each with a required capital and associated profit, our task is to
 * select up to k projects that we can afford, and maximize our final capital. The best strategy
 * is greedy: at each step, pick the most profitable project that is currently affordable. To do
 * this efficiently, we first sort all projects by required capital in a min-heap and maintain a
 * max-heap of profitable projects that we can currently afford. In each of the k steps, we add
 * affordable projects to the max-heap and select the one with the highest profit to maximize the
 * capital.
 *
 */

import java.util.*;

public class IPO {

  static class Solution {

    // Inner class to hold profit and capital for each project
    static class Project {

      int profit, capital;

      Project(int profit, int capital) {
        this.profit = profit;
        this.capital = capital;
      }
    }

    public int findMaximizedCapital(
      int k,
      int w,
      int[] profits,
      int[] capital
    ) {
      int n = profits.length;

      // Min-heap ordered by required capital to know what we can afford
      PriorityQueue<Project> capitalMinHeap = new PriorityQueue<>(
        (a, b) -> a.capital - b.capital
      );

      // Max-heap ordered by profit to choose most profitable among affordable
      PriorityQueue<Project> profitMaxHeap = new PriorityQueue<>(
        (a, b) -> b.profit - a.profit
      );

      // Insert all projects into capital min-heap
      for (int i = 0; i < n; i++) {
        capitalMinHeap.offer(new Project(profits[i], capital[i]));
      }

      // Perform up to k selections
      for (int i = 0; i < k; i++) {
        // Add all affordable projects into profit max-heap
        while (
          !capitalMinHeap.isEmpty() && capitalMinHeap.peek().capital <= w
        ) {
          profitMaxHeap.offer(capitalMinHeap.poll());
        }

        // If no project is affordable, break early
        if (profitMaxHeap.isEmpty()) break;

        // Choose the most profitable project
        w += profitMaxHeap.poll().profit;
      }

      return w;
    }
  }

  public static void main(String[] args) {
    Solution solution = new Solution();

    int k = 2;
    int w = 0;
    int[] profits = { 1, 2, 3 };
    int[] capital = { 0, 1, 1 };

    int result = solution.findMaximizedCapital(k, w, profits, capital);
    System.out.println("Final capital after completing projects: " + result);
  }
}
/**
 *
 * Time complexity is O(nlog(n) + klog(n))
 * Space complexity is O(n)
 *
 */
