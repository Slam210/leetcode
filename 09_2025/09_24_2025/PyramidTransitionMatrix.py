"""

We want to check if a pyramid can be built starting from a given bottom row using only the triangular block patterns provided. 
Each pattern says which top block is allowed above a pair of bottom blocks. The key idea is that this problem is recursive in 
nature where each row of the pyramid depends on the one below it. Starting from the bottom row, every adjacent pair of blocks 
can generate one or more possible blocks above them. If at any point a pair cannot generate any valid block, the pyramid fails. 
By recursively trying to build rows upward and backtracking when we hit a dead end, we can explore all possible pyramid constructions. 

"""

from typing import List
from collections import defaultdict
from functools import lru_cache

class Solution:
    def pyramidTransition(self, bottom: str, allowed: List[str]) -> bool:
        transitions = defaultdict(list)
        for pat in allowed:
            a, b, c = pat
            transitions[(a, b)].append(c)

        @lru_cache(None)
        def can_build(row: str) -> bool:
            if len(row) == 1:
                return True
            options = []
            for i in range(len(row) - 1):
                pair = (row[i], row[i+1])
                if pair not in transitions:
                    return False
                options.append(transitions[pair])

            def dfs(pos: int, path: str) -> bool:
                if pos == len(options):
                    return can_build(path)
                for c in options[pos]:
                    if dfs(pos + 1, path + c):
                        return True
                return False

            return dfs(0, "")

        return can_build(bottom)


def main():
    solver = Solution()
    print(solver.pyramidTransition("BCD", ["BCC","CDE","CEA","FFF"])) 
    print(solver.pyramidTransition("AABA", ["AAA","AAB","ABA","ABB","BAC"]))  

if __name__ == "__main__":
    main()

"""

Time complexity is O(k^(m-1)) worst case
Space complexity is O(m^2)

"""