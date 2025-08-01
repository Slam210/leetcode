/**
 *
 * Given a grid heights where heights[r][c] is the elevation of the cell (r, c), water flows from
 * a cell to its 4-directionally adjacent cells if the neighbor's height is less than or equal.
 * Pacific touches the top and left edges. Atlantic touches the bottom and right edges. Our goal
 * is to return all coordinates [r, c] where water can flow to both the Pacific and Atlantic oceans.
 * This is a graph traversal problem where we can imagine reversing the flow. Instead of checking which
 * cells can reach the ocean, we ask from which cells can the ocean reach by moving only to equal or
 * higher heights? So, we run DFS or BFS from the Pacific border and mark all reachable cells. 
 * Do the same from the Atlantic border. The result is the intersection of both reachable areas.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>


int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

void dfs(int **heights, int heightsSize, int heightsColSize, int r, int c, bool **ocean, int prevHeight)
{
    if (r < 0 || r >= heightsSize || c < 0 || c >= heightsColSize)
        return;
    if (ocean[r][c] || heights[r][c] < prevHeight)
        return;

    ocean[r][c] = true;

    for (int d = 0; d < 4; d++)
    {
        int nr = r + dirs[d][0], nc = c + dirs[d][1];
        dfs(heights, heightsSize, heightsColSize, nr, nc, ocean, heights[r][c]);
    }
}

/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */
int **pacificAtlantic(int **heights, int heightsSize, int *heightsColSize, int *returnSize, int **returnColumnSizes)
{
    int m = heightsSize;
    int n = *heightsColSize;
    *returnSize = 0;

    bool **pacific = (bool **)malloc(m * sizeof(bool *));
    bool **atlantic = (bool **)malloc(m * sizeof(bool *));
    for (int i = 0; i < m; i++)
    {
        pacific[i] = (bool *)calloc(n, sizeof(bool));
        atlantic[i] = (bool *)calloc(n, sizeof(bool));
    }

    for (int i = 0; i < m; i++)
        dfs(heights, m, n, i, 0, pacific, heights[i][0]);
    for (int j = 0; j < n; j++)
        dfs(heights, m, n, 0, j, pacific, heights[0][j]);

    for (int i = 0; i < m; i++)
        dfs(heights, m, n, i, n - 1, atlantic, heights[i][n - 1]);
    for (int j = 0; j < n; j++)
        dfs(heights, m, n, m - 1, j, atlantic, heights[m - 1][j]);

    int maxCells = m * n;
    int **result = (int **)malloc(maxCells * sizeof(int *));
    *returnColumnSizes = (int *)malloc(maxCells * sizeof(int));

    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (pacific[i][j] && atlantic[i][j])
            {
                result[*returnSize] = (int *)malloc(2 * sizeof(int));
                result[*returnSize][0] = i;
                result[*returnSize][1] = j;
                (*returnColumnSizes)[*returnSize] = 2;
                (*returnSize)++;
            }
        }
    }

    for (int i = 0; i < m; i++)
    {
        free(pacific[i]);
        free(atlantic[i]);
    }
    free(pacific);
    free(atlantic);

    return result;
}

/**
 * 
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 * 
 */