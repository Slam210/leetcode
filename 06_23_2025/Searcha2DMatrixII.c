/**
 *
 * Since both rows and columns are sorted, you can start at the top-right corner.
 * If the current element is greater than target, move left because everything below is larger.
 * If the current element is less than target, move down because everything to the left is smaller.
 * This gives a linear search over at most m + n elements.
 *
 */

#include <stdio.h>
#include <stdbool.h>

bool searchMatrix(int **matrix, int matrixSize, int *matrixColSize, int target)
{
    if (matrixSize == 0 || matrixColSize[0] == 0)
        return false;

    int row = 0;
    int col = matrixColSize[0] - 1;

    while (row < matrixSize && col >= 0)
    {
        int value = matrix[row][col];
        if (value == target)
            return true;
        else if (value > target)
            col--;
        else
            row++;
    }
    return false;
}

int main()
{
    int row0[] = {1, 4, 7, 11, 15};
    int row1[] = {2, 5, 8, 12, 19};
    int row2[] = {3, 6, 9, 16, 22};
    int row3[] = {10, 13, 14, 17, 24};
    int row4[] = {18, 21, 23, 26, 30};

    int *matrix[] = {row0, row1, row2, row3, row4};
    int matrixColSize[] = {5, 5, 5, 5, 5};

    int target = 5;

    if (searchMatrix(matrix, 5, matrixColSize, target))
    {
        printf("Target %d found in the matrix.\n", target);
    }
    else
    {
        printf("Target %d not found in the matrix.\n", target);
    }

    return 0;
}

/**
 *
 * Run time is O(m + n)
 * Space complexity is O(1)
 *
 */