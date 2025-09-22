"""

We want to construct the largest valid monotone increasing number less than or equal to n. 
To do this, we look at the digits of n from right to left and find where the monotone property fails. 
Once found, we decrease the violating digit by one and make all digits to the right into 9s. 
If the decrease causes new violations earlier, we backtrack and adjust those digits as well. 
This method ensures we end up with the biggest number possible that still respects monotone increasing digits.

"""

class Solution:
    def monotoneIncreasingDigits(self, n: int) -> int:
        digits = list(map(int, str(n)))
        length = len(digits)

        mark = length

        for i in range(length - 1, 0, -1):
            if digits[i - 1] > digits[i]:
                digits[i - 1] -= 1
                mark = i

        for j in range(mark, length):
            digits[j] = 9

        return int(''.join(map(str, digits)))
    
def main():
    sol = Solution()
    tests = [
        (10, 9),
        (1234, 1234),
        (332, 299),
        (987654, 899999),
        (120, 119),
    ]

    for n, expected in tests:
        result = sol.monotoneIncreasingDigits(n)
        print(f"n = {n}\n -> result = {result}    expected = {expected}\n")


if __name__ == "__main__":
    main()

"""

Time complexity is O(d) where d is the number of digits in n
Space complexity is O(d) in order to store the digit list

"""