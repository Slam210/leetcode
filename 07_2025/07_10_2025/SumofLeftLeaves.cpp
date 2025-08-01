/**
 *
 * Given the root of a binary tree, return the sum of all left leaves. We can use a bfs to
 * traverse the tree, adding only the left nodes.
 *
 */

#include <iostream>
#include <queue>
using namespace std;

// Definition for a binary tree node.
struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution
{
public:
    int sumOfLeftLeaves(TreeNode *root)
    {
        if (!root)
            return 0;

        queue<TreeNode *> q;
        q.push(root);
        int sum = 0;

        while (!q.empty())
        {
            TreeNode *current = q.front();
            q.pop();

            if (current->left)
            {
                if (!current->left->left && !current->left->right)
                {
                    sum += current->left->val;
                }
                else
                {
                    q.push(current->left);
                }
            }

            if (current->right)
            {
                q.push(current->right);
            }
        }

        return sum;
    }
};

/**
 * 
 * Time complexity is O(n) as we visit each node once
 * Space complexity is O(w) where w is the width of the tree
 * 
 */