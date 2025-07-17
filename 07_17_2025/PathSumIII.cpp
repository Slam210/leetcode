/**
 *
 * Given a binary tree and a targetSum, return the number of paths that sum to targetSum, where
 * each path must go downward, but it can start and end at any node in the tree. We can brute-force
 * by starting a DFS from every node in the tree. At each node, we start a new DFS to count how many
 * paths starting at that node sum to targetSum. This is effectively a nested DFS with one to
 * iterate over every node in the tree and another to count valid paths starting from that node.
 *
 */

#include <iostream>
using namespace std;

struct TreeNode
{
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution
{
public:
    int pathSum(TreeNode *root, int targetSum)
    {
        if (!root)
            return 0;

        return countPathsFromNode(root, targetSum) +
               pathSum(root->left, targetSum) +
               pathSum(root->right, targetSum);
    }

private:
    int countPathsFromNode(TreeNode *node, long long target)
    {
        if (!node)
            return 0;

        int count = 0;
        if (node->val == target)
            count++;

        count += countPathsFromNode(node->left, target - node->val);
        count += countPathsFromNode(node->right, target - node->val);

        return count;
    }
};

int main()
{
    TreeNode *root = new TreeNode(10);
    root->left = new TreeNode(5);
    root->right = new TreeNode(-3);
    root->left->left = new TreeNode(3);
    root->left->right = new TreeNode(2);
    root->right->right = new TreeNode(11);
    root->left->left->left = new TreeNode(3);
    root->left->left->right = new TreeNode(-2);
    root->left->right->right = new TreeNode(1);

    Solution sol;
    int targetSum = 8;
    cout << "Number of paths with sum " << targetSum << ": " << sol.pathSum(root, targetSum) << endl;

    return 0;
}

/**
 *
 * Run time is O(n^2) in the worst case
 * Space time is O(h)
 *
 */