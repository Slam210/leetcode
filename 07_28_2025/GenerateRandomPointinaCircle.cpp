/**
 *
 * We need to implement a Solution object that initializes a circle with given radius, x_center, and y_center
 * and has a randPoint() method that returns a random point inside the circle, uniformly distributed. The
 * intuition is to pick a random angle θ between 0 and 2π. We then pick a random radius r, but not uniformly
 * from 0 to radius, bit instead pick r = sqrt(rand()) * radius to get a uniform distribution over area. Lastly
 * we convert (r, θ) to Cartesian (x, y) using x = r * cos(θ) + x_center and y = r * sin(θ) + y_center.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

typedef struct
{
    double radius;
    double x_center;
    double y_center;
} Solution;

Solution *solutionCreate(double radius, double x_center, double y_center)
{
    Solution *obj = (Solution *)malloc(sizeof(Solution));
    obj->radius = radius;
    obj->x_center = x_center;
    obj->y_center = y_center;
    srand((unsigned int)time(NULL));
    return obj;
}

double *solutionRandPoint(Solution *obj, int *retSize)
{
    double angle = ((double)rand() / RAND_MAX) * 2 * M_PI;
    double length = sqrt((double)rand() / RAND_MAX) * obj->radius;

    double x = obj->x_center + length * cos(angle);
    double y = obj->y_center + length * sin(angle);

    double *result = (double *)malloc(2 * sizeof(double));
    result[0] = x;
    result[1] = y;
    *retSize = 2;
    return result;
}

void solutionFree(Solution *obj)
{
    free(obj);
}

int main()
{
    Solution *obj = solutionCreate(1.0, 0.0, 0.0);

    for (int i = 0; i < 3; i++)
    {
        int retSize = 0;
        double *point = solutionRandPoint(obj, &retSize);
        printf("Random Point %d: [%f, %f]\n", i + 1, point[0], point[1]);
        free(point);
    }

    solutionFree(obj);
    return 0;
}

/**
 *
 * Time complexity is O(1)
 * Spce complexity is O(1)
 *
 */