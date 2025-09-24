"""

We treat the lock as a graph where each state is a node and each wheel rotation by one step is an edge. 
Since we want the minimum moves from "0000" to the target, we perform a breadth-first search. Each step 
we explore all possible rotations, skipping deadends and revisited states. When we first encounter the 
target state, we immediately return the current depth. If no path exists, we return -1.

"""

from collections import deque
from typing import List

def neighbors(state: str) -> List[str]:
    res = []
    for i in range(4):
        digit = int(state[i])
        for move in (-1, 1):
            new_digit = (digit + move) % 10
            res.append(state[:i] + str(new_digit) + state[i+1:])
    return res

class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        dead = set(deadends)
        if "0000" in dead:
            return -1
        if target == "0000":
            return 0
        
        queue = deque([("0000", 0)])
        visited = {"0000"}
        
        while queue:
            state, steps = queue.popleft()
            if state == target:
                return steps
            for nei in neighbors(state):
                if nei not in dead and nei not in visited:
                    visited.add(nei)
                    queue.append((nei, steps + 1))
        return -1


def main():
    solver = Solution()
    print(solver.openLock(["0201","0101","0102","1212","2002"], "0202"))  
    print(solver.openLock(["8888"], "0009"))  
    print(solver.openLock(["0000"], "8888")) 

"""

Time complexity is O(10^4)
Space complexity is O(10^4)

"""