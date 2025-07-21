#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

class Solution
{
public:
    vector<int> findDisappearedNumbers(vector<int> &nums)
    {
        for (int i = 0; i < nums.size(); ++i)
        {
            int index = abs(nums[i]) - 1;
            if (nums[index] > 0)
                nums[index] = -nums[index];
        }

        vector<int> result;
        for (int i = 0; i < nums.size(); ++i)
        {
            if (nums[i] > 0)
            {
                result.push_back(i + 1);
            }
        }

        return result;
    }
};

int main()
{
    Solution solution;

    vector<int> nums1 = {4, 3, 2, 7, 8, 2, 3, 1};
    vector<int> result1 = solution.findDisappearedNumbers(nums1);
    cout << "Missing numbers in [4,3,2,7,8,2,3,1]: ";
    for (int num : result1)
        cout << num << " ";
    cout << endl;

    vector<int> nums2 = {1, 1};
    vector<int> result2 = solution.findDisappearedNumbers(nums2);
    cout << "Missing numbers in [1,1]: ";
    for (int num : result2)
        cout << num << " ";
    cout << endl;

    return 0;
}
