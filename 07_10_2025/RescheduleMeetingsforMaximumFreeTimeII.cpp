/**
 *
 * The problem asks us to find the maximum continuous free time during an event, given a list 
 * of non-overlapping meetings. We're allowed to move at most one meeting to a different valid 
 * time slot within the event, as long as it doesn't overlap with others. The key intuition is 
 * that removing a meeting creates a larger free block between its neighboring gaps. If that 
 * removed meeting can fit into another existing free gap elsewhere, we can combine the two 
 * adjacent gaps plus the meeting's duration to form a potentially much larger free interval. 
 * To solve this efficiently, we precompute all gaps between meetings and then use prefix and 
 * suffix maximum arrays to quickly check if the meeting can be repositioned elsewhere.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    int maxFreeTime(int eventTime, vector<int> &startTime, vector<int> &endTime)
    {
        int n = startTime.size();
        if (n == 0)
            return eventTime;

        // Compute all the gaps between meetings
        vector<int> gaps(n + 1, 0);
        gaps[0] = startTime[0];
        for (int i = 1; i < n; ++i)
            gaps[i] = startTime[i] - endTime[i - 1]; 
        gaps[n] = eventTime - endTime[n - 1];      

        // Compute suffix max of right-side gaps for fast lookup
        vector<int> maxRightGap(n + 1, 0);
        for (int i = n - 1; i >= 0; --i)
            maxRightGap[i] = max(maxRightGap[i + 1], gaps[i + 1]);

        int maxFree = 0;
        int maxLeftGap = 0;

        // Try removing each meeting and see if we can increase max free time
        for (int i = 1; i <= n; ++i)
        {
            int duration = endTime[i - 1] - startTime[i - 1];

            bool canFitLeft = maxLeftGap >= duration;
            bool canFitRight = maxRightGap[i] >= duration;

            if (canFitLeft || canFitRight)
            {
                // Merge the gaps on both sides of the removed meeting and add its duration
                int mergedGap = gaps[i - 1] + gaps[i] + duration;
                maxFree = max(maxFree, mergedGap);
            }

            // Also consider not moving the meeting, just combine adjacent gaps
            int currentAdjacentGap = gaps[i - 1] + gaps[i];
            maxFree = max(maxFree, currentAdjacentGap);

            // Update maxLeftGap for next iteration
            maxLeftGap = max(maxLeftGap, gaps[i - 1]);
        }

        return maxFree;
    }
};

int main(){
    Solution sol;
    int eventTime1 = 5;
    vector<int> startTime1 = {1, 3};
    vector<int> endTime1 = {2, 5};
    cout << sol.maxFreeTime(eventTime1, startTime1, endTime1) << endl;
    return 0;
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(n)
 * 
 */