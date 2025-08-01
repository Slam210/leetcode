/*

The intuition is to use a min-heap of size k to store the top k
largest elements seen so far. Once the heap exceeds size k, pop
the smallest element. The top of the heap is the kth largest element.

*/

#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Solution
{
public:
    int findKthLargest(vector<int> &nums, int k)
    {
        priority_queue<int, vector<int>, greater<int>> minHeap;

        for (int num : nums)
        {
            minHeap.push(num);
            if (minHeap.size() > k)
            {
                minHeap.pop();
            }
        }

        return minHeap.top();
    }
};

int main()
{
    Solution solution;

    vector<int> nums = {3, 2, 1, 5, 6, 4};
    int k = 2;

    int result = solution.findKthLargest(nums, k);
    cout << "Kth largest element: " << result << endl;

    return 0;
}

/*

Time compleixty is O(n log(k))
Space complexity is O(k) where is the amount of elements

*/