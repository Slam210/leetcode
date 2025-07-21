/**
 *
 * The main idea is that since BSTs follow a strict order of left subtree < root < right subtree,
 * we can serialize the tree by performing a preorder traversal and storing the values as a
 * comma-separated string. To deserialize, we convert this string into a queue of integers and
 * rebuild the tree using value boundaries (minVal, maxVal) to maintain the BST property during
 * reconstruction. The left subtree must contain values less than the root, and the right subtree
 * must contain values greater than the root.
 *
 */

#include <iostream>
#include <sstream>
#include <string>
#include <queue>
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
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Codec
{
public:
    void preorder(TreeNode *node, string &result)
    {
        if (!node)
            return;
        result += to_string(node->val) + ",";
        preorder(node->left, result);
        preorder(node->right, result);
    }

    string serialize(TreeNode *root)
    {
        string result;
        preorder(root, result);
        if (!result.empty())
            result.pop_back();
        return result;
    }

    queue<int> parseData(const string &data)
    {
        queue<int> q;
        string num;
        for (char c : data)
        {
            if (c == ',')
            {
                if (!num.empty())
                {
                    q.push(stoi(num));
                    num.clear();
                }
            }
            else
            {
                num += c;
            }
        }
        if (!num.empty())
            q.push(stoi(num));
        return q;
    }

    TreeNode *buildBST(queue<int> &nodes, int minVal, int maxVal)
    {
        if (nodes.empty())
            return nullptr;

        int val = nodes.front();
        if (val < minVal || val > maxVal)
            return nullptr;

        nodes.pop();
        TreeNode *root = new TreeNode(val);
        root->left = buildBST(nodes, minVal, val);
        root->right = buildBST(nodes, val, maxVal);
        return root;
    }

    TreeNode *deserialize(string data)
    {
        queue<int> nodes = parseData(data);
        return buildBST(nodes, INT_MIN, INT_MAX);
    }
};

void printInorder(TreeNode *root)
{
    if (!root)
        return;
    printInorder(root->left);
    cout << root->val << " ";
    printInorder(root->right);
}

int main()
{
    Codec *ser = new Codec();
    Codec *deser = new Codec();

    TreeNode *root = new TreeNode(5);
    root->left = new TreeNode(3);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(2);
    root->left->right = new TreeNode(4);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(8);

    string serialized = ser->serialize(root);
    cout << "Serialized: " << serialized << endl;

    TreeNode *deserialized = deser->deserialize(serialized);
    cout << "Inorder of Deserialized Tree: ";
    printInorder(deserialized);
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity for all functions is O(n)
 * Space complexity for all functions is either O(n) for node values or O(h) for recursion stack
 *
 */