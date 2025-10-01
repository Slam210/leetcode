"""

To transform the grid into a chessboard using row/column swaps, we first check structural feasibility where
each row must be either identical to the first row or its complement, and the same holds for columns. If not, return -1. 
Then we check counts where the number of rows (and columns) of each type cannot differ by more than one, and the counts 
of 1s and 0s in the first row/column must also be balanced. If feasible, we compute the minimum swaps needed by aligning 
rows and columns with the alternating [0,1,0,1,...] or [1,0,1,0,...] pattern, choosing the best option depending on whether 
n is even or odd. The total number of swaps is the sum of row_swaps and col_swaps.

"""

from typing import List

class Solution:
    def movesToChessboard(self, board: List[List[int]]) -> int:
        n = len(board)
        
        # Check rows
        first_row = board[0]
        for row in board:
            if row != first_row and [1 - x for x in row] != first_row:
                return -1
        
        # Check columns
        first_col = [board[i][0] for i in range(n)]
        for j in range(n):
            col = [board[i][j] for i in range(n)]
            if col != first_col and [1 - x for x in col] != first_col:
                return -1
        
        # Helper to compute min swaps for a row/col
        def minSwaps(line: List[int]) -> int:
            ones = sum(line)
            if abs(n - 2*ones) > 1:
                return -1
            pattern1 = sum(line[i] != i % 2 for i in range(n))
            if n % 2 == 0:
                return min(pattern1, n - pattern1) // 2
            else:
                if ones * 2 > n:
                    return (n - pattern1) // 2
                else:
                    return pattern1 // 2
        
        row_swaps = minSwaps(first_row)
        col_swaps = minSwaps(first_col)
        if row_swaps == -1 or col_swaps == -1:
            return -1
        return row_swaps + col_swaps


def run_tests():
    sol = Solution()
    tests = [
        ([[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]], 2),
        ([[0,1],[1,0]], 0),
        ([[1,0],[1,0]], -1),
    ]
    
    for board, expected in tests:
        result = sol.movesToChessboard(board)
        print(f"board={board} -> {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

"""

Time complexity is O(n^2)
Space complexity is O(n)

"""