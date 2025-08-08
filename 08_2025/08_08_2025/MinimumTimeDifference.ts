/**
 *
 * Each time point can be mapped to the total number of minutes from 00:00. Once converted, the problem
 * reduces to finding the smallest difference between any two time points, accounting for the wrap-around
 * at midnight. By sorting the list of minute values, we can easily find the smallest gap between adjacent
 * times, also checking the gap between the last and first times across midnight.
 *
 */

function findMinDifference(timePoints: string[]): number {
  function toMinutes(time: string): number {
    const [hh, mm] = time.split(":").map(Number);
    return hh * 60 + mm;
  }

  const minutesArr = timePoints.map(toMinutes).sort((a, b) => a - b);

  let minDiff = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < minutesArr.length - 1; i++) {
    minDiff = Math.min(minDiff, minutesArr[i + 1] - minutesArr[i]);
  }

  const wrapDiff = minutesArr[0] + 1440 - minutesArr[minutesArr.length - 1];
  minDiff = Math.min(minDiff, wrapDiff);

  return minDiff;
}

function main(): void {
  console.log(findMinDifference(["23:59", "00:00"]));
  console.log(findMinDifference(["01:01", "02:01", "03:00"]));
}

main();

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 *
 */
