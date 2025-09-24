"""

We keep adding moves until the total distance S we could have traveled is at least as large as the absolute target. 
Then, since we can flip some moves from right to left, we check whether (S - target) is even. If it’s even, we can 
adjust the path to land exactly on the target, otherwise we add more moves until it becomes even. This guarantees 
the smallest number of moves.

"""

class Solution:
    def reachNumber(self, target: int) -> int:
        target = abs(target) 
        steps = 0
        total = 0
        while total < target or (total - target) % 2 != 0:
            steps += 1
            total += steps
        return steps

def main():
    solver = Solution()
    tests = [2, 3, 4, 5, -5, 10, 11]
    for t in tests:
        res = solver.reachNumber(t)
        print(f"target={t}, min moves={res}")

if __name__ == "__main__":
    main()

"""

Time complexity is O(sqrt(target))
Space complexity is O(1)

"""