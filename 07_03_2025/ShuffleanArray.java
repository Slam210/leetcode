
/**
 * 
 * We need to be able to reset the array to its original configuration and be 
 * able to shuffle the array randomly and uniformly. We'll store the original 
 * array and the current array. We then use Fisher–Yates Shuffle, which works by
 * iterating from end to start, and for each index i, swap arr[i] with a random 
 * index from 0 to i
 * 
 */

import java.util.Random;

public class ShuffleanArray {
    static class Solution {
        private int[] original;
        private int[] current;
        private Random rand;

        public Solution(int[] nums) {
            this.original = nums.clone();
            this.current = nums.clone();
            this.rand = new Random();
        }

        public int[] reset() {
            current = original.clone();
            return current;
        }

        public int[] shuffle() {
            for (int i = current.length - 1; i > 0; i--) {
                int j = rand.nextInt(i + 1);
                int temp = current[i];
                current[i] = current[j];
                current[j] = temp;
            }
            return current.clone();
        }
    }

    /**
     * Your Solution object will be instantiated and called as such:
     * Solution obj = new Solution(nums);
     * int[] param_1 = obj.reset();
     * int[] param_2 = obj.shuffle();
     */

    public static void main(String[] args) {
        int[] nums = { 1, 2, 3 };
        Solution obj = new Solution(nums);

        System.out.println("Shuffled: ");
        printArray(obj.shuffle());

        System.out.println("Reset: ");
        printArray(obj.reset());

        System.out.println("Shuffled Again: ");
        printArray(obj.shuffle());
    }

    static void printArray(int[] arr) {
        for (int n : arr)
            System.out.print(n + " ");
        System.out.println();
    }
}

/**
 * 
 * Time complexity is O(n)
 * Spce complexity is O(n)
 * 
 */