/*

The idea behind this problem is to use a prefix array tree.
When we add and search words, we just simply iterate through the tree
in order to find the words position. To support the wildcard .,
we’ll do DFS traversal during search so that if the current character is .,
we try all possible children. Otherwise, follow the path for the specific character.

*/

#include <iostream>
#include <string>
#include <vector>

using namespace std;

class TrieNode
{
public:
    TrieNode *children[26] = {nullptr};
    bool isEnd = false;
};

class WordDictionary
{
private:
    TrieNode *root;

    bool dfs(TrieNode *node, const string &word, int index)
    {
        if (!node)
            return false;
        if (index == word.size())
            return node->isEnd;

        char c = word[index];
        if (c == '.')
        {
            for (int i = 0; i < 26; ++i)
            {
                if (node->children[i] && dfs(node->children[i], word, index + 1))
                {
                    return true;
                }
            }
            return false;
        }
        else
        {
            int idx = c - 'a';
            return dfs(node->children[idx], word, index + 1);
        }
    }

public:
    WordDictionary()
    {
        root = new TrieNode();
    }

    void addWord(string word)
    {
        TrieNode *curr = root;
        for (char c : word)
        {
            int i = c - 'a';
            if (!curr->children[i])
            {
                curr->children[i] = new TrieNode();
            }
            curr = curr->children[i];
        }
        curr->isEnd = true;
    }

    bool search(string word)
    {
        return dfs(root, word, 0);
    }
};

int main()
{
    WordDictionary *obj = new WordDictionary();
    obj->addWord("bad");
    obj->addWord("dad");
    obj->addWord("mad");

    cout << boolalpha;
    cout << obj->search("pad") << endl;
    cout << obj->search("bad") << endl;
    cout << obj->search(".ad") << endl;
    cout << obj->search("b..") << endl;

    delete obj;
    return 0;
}

/*

Time comploexity of addWord is O(L) where l is the length of the word.
For search, the time compleixty is O(26^d^L) where d is the number of dots and L is word length

Space complexity is O(N * L) for storing up to N words of averge length L

*/
