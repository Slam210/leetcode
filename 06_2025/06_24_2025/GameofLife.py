"""

We need to update the board in-place, which means we can't use a full 
copy of the board to store the next state. To handle this, we use state encoding.
This allows us to maintain past indexes current states as well as their future state.
This way when we perform the initial and final iterations, there is no loss
as to the state of the board.

"""

from typing import List

class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Updates the board to the next state in-place.
        """
        if not board or not board[0]:
            return
        
        rows, cols = len(board), len(board[0])
        directions = [(-1, -1), (-1, 0), (-1, 1),
                      (0, -1),          (0, 1),
                      (1, -1),  (1, 0), (1, 1)]

        for r in range(rows):
            for c in range(cols):
                live_neighbors = 0
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and abs(board[nr][nc]) == 1:
                        live_neighbors += 1

                if board[r][c] == 1:
                    if live_neighbors < 2 or live_neighbors > 3:
                        board[r][c] = -1 
                elif board[r][c] == 0:
                    if live_neighbors == 3:
                        board[r][c] = 2  

        for r in range(rows):
            for c in range(cols):
                if board[r][c] > 0:
                    board[r][c] = 1
                else:
                    board[r][c] = 0
"""

Time complexity is O(m * n)
Space complexuty is O(1)

"""
