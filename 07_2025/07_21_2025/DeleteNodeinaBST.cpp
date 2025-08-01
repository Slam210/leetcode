/**
 *
 * We're given the root of a Binary Search Tree (BST) and an integer key. we need to find the node
 * with that key in the BST, delete that node while maintaining the properties of a BST. and return
 * the new root of the BST. A BST has the property that left child < node < right child. So to find
 * the node if key < root->val, go left. If key > root->val, go right. If key == root->val, we've
 * found the node to delete. When deleting if node is a leaf → Just delete it. If the node has one
 * child → Replace the node with its child. If the node has two children → Replace the node with its
 * inorder successor, and delete the successor from the right subtree.
 *
 */

#include <iostream>

using namespace std;

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
    TreeNode *deleteNode(TreeNode *root, int key)
    {
        if (!root)
            return nullptr;

        if (key < root->val)
        {
            root->left = deleteNode(root->left, key);
        }
        else if (key > root->val)
        {
            root->right = deleteNode(root->right, key);
        }
        else
        {
            if (!root->left && !root->right)
            {
                delete root;
                return nullptr;
            }
            else if (!root->left || !root->right)
            {
                TreeNode *child = root->left ? root->left : root->right;
                delete root;
                return child;
            }
            else
            {
                TreeNode *successor = findMin(root->right);
                root->val = successor->val;
                root->right = deleteNode(root->right, successor->val);
            }
        }

        return root;
    }

private:
    TreeNode *findMin(TreeNode *node)
    {
        while (node && node->left)
            node = node->left;
        return node;
    }
};

TreeNode *insert(TreeNode *root, int val)
{
    if (!root)
        return new TreeNode(val);
    if (val < root->val)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

void inorder(TreeNode *root)
{
    if (!root)
        return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main()
{
    Solution sol;
    TreeNode *root = nullptr;

    root = insert(root, 5);
    root = insert(root, 3);
    root = insert(root, 6);
    root = insert(root, 2);
    root = insert(root, 4);
    root = insert(root, 7);

    cout << "Inorder before deletion: ";
    inorder(root);
    cout << endl;

    int key = 3;
    root = sol.deleteNode(root, key);

    cout << "Inorder after deletion of " << key << ": ";
    inorder(root);
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is average O(log(n)) and O(n) in the worst case
 * Space complexity is average case is O(log(n)) and O(n) in the worst
 *
 */