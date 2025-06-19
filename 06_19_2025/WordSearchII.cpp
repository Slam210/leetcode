/*

The task is to find which words from the list exist in the board,
by forming them through adjacent characters, and you can only use a
cell once per word search. This is a classic Word Search problem extended
to multiple words. Using Trie to efficiently prune searches.
Performing DFS from each board cell, guided by the Trie.

*/

#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>

using namespace std;

struct TrieNode
{
    unordered_map<char, TrieNode *> children;
    string word = "";
    ~TrieNode()
    {
        for (auto &pair : children)
        {
            delete pair.second;
        }
    }
};

class Trie
{
public:
    TrieNode *root;

    Trie() : root(new TrieNode()) {}

    void insert(const string &word)
    {
        TrieNode *node = root;
        for (char c : word)
        {
            if (!node->children.count(c))
            {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->word = word;
    }

    ~Trie()
    {
        delete root;
    }
};

class Solution
{
public:
    void dfs(vector<vector<char>> &board, int i, int j, TrieNode *node, vector<string> &result)
    {
        char c = board[i][j];
        if (!node->children.count(c))
            return;

        node = node->children[c];
        if (!node->word.empty())
        {
            result.push_back(node->word);
            node->word.clear();
        }

        board[i][j] = '#';

        int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (auto &d : dirs)
        {
            int x = i + d[0], y = j + d[1];
            if (x >= 0 && y >= 0 && x < board.size() && y < board[0].size() && board[x][y] != '#')
            {
                dfs(board, x, y, node, result);
            }
        }

        board[i][j] = c;
    }

    vector<string> findWords(vector<vector<char>> &board, vector<string> &words)
    {
        Trie trie;
        for (const string &word : words)
        {
            trie.insert(word);
        }

        vector<string> result;
        for (int i = 0; i < board.size(); ++i)
        {
            for (int j = 0; j < board[0].size(); ++j)
            {
                dfs(board, i, j, trie.root, result);
            }
        }

        return result;
    }
};

int main()
{
    Solution sol;
    vector<vector<char>> board = {
        {'o', 'a', 'a', 'n'},
        {'e', 't', 'a', 'e'},
        {'i', 'h', 'k', 'r'},
        {'i', 'f', 'l', 'v'}};
    vector<string> words = {"oath", "pea", "eat", "rain"};

    vector<string> result = sol.findWords(board, words);
    for (const string &word : result)
    {
        cout << word << endl;
    }

    return 0;
}

/*

Trie inserstion is O(k * L)
DSF is O(m * n * 4^L)

Space complexuity is O(k * l) for the trie
DFS is (L)

*/