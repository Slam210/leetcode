"""

We want the count of x such that the factorial x! has exactly k trailing zeros. 
Since trailing zeros come from factors of 5, the function f(x) increases stepwise, jumping 
only at multiples of 5. This structure ensures that if a solution exists for a given k, it 
consists of a block of exactly 5 consecutive integers, otherwise, there are no solutions. 
Therefore, we only need to binary search for the smallest x where f(x) >= k. If f(x) equals k, the answer is 5, otherwise it’s 0.

"""

class Solution:
    def preimageSizeFZF(self, k: int) -> int:
        # Count trailing zeros in x!
        def zeta(x: int) -> int:
            count = 0
            while x > 0:
                x //= 5
                count += x
            return count

        # Binary search for smallest x where zeta(x) >= k
        left, right = 0, 5 * k
        while left < right:
            mid = (left + right) // 2
            if zeta(mid) < k:
                left = mid + 1
            else:
                right = mid

        # Check if zeta(left) == k
        if zeta(left) == k:
            return 5
        return 0

if __name__ == "__main__":
    sol = Solution()
    tests = [
        (0, 5), 
        (5, 0),  
        (3, 5),  
        (1000000000, 5), 
    ]
    for k, expected in tests:
        result = sol.preimageSizeFZF(k)
        print(f"k={k} -> {result} (expected {expected})")

"""

Time complexity is O(log(k))
Space complexity is O(1)

"""