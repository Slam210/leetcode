"""

In the Zuma Game, the objective is to clear a row of colored balls by inserting balls from our hand such that 
every group of three or more consecutive balls of the same color is removed recursively. To solve this, we use 
a Breadth-First Search approach where each state is a combination of the current board, the hand, and the number 
of steps taken. We generate new states by trying all valid insertions that might trigger removals, prune redundant 
moves using sorted hand and color-matching rules, and recursively remove balls using a helper function. The intuition 
is to explore all valid game states efficiently while minimizing insertions, and return the minimum number of moves 
required to empty the board—or -1 if impossible.

"""

from collections import deque
from typing import Tuple

class Solution:
    def findMinStep(self, board: str, hand: str) -> int:
        
        # Remove consecutive same-colored balls starting from index i
        def remove_same(s: str, i: int) -> str:
            if i < 0:
                return s
            left = right = i
            while left > 0 and s[left - 1] == s[i]:
                left -= 1
            while right + 1 < len(s) and s[right + 1] == s[i]:
                right += 1
            if right - left + 1 >= 3:
                new_s = s[:left] + s[right + 1:]
                return remove_same(new_s, left - 1)
            return s

        # Sort hand to group same colors and help avoid duplicates
        hand = "".join(sorted(hand))
        
        # BFS queue with (current board, current hand, steps taken)
        q = deque([(board, hand, 0)])
        visited = set([(board, hand)])

        while q:
            curr_board, curr_hand, step = q.popleft()
            for i in range(len(curr_board) + 1):
                for j in range(len(curr_hand)):
                    # Avoid picking the same ball from hand more than once at this level
                    if j > 0 and curr_hand[j] == curr_hand[j - 1]:
                        continue

                    # Avoid inserting a ball into the middle of the same group (left side optimization)
                    if i > 0 and curr_board[i - 1] == curr_hand[j]:
                        continue

                    # Insert ball only when:
                    # - it matches current char on right side (forming at least two same-colored balls)
                    # - OR it bridges two same-colored groups (L == R != inserted)
                    pick = False
                    if i < len(curr_board) and curr_board[i] == curr_hand[j]:
                        pick = True
                    if 0 < i < len(curr_board) and curr_board[i - 1] == curr_board[i] and curr_board[i] != curr_hand[j]:
                        pick = True

                    if pick:
                        # Try inserting the ball and cleaning up
                        new_board = remove_same(curr_board[:i] + curr_hand[j] + curr_board[i:], i)
                        new_hand = curr_hand[:j] + curr_hand[j + 1:]
                        if not new_board:
                            return step + 1
                        if (new_board, new_hand) not in visited:
                            visited.add((new_board, new_hand))
                            q.append((new_board, new_hand, step + 1))

        return -1

def main():
    sol = Solution()

    board = "WRRBBW"
    hand = "RB"
    print("Input:", board, hand)
    print("Output:", sol.findMinStep(board, hand))  

    board = "WWRRBBWW"
    hand = "WRBRW"
    print("Input:", board, hand)
    print("Output:", sol.findMinStep(board, hand))  

    board = "G"
    hand = "GGGGG"
    print("Input:", board, hand)

"""

Time complexity is O(b * h * h * l) where b is number of possible boards, h is the number of characters, and l is cost
Space complexity is O(S) where s is the number of unique (board,hand)

"""