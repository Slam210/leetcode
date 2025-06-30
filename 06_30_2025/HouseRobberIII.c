/**
 *
 * At each node in the tree, we have 2 choices. We can rob the current node which means we
 * cannot rob its immediate children, but we can rob its grandchildren. Or we don’t rob this node
 * and we can rob its children. The key is to evaluate both options and return the maximum.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Definition for a binary tree node.
 */
struct TreeNode
{
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int *robSubtree(struct TreeNode *root)
{
    int *res = malloc(2 * sizeof(int));

    if (root == NULL)
    {
        res[0] = 0;
        res[1] = 0;
        return res;
    }

    int *left = robSubtree(root->left);
    int *right = robSubtree(root->right);

    // If we rob current node, we can't rob children
    res[1] = root->val + left[0] + right[0];

    // If we don't rob current node, take max of robbing or not robbing children
    res[0] = (left[0] > left[1] ? left[0] : left[1]) +
             (right[0] > right[1] ? right[0] : right[1]);

    free(left);
    free(right);
    return res;
}

int rob(struct TreeNode *root)
{
    int *result = robSubtree(root);
    int maxRobbed = result[0] > result[1] ? result[0] : result[1];
    free(result);
    return maxRobbed;
}
