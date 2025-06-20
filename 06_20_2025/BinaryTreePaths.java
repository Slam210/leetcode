/*
 * 
 * Each path is represented as a string like "1->2->5".  
 * We can use DFS to traverse the tree. As we go down, we build the path string. 
 * When we reach a leaf node, we add the current path to the result list.
 * 
 */

import java.util.ArrayList;
import java.util.List;

public class BinaryTreePaths {
    public static void main(String[] args) {

        TreeNode node5 = new TreeNode(5);
        TreeNode node2 = new TreeNode(2, null, node5);
        TreeNode node3 = new TreeNode(3);
        TreeNode root = new TreeNode(1, node2, node3);

        Solution solution = new Solution();
        List<String> paths = solution.binaryTreePaths(root);
        System.out.println(paths);
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> result = new ArrayList<>();
        if (root == null)
            return result;
        dfs(root, "", result);
        return result;
    }

    private void dfs(TreeNode node, String path, List<String> result) {
        if (node == null)
            return;

        if (!path.isEmpty()) {
            path += "->";
        }
        path += node.val;

        if (node.left == null && node.right == null) {
            result.add(path);
        } else {
            dfs(node.left, path, result);
            dfs(node.right, path, result);
        }
    }

}

/*
 * 
 * Time compleixty is O(N)
 * Space complexity is O(P * L) where p is paths and L is avergae length
 * 
 */