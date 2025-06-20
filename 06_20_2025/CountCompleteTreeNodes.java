/*
 * 
 * The intuition behind this code is to realize we do not need to traverse
 * to each node within the tree. A complete binary tree is where each level
 * is completly filled except possibly the last, which is filled from the left.
 * Thus, we know if the left and right subtree heights are the same, we only
 * need to count nodes from the left subtree. Otherwise the right subtree is a full
 * tree, but one level less.
 * 
 */

public class CountCompleteTreeNodes{

    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode() {}
        TreeNode(int val) { this.val = val; }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     *     int val;
     *     TreeNode left;
     *     TreeNode right;
     *     TreeNode() {}
     *     TreeNode(int val) { this.val = val; }
     *     TreeNode(int val, TreeNode left, TreeNode right) {
     *         this.val = val;
     *         this.left = left;
     *         this.right = right;
     *     }
     * }
     */
    public static class Solution {
        private int getHeight(TreeNode node, boolean goLeft) {
            int height = 0;
            while (node != null) {
                height++;
                node = goLeft ? node.left : node.right;
            }
            return height;
        }

        public int countNodes(TreeNode root) {
            if (root == null) return 0;

            int leftHeight = getHeight(root, true);
            int rightHeight = getHeight(root, false);

            if (leftHeight == rightHeight) {
                return (1 << leftHeight) - 1;
            } else {
                return 1 + countNodes(root.left) + countNodes(root.right);
            }
        }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1,
                            new TreeNode(2,
                                new TreeNode(4),
                                new TreeNode(5)),
                            new TreeNode(3,
                                new TreeNode(6),
                                null));
        Solution sol = new Solution();
        System.out.println("Total Nodes: " + sol.countNodes(root));
    }
}

/*
 * 
 * Run time is O(log(n)^2) for a complete binary tree
 * Space complexity is O(log(n)) due to recursion
 * 
 */