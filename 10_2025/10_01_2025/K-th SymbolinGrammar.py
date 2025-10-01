"""

We build rows by replacing 0 with 01 and 1 with 10, doubling the row length each time. 
Instead of constructing rows directly, we realize each symbol’s value depends only on 
its parent in the previous row where if it is in an odd position, it inherits the parent’s 
value and if it is in an even position, it flips the parent’s value. This recursive pattern 
allows us to compute the answer without building entire rows.

"""

class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        if n == 1:
            return 0
        
        mid = 2 ** (n - 2)
        
        if k <= mid:
            return self.kthGrammar(n - 1, k)
        else:
            return 1 - self.kthGrammar(n - 1, k - mid)


def run_tests():
    sol = Solution()
    tests = [
        (1, 1), 
        (2, 1), 
        (2, 2),   
        (3, 1),  
        (3, 2),   
        (3, 3), 
        (3, 4),   
        (4, 5),  
    ]
    
    for n, k in tests:
        result = sol.kthGrammar(n, k)
        print(f"n={n}, k={k} -> {result}")


if __name__ == "__main__":
    run_tests()

"""

Time complexity is O(n)
Space complexity is O(n)

"""