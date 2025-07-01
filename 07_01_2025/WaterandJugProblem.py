"""

We are given 2 jugs with capacity x and y. We have an infinite supply of whether.
We are to return whether or not we can achieve the target value by performing a mix of the 
following operations which are filling either jug completly with water, 
completely empty either jug, pour water from one jug to the other. The intuition for this
problem revolved around Bezout's identity which state that as long as the target is less
than both combined jugs, we can use the gcd function to see if it is a multiple.

"""

class Solution:
    def canMeasureWater(self, x: int, y: int, target: int) -> bool:
        def gcd(a, b):
            while b:
                a, b = b, a % b
            return a

        if target > x + y:
            return False
        if target == 0:
            return True

        return target % gcd(x, y) == 0

if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        (3, 5, 4), 
        (1, 2, 3), 
        (6, 9, 1),  
    ]
    for x, y, target in test_cases:
        print(f"x={x}, y={y}, target={target} → {solution.canMeasureWater(x, y, target)}")
        
"""

Run time is O(log(min x,y)) due to Euclid's GCD algorithm
Space time is O(1)

"""