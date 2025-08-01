"""

In-order traversal of a BST visits nodes in ascending order. 
To simulate this traversal without recursion we can use a stack 
to store the path from the root to the next smallest node. 
On each next() call we can pop the top of the stack 
(smallest unvisited node). If the node has a right child, 
push all its left descendants onto the stack. 

"""

from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._leftmost_inorder(root)

    def _leftmost_inorder(self, node: Optional[TreeNode]):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        top_node = self.stack.pop()
        if top_node.right:
            self._leftmost_inorder(top_node.right)
        return top_node.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0


# Your BSTIterator object will be instantiated and called as such:
# obj = BSTIterator(root)
# param_1 = obj.next()
# param_2 = obj.hasNext()

if __name__ == "__main__":
    root = TreeNode(7)
    root.left = TreeNode(3)
    root.right = TreeNode(15, TreeNode(9), TreeNode(20))

    iterator = BSTIterator(root)
    result = []
    while iterator.hasNext():
        result.append(iterator.next())
    print("In-order traversal:", result)
    
"""

next and hasNext both have O(1) time. Each node is pushed/popped once.
Space complexity is O(h), where h is the tree height (due to the stack).

"""