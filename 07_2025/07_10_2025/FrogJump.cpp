#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <set>
using namespace std;

class Solution
{
public:
    set<int> stoneSet;
    unordered_map<int, unordered_set<int>> memo;

    bool canCross(vector<int> &stones)
    {
        stoneSet = set<int>(stones.begin(), stones.end());

        // Check if second stone is not at 1
        if (stones[1] != 1)
            return false;

        return dfs(1, 1, stones.back());
    }

    bool dfs(int position, int jump, int target)
    {
        if (position == target)
            return true;
        if (memo[position].count(jump))
            return false;

        for (int step = jump - 1; step <= jump + 1; ++step)
        {
            if (step <= 0)
                continue;
            int nextPos = position + step;
            if (stoneSet.count(nextPos))
            {
                if (dfs(nextPos, step, target))
                    return true;
            }
        }

        // mark this state as failed
        memo[position].insert(jump); 
        return false;
    }
};
