"""

We calculate how many steps it takes for us to reach the target using Manhattan distance, then check each ghost’s Manhattan distance to the same target. 
If any ghost can get to the target in the same number of steps or fewer, we cannot escape because the ghost can meet us. If all ghosts require strictly 
more steps than we do, then we can safely reach the target before any ghost and escape.

"""

from typing import List

def manhattan(a: List[int], b: List[int]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

class Solution:
    def escapeGhosts(self, ghosts: List[List[int]], target: List[int]) -> bool:
        our_dist = abs(target[0]) + abs(target[1])
        
        for g in ghosts:
            ghost_dist = manhattan(g, target)
            if ghost_dist <= our_dist:
                return False
        return True

if __name__ == "__main__":
    sol = Solution()

    tests = [
        ([[1,0],[0,3]], [0,1], True),
        ([[1,0]], [2,0], False),
        ([], [5,5], True),           
        ([[0,1]], [0,1], False),    
        ([[10,10]], [1,1], True),    
    ]

    for ghosts, target, expected in tests:
        result = sol.escapeGhosts(ghosts, target)
        print(f"ghosts={ghosts}, target={target} -> {result} (expected {expected})")
        
"""

Time complexity is O(g)
Space complexity is O(1)

"""