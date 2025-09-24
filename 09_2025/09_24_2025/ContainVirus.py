"""

We simulate day-by-day where each day we discover all connected infected regions, compute
the distinct uninfected cells each would infect next night and count the walls that would 
be required to quarantine that region. We then quarantine the single region that threatens 
the most uninfected cells, marking it quarantined and adding the walls to our total, and 
allow all remaining regions to spread to their frontiers. We repeat these steps until no 
region can spread.

"""

from typing import List, Set, Tuple
import copy


class Solution:
    def containVirus(self, isInfected: List[List[int]]) -> int:
        if not isInfected or not isInfected[0]:
            return 0
        
        m, n = len(isInfected), len(isInfected[0])
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        total_walls = 0
        
        # Helper to discover a region starting from (i,j).
        def discover_region(i: int, j: int, seen: List[List[bool]]):
            stack = [(i, j)]
            seen[i][j] = True
            cells: List[Tuple[int,int]] = []
            frontier: Set[Tuple[int,int]] = set()
            walls = 0
            while stack:
                x, y = stack.pop()
                cells.append((x, y))
                for dx, dy in dirs:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < m and 0 <= ny < n:
                        if isInfected[nx][ny] == 0:
                            frontier.add((nx, ny))
                            walls += 1
                        elif isInfected[nx][ny] == 1 and not seen[nx][ny]:
                            seen[nx][ny] = True
                            stack.append((nx, ny))
                    # if neighbour is -1 (quarantined) we do nothing
            return cells, frontier, walls
                
        # Main simulation loop where each iteration is one day
        while True:
            seen = [[False] * n for _ in range(m)]
            # List of (cells, frontier_set, walls_needed)
            regions = []
            
            #  Find all infected regions and compute frontier + walls
            for i in range(m):
                for j in range(n):
                    if isInfected[i][j] == 1 and not seen[i][j]:
                        region_cells, frontier, walls = discover_region(i, j, seen)
                        regions.append((region_cells, frontier, walls))
            if not regions:
                # No infected regions left
                break
            
            # choose the region that threatens the most uninfected cells
            target_idx = max(range(len(regions)), key=lambda k: len(regions[k][1]))
            
            # if the chosen region cannot infect any new cell, stop
            if len(regions[target_idx][1]) == 0:
                break

            # quarantine the target region: build walls and mark cells as -1
            total_walls += regions[target_idx][2]
            for x, y in regions[target_idx][0]:
                isInfected[x][y] = -1

            # other regions spread into their frontier cells
            for idx, (cells, frontier, walls) in enumerate(regions):
                if idx == target_idx:
                    continue
                for x, y in frontier:
                    # If multiple regions share the same frontier cell, it becomes infected anyway.
                    if isInfected[x][y] == 0:
                        isInfected[x][y] = 1

        # continue to next day
        return total_walls

def main():
    tests = [
        ([[0,0,0],
          [0,1,0],
          [0,0,0]], "Single center infected (should use 4 walls)"),
        ([[1,0,0],
          [0,0,0],
          [0,0,1]], "Two isolated infected cells"),
        ([[1,1],
          [1,1]], "All infected (0 walls needed)"),
        ([[0,1,0,0,0,0,0,1],
          [0,1,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,0]], "Larger example")
    ]

    solver = Solution()
    for grid, desc in tests:
        gcopy = copy.deepcopy(grid)
        walls = solver.containVirus(gcopy)
        print(f"{desc} -> walls used: {walls}")
        print("Final grid state:")
        for row in gcopy:
            print(row)
        print("-" * 40)


if __name__ == "__main__":
    main()
    
"""

Time complexity is O(D * N) where D is number of days
Space complexity is O(N)

"""