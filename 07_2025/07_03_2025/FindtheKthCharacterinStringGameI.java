/**
 * 
 * Given a string that starts with a, every round we add the next letter of the
 * alphabet to the second string and append it. The second string initially
 * starts out as the empty string which then proceeds to have b in it then bc.
 * We are to find the kth character in the string. The intuition behind this
 * problem is to realize that the string doubles after every iteration.
 * Therefore, we can work from reverse, finding the total length of the string.
 * Using the legnth, we can determine how many times k lies within the
 * transformed half, meaning we have to shift an additional unit.
 * 
 */

public class FindtheKthCharacterinStringGameI {
    public static class Solution {
        public char kthCharacter(int k) {
            int length = 1;
            while (length < k) {
                length *= 2;
            }

            int shifts = 0;
            while (length > 1) {
                length /= 2;
                if (k > length) {
                    k -= length;
                    shifts++;
                }
            }

            char result = (char) ((shifts % 26) + 'a');
            return result;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int k = 10;
        System.out.println("The " + k + "-th character is: " + sol.kthCharacter(k));
    }
}

/**
 * 
 * Run complexity is O(log (k))
 * Space complexity is O(1)
 * 
 */