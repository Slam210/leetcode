"""

We track ranges using a sorted list of disjoint intervals. 
Whenever we add a new range, we merge it into overlapping ones to maintain consistency. 
Queries check containment by searching within the stored intervals. Removal works by cutting 
existing intervals into non-overlapping parts that exclude the removed portion. 

"""

class RangeModule:
    def __init__(self):
        # list of [l, r), disjoint and sorted
        self.ranges = []  

    def addRange(self, left: int, right: int) -> None:
        new_ranges = []
        placed = False
        for l, r in self.ranges:
             # interval completely before [left, right)
            if r < left: 
                new_ranges.append([l, r])
            # interval completely after
            elif right < l:  
                if not placed:
                    new_ranges.append([left, right])
                    placed = True
                new_ranges.append([l, r])
            # overlap → merge
            else:  
                left = min(left, l)
                right = max(right, r)
        if not placed:
            new_ranges.append([left, right])
        self.ranges = new_ranges

    def queryRange(self, left: int, right: int) -> bool:
        for l, r in self.ranges:
            if l <= left and right <= r:
                return True
            # passed possible containing interval
            if r > left:  
                break
        return False

    def removeRange(self, left: int, right: int) -> None:
        new_ranges = []
        for l, r in self.ranges:
            if r <= left or l >= right:
                new_ranges.append([l, r])  
            else:
                if l < left:
                     # left part remains
                    new_ranges.append([l, left]) 
                if r > right:
                    # right part remains
                    new_ranges.append([right, r])  
        self.ranges = new_ranges


def main():
    rangeModule = RangeModule()
    rangeModule.addRange(10, 20)
    rangeModule.removeRange(14, 16)
    print(rangeModule.queryRange(10, 14))  
    print(rangeModule.queryRange(13, 15))  
    print(rangeModule.queryRange(16, 17)) 

if __name__ == "__main__":
    main()

        


# Your RangeModule object will be instantiated and called as such:
# obj = RangeModule()
# obj.addRange(left,right)
# param_2 = obj.queryRange(left,right)
# obj.removeRange(left,right)

"""

Time complexity is O(n)
Space complexity is O(n)

"""