#include <iostream>
#include <vector>
#include <climits>
using namespace std;

/**
 * Definition for a binary tree node.
 */
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
private:
    int current_val = INT_MIN;
    int current_count = 0;
    int max_count = 0;
    vector<int> modes;

    void updateModes()
    {
        if (current_count > max_count)
        {
            modes.clear();
            modes.push_back(current_val);
            max_count = current_count;
        }
        else if (current_count == max_count)
        {
            modes.push_back(current_val);
        }
    }

    void inorder(TreeNode *node)
    {
        if (!node)
            return;

        inorder(node->left);

        if (node->val == current_val)
        {
            current_count++;
        }
        else
        {
            if (current_count > 0)
                updateModes();
            current_val = node->val;
            current_count = 1;
        }

        inorder(node->right);
    }

public:
    vector<int> findMode(TreeNode *root)
    {
        inorder(root);
        updateModes();
        return modes;
    }
};

int main()
{
    TreeNode *root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(2);

    Solution sol;
    vector<int> result = sol.findMode(root);

    cout << "Mode(s): ";
    for (int val : result)
    {
        cout << val << " ";
    }
    cout << endl;

    // Free memory
    delete root->right->left;
    delete root->right;
    delete root;

    return 0;
}
