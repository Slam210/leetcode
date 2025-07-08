"""

We're given multiple rectangles represented by their bottom-left and top-right coordinates.
We need to return True if all small rectangles together form a single perfect large rectangle, 
and there are no overlaps or gaps. To verify that all rectangles form an exact cover of a bigger 
rectangle we need to do an area check where the sum of all small rectangle areas must equal the 
area of the large rectangle they are supposed to form. Additionally, in a perfect rectangle, only
the four corners of the large rectangle should appear exactly once. All other internal corners should 
appear even number of times as they're shared between rectangles. We use a set to track corner points
where if a point appears once, we add it. If a point appears again, we remove it. In the end, 
only 4 corners should remain in the set — those of the outer big rectangle.

"""

from typing import List

class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        point_set = set()
        total_area = 0
        
        min_x = float('inf')
        min_y = float('inf')
        max_x = float('-inf')
        max_y = float('-inf')
        
        for x1, y1, x2, y2 in rectangles:
            min_x = min(min_x, x1)
            min_y = min(min_y, y1)
            max_x = max(max_x, x2)
            max_y = max(max_y, y2)
            
            total_area += (x2 - x1) * (y2 - y1)
            
            corners = [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]
            for corner in corners:
                if corner in point_set:
                    point_set.remove(corner)
                else:
                    point_set.add(corner)

        expected_corners = {(min_x, min_y), (min_x, max_y), (max_x, min_y), (max_x, max_y)}
        
        if point_set != expected_corners:
            return False

        bounding_area = (max_x - min_x) * (max_y - min_y)
        return total_area == bounding_area

def main():
    sol = Solution()
    test_cases = [
        ([[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]], True),  
        ([[1,1,2,3],[1,3,2,4],[3,1,4,2],[2,2,4,4]], False),           
        ([[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]], False),          
    ]

    for rectangles, expected in test_cases:
        result = sol.isRectangleCover(rectangles)
        print(f"Input: {rectangles} → Output: {result} (Expected: {expected})")

if __name__ == "__main__":
    main()

"""

Time complexity is O(n) to process all rectangles and update set
Space complexity is O(n) for corner case in the worse case though it is often smaller

"""