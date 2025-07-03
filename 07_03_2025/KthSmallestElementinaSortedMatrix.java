/**
 * 
 * Since the matrix is sorted both row-wise and column-wise, we can treat the
 * matrix as a 2D sorted space. Instead of flattening it into a list and sorting
 * (which takes O(n² log n) and O(n²) space), we can binary search on the value
 * range. Our goal is to find the smallest number x such that there are at least
 * k elements ≤ x in the matrix.
 * 
 */

public class KthSmallestElementinaSortedMatrix {
    static class Solution {
        private static int countLessEqual(int[][] matrix, int mid) {
            int n = matrix.length;
            int count = 0;
            int row = n - 1, col = 0;

            while (row >= 0 && col < n) {
                if (matrix[row][col] <= mid) {
                    count += (row + 1);
                    col++;
                } else {
                    row--;
                }
            }

            return count;
        }

        public int kthSmallest(int[][] matrix, int k) {
            int n = matrix.length;
            int left = matrix[0][0];
            int right = matrix[n - 1][n - 1];

            while (left < right) {
                int mid = left + (right - left) / 2;
                int count = countLessEqual(matrix, mid);

                if (count < k) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            return left;
        }

        public static void main(String[] args) {
            Solution sol = new Solution();
            int[][] matrix = {
                    { 1, 5, 9 },
                    { 10, 11, 13 },
                    { 12, 13, 15 }
            };
            int k = 8;
            System.out.println("Kth smallest element: " + sol.kthSmallest(matrix, k));
        }
    }

}

/**
 * 
 * Time complexity is O(n * log(max - min))
 * Space complexiy is O(1)
 * 
 */