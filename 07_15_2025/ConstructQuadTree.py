"""

To represent a binary n x n matrix as a Quad-Tree, we recursively divide the grid into four equal
parts until each region contains only 0s or only 1s. If a region is uniform, it's represented as 
a leaf node; otherwise, it's represented as an internal node with four children corresponding to 
its quadrants. The key idea is to use a divide-and-conquer strategy: at each step, check if the 
current subgrid is uniform; if it is, return a leaf node, and if not, split the grid into four 
quadrants and recursively build child nodes for each. This approach efficiently compresses the 
matrix into a tree structure by capturing only the essential divisions needed to represent regions 
of identical values.

"""

from typing import List

class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def isUniform(x0, y0, size):
            val = grid[x0][y0]
            for i in range(x0, x0 + size):
                for j in range(y0, y0 + size):
                    if grid[i][j] != val:
                        return False
            return True

        def build(x0, y0, size):
            if isUniform(x0, y0, size):
                return Node(val=bool(grid[x0][y0]), isLeaf=True)

            half = size // 2
            topLeft = build(x0, y0, half)
            topRight = build(x0, y0 + half, half)
            bottomLeft = build(x0 + half, y0, half)
            bottomRight = build(x0 + half, y0 + half, half)

            return Node(
                val=True, 
                isLeaf=False,
                topLeft=topLeft,
                topRight=topRight,
                bottomLeft=bottomLeft,
                bottomRight=bottomRight
            )

        n = len(grid)
        return build(0, 0, n)

"""

Time complexity is O(n^2 * log(n))
Space complexity is O(n^2) in the worst case

"""