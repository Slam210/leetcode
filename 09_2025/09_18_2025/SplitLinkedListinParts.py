"""

We solve this by first counting how many nodes the list has, then dividing this length into k buckets as evenly as possible.
Each bucket will hold Math.floor(length / k) nodes, and if there are leftovers, we distribute them one by one to the first 
few buckets. Then, walking through the linked list, we carefully detach segments of the required lengths to form the new parts. 
By the end, we’ll have exactly k parts, some possibly null if the list was too short.

"""

from typing import List, Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        length = 0
        cur = head
        while cur:
            length += 1
            cur = cur.next
        
        base, extra = divmod(length, k)
        
        parts = []
        cur = head
        for i in range(k):
            part_head = cur
            size = base + (1 if i < extra else 0)
            for j in range(size - 1):
                if cur:
                    cur = cur.next
            if cur:
                next_part = cur.next
                cur.next = None
                cur = next_part
            parts.append(part_head)
        return parts

def build_list(values):
    dummy = ListNode()
    cur = dummy
    for v in values:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def print_parts(parts):
    for i, head in enumerate(parts):
        vals = []
        cur = head
        while cur:
            vals.append(cur.val)
            cur = cur.next
        print(f"Part {i}: {vals}")

def main():
    head = build_list([1,2,3,4,5,6,7,8,9,10])
    k = 3
    sol = Solution()
    parts = sol.splitListToParts(head, k)
    print_parts(parts)

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(k)

"""