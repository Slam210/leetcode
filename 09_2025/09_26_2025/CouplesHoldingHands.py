"""

We are given 2n seats and want to pair adjacent seats into couples. 
Noticing that each person's partner is x ^ 1, we iterate over the row in pairs, 
and for any pair that isn't already a couple we locate the true partner using a
position map and swap them into place. By updating the position map after each 
swap we maintain O(1) lookups, and because every swap fixes a couple permanently, 
this greedy approach produces the minimum number of swaps.

"""

from typing import List


class Solution:
    def minSwapsCouples(self, row: List[int]) -> int:
        # map person -> index
        pos = {person: idx for idx, person in enumerate(row)}
        swaps = 0
        n = len(row)
        i = 0
        while i < n:
            first = row[i]
            # partner trick
            expected_partner = first ^ i
            if row[i + 1] == expected_partner:
                # couple already together
                i += 2
                continue
            # otherwise swap row[i+1] with expected partner
            partner_index = pos[expected_partner]
            # person currently at i + 1
            other_person = row[i+1]
            # perform swap in row
            row[i+1], row[partner_index] = row[partner_index], row[i+1]
            # update positions in pos map
            pos[other_person] = partner_index
            pos[expected_partner] =  i+1
            swaps += 1
            i += 2
        return swaps

def main():
    s = Solution()
    examples = [
        [0, 2, 1, 3],
        [3, 2, 0, 1],
        [0,1,2,3],        
        [1,0,3,2],        
        [0,3,1,2],        
    ]
    for row in examples:
        arr = row.copy()
        result = s.minSwapsCouples(arr)
        print(f"row = {row} -> min swaps = {result}")

if __name__ == "__main__":
    main()

"""

Time complexity is O(m)
Space complexity is O(m)

"""