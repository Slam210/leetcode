/**
 *
 * We're given a 2D grid board of characters where 'X' represents part of a battleship. and '.'
 * represents empty water. Battleships are placed only horizontally or vertically (1 × k or k × 1)
 * and are non-adjacent, meaning there is at least one '.' cell separating them. We must count
 * how many distinct battleships exist on the board. Instead of traversing each entire battleship, 
 * we can just count the starting cell of each. A starting cell is an 'X' not preceded by another 'X' 
 * either above it or to the left. That ensures we count only the top-left corner of each battleship 
 * exactly once.
 *
 */

#include <stdio.h>
#include <stdlib.h>

int countBattleships(char **board, int boardSize, int *boardColSize)
{
    int count = 0;
    int rows = boardSize;
    int cols = *boardColSize;

    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            if (board[i][j] == '.')
                continue;
            if (i > 0 && board[i - 1][j] == 'X')
                continue;
            if (j > 0 && board[i][j - 1] == 'X')
                continue;
            count++;
        }
    }

    return count;
}

int main()
{
    char *board[] = {
        "X..X",
        "...X",
        "...X"};
    int boardSize = 3;
    int boardColSize = 4;

    int result = countBattleships(board, boardSize, &boardColSize);
    printf("Number of battleships: %d\n", result);

    return 0;
}

/**
 * 
 * Time complexity is O(m * n)
 * Space complexity is O(1)
 * 
 */