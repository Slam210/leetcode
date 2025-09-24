"""

We convert the problem into finding an Eulerian circuit on the De Bruijn graph whose nodes are all (n−1)-digit 
sequences and whose edges correspond to length-n passwords. We run a DFS/Hierholzer-style traversal that visits 
every directed edge exactly once while backtracking we record the digit. Finally we output the starting (n−1) 
zeros followed by the recorded digits in reversed order, producing a shortest string that contains every possible 
password of length n.

"""

from typing import List

def build_de_bruijn(n: int, k: int) -> str:
    # mod = k^(n-1) is number of nodes (representing (n-1)-digit prefixes)
    mod = k ** (n - 1) if n > 1 else 1
    total_edges = k ** n
    # visited edges is edge id = node * k + digit
    visited = [False] * total_edges 
    ans = []

    def dfs(u: int):
        # For node u, try all outgoing edges labeled 0..k-1
        for d in range(k):
            eid = u * k + d
            if not visited[eid]:
                visited[eid] = True
                # next node is last (n-1) digits
                v = (u * k + d) % mod  
                dfs(v)
                # record the edge label on backtrack
                ans.append(str(d))

    dfs(0)
    prefix = "0" * (n - 1)
    # ans currently holds the edge labels in backtrack order: reverse them
    return prefix + "".join(reversed(ans))

class Solution:
    def crackSafe(self, n: int, k: int) -> str:
        return build_de_bruijn(n, k)

def main():
    s = Solution()
    tests = [
        (1, 2), 
        (2, 2),  
        (2, 3),
        (3, 2),
        (4, 2),
    ]
    for n, k in tests:
        res = s.crackSafe(n, k)
        print(f"n={n}, k={k}, len={len(res)} -> {res[:60]}{'...' if len(res)>60 else ''}")
        expected = set()
        for x in range(k**n):
            t = []
            v = x
            for _ in range(n):
                t.append(str(v % k))
                v //= k
            expected.add("".join(reversed(t)))
        found = set(res[i:i+n] for i in range(len(res)-n+1))
        ok = expected <= found
        print("  valid:", ok, f"({len(found)} distinct substrings, expected {len(expected)})")
        print("-" * 50)

if __name__ == "__main__":
    main()
