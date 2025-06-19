/*

The intuition behind this problem is to use something that can help us
maintain groups of less than k value. Thus, we can sort to get the correct
order, loop through the array, and increment group whenever we reach a number
where the diference is greater than k, setting the new min for that group,

*/

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    int partitionArray(vector<int> &nums, int k)
    {
        sort(nums.begin(), nums.end());
        int groups = 0;
        int i = 0;
        int n = nums.size();

        while (i < n)
        {
            int minVal = nums[i];
            groups++;
            i++;

            while (i < n && nums[i] - minVal <= k)
            {
                i++;
            }
        }

        return groups;
    }
};

int main()
{
    Solution solution;

    vector<int> nums = {3, 6, 1, 2, 5};
    int k = 2;

    int result = solution.partitionArray(nums, k);
    cout << "Minimum subsequences: " << result << endl;

    return 0;
}

/*

Run time is O(n log(n)) since we have to sort
Space complexity us O(1)

*/