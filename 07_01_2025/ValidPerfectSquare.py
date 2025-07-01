"""

Given in integer num, return true if the number is the product of a perfect square.
We can use a binary search using left and right pointers to find whether or not 
the value that produces num is a perfect square. If the loop ends without finding
a match, we just return false.

"""

class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num < 1:
            return False

        left, right = 1, num
        while left <= right:
            mid = (left + right) // 2
            mid_squared = mid * mid

            if mid_squared == num:
                return True
            elif mid_squared < num:
                left = mid + 1
            else:
                right = mid - 1
        return False


if __name__ == "__main__":
    solution = Solution()
    test_cases = [1, 4, 9, 16, 14, 26, 100, 121, 2]
    for num in test_cases:
        print(f"Is {num} a perfect square? {solution.isPerfectSquare(num)}")

"""

Time complexity is O(log(n))
Space complexity is O(1)

"""