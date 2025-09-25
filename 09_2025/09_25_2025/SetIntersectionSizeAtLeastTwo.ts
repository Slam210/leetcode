/**
 *
 * When approaching this problem, we recognize it as a greedy optimization task.
 * We want to ensure that each interval has at least two numbers while minimizing
 * the overall count. By sorting the intervals by their end values, we strategically
 * pick numbers at the latest possible positions so that they are likely to overlap
 * with subsequent intervals. This allows us to satisfy multiple intervals at once
 * and avoid unnecessary picks. In this way, we balance the requirement of coverage
 * with the goal of keeping the set size small.
 *
 */

function intersectionSizeTwo(intervals: number[][]): number {
  // Sort intervals by end asc, start desc
  intervals.sort((a, b) => {
    if (a[1] === b[1]) return b[0] - a[0];
    return a[1] - b[1];
  });

  let chosen: number[] = [];

  // Process each interval
  for (let [start, end] of intervals) {
    // Count how many chosen numbers fall inside the inverval
    let count = chosen.filter((x) => x >= start && x <= end).length;

    // Add numbers starting from end backwards
    for (let x = end; count < 2; x--) {
      if (!chosen.includes(x)) {
        chosen.push(x);
        count++;
      }
    }
  }

  return chosen.length;
}

function main() {
  const test1 = [
    [1, 3],
    [3, 7],
    [8, 9],
  ];
  const test2 = [
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 5],
  ];
  const test3 = [
    [1, 2],
    [2, 3],
    [2, 4],
    [4, 5],
  ];

  console.log(intersectionSizeTwo(test1));
  console.log(intersectionSizeTwo(test2));
  console.log(intersectionSizeTwo(test3));
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(n)
 *
 */
