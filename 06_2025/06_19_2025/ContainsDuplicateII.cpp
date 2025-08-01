/*

The idea behind this problem is that we can use a map to track when we last
saaw a number. In the event we see it again, we can subtract our currect index from
where we last saw it to see if it is less than k. We return true if it is else
we continue to iterate util we return false at the end.

*/

#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution
{
public:
    bool containsNearbyDuplicate(vector<int> &nums, int k)
    {
        unordered_map<int, int> lastSeen;

        for (int i = 0; i < nums.size(); ++i)
        {
            if (lastSeen.find(nums[i]) != lastSeen.end())
            {
                if (i - lastSeen[nums[i]] <= k)
                {
                    return true;
                }
            }
            lastSeen[nums[i]] = i;
        }
        return false;
    }
};

int main()
{
    Solution solution;

    vector<int> nums;
    nums.push_back(1);
    nums.push_back(2);
    nums.push_back(3);
    nums.push_back(1);

    int k = 3;

    bool result = solution.containsNearbyDuplicate(nums, k);
    cout << (result ? "true" : "false") << endl;

    return 0;
}

/*

Time complexity is O(n) as we visit each element once
Space complexity is O(n) as we store each number in the worst case

*/