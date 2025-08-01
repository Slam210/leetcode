/**
 *
 * We are given a list of non-overlapping axis-aligned rectangles in the form [x1, y1, x2, y2].
 * We need to randomly pick a uniformly distributed integer point from all the integer coordinates
 * covered by these rectangles. The point can lie on the perimeter. Each point must be chosen with
 * equal probability. The rectangles cover a discrete number of points, since only integer coordinates
 * matter. Each rectangle can contribute (x2 - x1 + 1) * (y2 - y1 + 1) integer points. To make all
 * points equally likely, we can precompute a prefix sum of total points per rectangle. We then
 * generate a random number rand_point from 1 to total number of points, binary search to find
 * the rectangle that contains this point, and randomly pick a point inside that rectangle.
 *
 */

#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

class Solution
{
private:
    vector<vector<int>> rects;
    vector<int> prefixSums;
    int totalPoints;

public:
    Solution(vector<vector<int>> &rects)
    {
        this->rects = rects;
        totalPoints = 0;
        for (auto &r : rects)
        {
            int count = (r[2] - r[0] + 1) * (r[3] - r[1] + 1);
            totalPoints += count;
            prefixSums.push_back(totalPoints);
        }
        srand(time(NULL));
    }

    vector<int> pick()
    {
        int randPoint = rand() % totalPoints;

        int left = 0, right = prefixSums.size() - 1;
        while (left < right)
        {
            int mid = (left + right) / 2;
            if (randPoint < prefixSums[mid])
                right = mid;
            else
                left = mid + 1;
        }

        auto &r = rects[left];
        int width = r[2] - r[0] + 1;
        int height = r[3] - r[1] + 1;
        int base = prefixSums[left] - width * height;
        int offset = randPoint - base;

        int dx = offset % width;
        int dy = offset / width;

        return {r[0] + dx, r[1] + dy};
    }
};

int main()
{
    vector<vector<int>> rects = {{1, 1, 5, 5}, {10, 10, 13, 13}};
    Solution *obj = new Solution(rects);

    for (int i = 0; i < 5; ++i)
    {
        vector<int> p = obj->pick();
        cout << "Picked point: [" << p[0] << ", " << p[1] << "]\n";
    }

    delete obj;
    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */