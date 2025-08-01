/*

The idea is to use backtracking to find all possible solutions. This allows
us to perform a DFS search through the array to find all possible combinations.

*/

#include <iostream>
#include <vector>

using namespace std;

class Solution
{
public:
    vector<vector<int>> result;

    void backtrack(int start, int k, int n, vector<int> &current, int sum)
    {
        if (current.size() == k)
        {
            if (sum == n)
            {
                result.push_back(current);
            }
            return;
        }

        for (int i = start; i <= 9; ++i)
        {
            if (sum + i > n)
                break;

            current.push_back(i);
            backtrack(i + 1, k, n, current, sum + i);
            current.pop_back();
        }
    }

    vector<vector<int>> combinationSum3(int k, int n)
    {
        vector<int> current;
        backtrack(1, k, n, current, 0);
        return result;
    }
};

int main()
{
    Solution solution;
    int k = 3, n = 7;

    vector<vector<int>> combos = solution.combinationSum3(k, n);

    for (const auto &combo : combos)
    {
        for (int num : combo)
        {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}

/*

Time complexity is O(C(9,k))
Space complexity is O(k) for recursion and result storage

*/