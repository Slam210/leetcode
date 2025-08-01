/*
 * 
 * We can solve this problem by using recursion to flip the left and right
 * subtree. Our base case occurs when we reach a null node.
 * 
 */

public class InvertBinaryTree {

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
        public TreeNode invertTree(TreeNode root) {
            if (root == null) return null;

            TreeNode left = invertTree(root.left);
            TreeNode right = invertTree(root.right);

            root.left = right;
            root.right = left;

            return root;
        }
    }

    public static void printPreOrder(TreeNode node) {
        if (node == null) return;
        System.out.print(node.val + " ");
        printPreOrder(node.left);
        printPreOrder(node.right);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4,
                            new TreeNode(2, new TreeNode(1), new TreeNode(3)),
                            new TreeNode(7, new TreeNode(6), new TreeNode(9)));

        System.out.print("Original (Pre-order): ");
        printPreOrder(root);

        Solution sol = new Solution();
        TreeNode inverted = sol.invertTree(root);

        System.out.print("\nInverted (Pre-order): ");
        printPreOrder(inverted);
    }
}

/*
 * 
 * Run time is O(n) as we have to visit each node
 * Space complexity is O(log(n)) due to recursive call stacks
 * 
 */