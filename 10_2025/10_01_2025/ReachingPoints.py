"""

We want to see if we can reach (tx, ty) starting from (sx, sy) with operations that add one coordinate to the other. 
Since forward growth is exponential, we instead reverse the process so starting from (tx, ty), we reduce the larger 
coordinate by the smaller, because that’s the only possible previous step. To avoid excessive repetition, we use modulo. 
If tx > ty, then tx can be reduced to tx % ty. We keep reducing until we either reach (sx, sy) or determine it’s impossible. 

"""

class Solution:
    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:
        """
        Return True if we can transform (sx, sy) to (tx, ty) using the allowed moves.
        """
        while tx >= sx and ty >= sy:
            if tx == sx and ty == sy:
                return True
            if tx > ty:
                if ty == sy:
                    return (tx - sx) % ty == 0
                tx %= ty
            else:
                if tx == sx:
                    return (ty - sy) % tx == 0
                ty %= tx
        return False


def run_tests():
    sol = Solution()
    tests = [
        (1, 1, 3, 5, True),
        (1, 1, 2, 2, False),
        (1, 1, 1, 1, True),
        (9, 5, 19, 5, True),  
    ]
    
    for sx, sy, tx, ty, expected in tests:
        result = sol.reachingPoints(sx, sy, tx, ty)
        print(f"(sx,sy)=({sx},{sy}), (tx,ty)=({tx},{ty}) -> {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

"""

Time complexity is O(log(max(ts, ty)))
Space complexity is O(1)

"""