/**
 * 
 * Given a string representing a serialized tree, confirm whether or not the
 * tree is valid with how the pre order traversal serialized it. The idea behind
 * this problem is to use the concept of slots to maintain how many indexes in
 * the string were made. Each non null index creates 2 slots for children and
 * each null node was take 1 slot away.
 * 
 */

public class VerifyPreorderSerializationofaBinaryTree {
    public static class Solution {
        public boolean isValidSerialization(String preorder) {
            String[] nodes = preorder.split(",");
            int slots = 1;

            for (String node : nodes) {
                slots--;

                if (slots < 0)
                    return false;

                if (!node.equals("#")) {
                    slots += 2;
                }
            }
            return slots == 0;
        }

        public static void main(String[] args) {
            Solution solution = new Solution();

            String[] testCases = {
                    "9,3,4,#,#,1,#,#,2,#,6,#,#",
                    "1,#",
                    "9,#,#,1",
                    "#",
                    "1,#,#,#,#",
                    "7,2,#,2,#,#,#,6,#"
            };

            for (String preorder : testCases) {
                System.out.printf("Input: %-30s → %b%n", preorder,
                        solution.isValidSerialization(preorder));
            }
        }
    }
}

/**
 * 
 * Run time is O(n)
 * Space complexity is O(1)
 * 
 */