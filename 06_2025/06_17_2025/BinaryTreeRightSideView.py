"""

The intuition behind this is to use a data strcuture that can determine if
the right most node on the level is on which side of the tree. Therefore,
we can use a BFS seaarch in order to find the rightmost node as it is the last
node in the queue at each level

"""

from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val = 0, left = None, right = None):
        self.val = val
        self.left = left
        self.right = right

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        if not root:
            return []
        queue = deque([root])
        res = []
        
        while queue:
            level_length = len(queue)
            for i in range(level_length):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
                if i == level_length - 1:
                    res.append(node.val)
        
        return res

if __name__ == "__main__":
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.right = TreeNode(5)
    root.right.right = TreeNode(4)

    solution = Solution()
    print(solution.rightSideView(root))
    
"""

Run time is O(n) as we visit each node in the tree exactly once
Space complexity is O(d) where d is the maxmomum number of nodes at any level
 
"""