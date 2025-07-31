/**
 *
 * We're given an m x n matrix mat. We are to return all its elements in a diagonal traversal order,
 * where the diagonals alternate direction. Diagonals move up-right then down-left in a zig-zag
 * fashion. Start from the top-left corner (0, 0) and end at the bottom-right (m-1, n-1). We want to
 * simulate moving through the matrix diagonally, alternating direction. When going up-right, coordinates
 * move row--, col++ and when going down-left, coordinates move row++, col--. When we hit a boundary,
 * we bounce to the next valid starting point depending on the direction and change direction.
 *
 */

#include <iostream>
#include <vector>
using namespace std;

class Solution
{
public:
    vector<int> findDiagonalOrder(vector<vector<int>> &mat)
    {
        int m = mat.size(), n = mat[0].size();
        vector<int> res(m * n);
        int row = 0, col = 0, dir = 1;

        for (int i = 0; i < m * n; i++)
        {
            res[i] = mat[row][col];

            if (dir == 1)
            {
                if (col == n - 1)
                {
                    row++;
                    dir = -1;
                }
                else if (row == 0)
                {
                    col++;
                    dir = -1;
                }
                else
                {
                    row--;
                    col++;
                }
            }
            else
            {
                if (row == m - 1)
                {
                    col++;
                    dir = 1;
                }
                else if (col == 0)
                {
                    row++;
                    dir = 1;
                }
                else
                {
                    row++;
                    col--;
                }
            }
        }

        return res;
    }
};

int main()
{
    Solution sol;
    vector<vector<int>> mat = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}};

    vector<int> res = sol.findDiagonalOrder(mat);
    cout << "Diagonal traversal: ";
    for (int val : res)
    {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 *
 */