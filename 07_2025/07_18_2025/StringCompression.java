/**
 * 
 * We're given a char[] chars. For each group of consecutive repeating
 * characters, we write the character once. If it repeats more than once, append
 * the count of repeats. We must modify the chars array in-place, return the new
 * length of the compressed array, and use only constant extra space. This is a
 * classic two-pointer problem and we use one pointer to read through the input
 * and use another to write the compressed string. We count how many times the
 * current character repeats, write that character once, and if count > 1,
 * convert the count to characters and write them one-by-one.
 * 
 */

public class StringCompression {
    class Solution {
        public int compress(char[] chars) {
            int read = 0, write = 0, n = chars.length;

            while (read < n) {
                int start = read;
                char currentChar = chars[read];

                while (read < n && chars[read] == currentChar) {
                    read++;
                }

                int count = read - start;

                chars[write++] = currentChar;

                if (count > 1) {
                    for (char c : String.valueOf(count).toCharArray()) {
                        chars[write++] = c;
                    }
                }
            }

            return write;
        }
    }

    public static void main(String[] args) {
        StringCompression outer = new StringCompression();
        Solution solution = outer.new Solution();

        char[] chars = { 'a', 'a', 'b', 'b', 'c', 'c', 'c' };
        int newLength = solution.compress(chars);

        System.out.print("Compressed: ");
        for (int i = 0; i < newLength; i++) {
            System.out.print(chars[i]);
        }
        System.out.println("\nNew length: " + newLength);
    }
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is (1)
 * 
 */