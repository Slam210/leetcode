/**
 * 
 * We’re given an integer eventTime which is the total time of an event. Two arrays, 
 * startTime and endTime of length n, representing n non-overlapping, sorted meetings. 
 * An integer k which is the number of consecutive meetings we’re allowed to reschedule. 
 * We need to return the maximum possible continuous free time within the event after 
 * rescheduling at most k meetings. Meetings are spread over time and occupy space. Moving a 
 * group of k meetings lets us compress their time usage. You check each possible window of k 
 * consecutive meetings. Measure the original time span they occupy. Subtract how much time
 * they actually take. The freed space is span - occupied. Keep track of the maximum freed 
 * block found this way
 * 
 */

function maxFreeTime(
  eventTime: number,
  k: number,
  startTime: number[],
  endTime: number[]
): number {
  const count = startTime.length;
  const prefixSum = new Array(count + 1).fill(0);
  let maxFree = 0;

  // Compute prefix sum of meeting durations
  for (let i = 0; i < count; i++) {
    prefixSum[i + 1] = prefixSum[i] + (endTime[i] - startTime[i]);
  }

  // Slide window of size k
  for (let i = k - 1; i < count; i++) {
    const occupied = prefixSum[i + 1] - prefixSum[i - k + 1];

    const windowStart = i === k - 1 ? 0 : endTime[i - k];
    const windowEnd = i === count - 1 ? eventTime : startTime[i + 1];

    const freeTime = windowEnd - windowStart - occupied;
    maxFree = Math.max(maxFree, freeTime);
  }

  return maxFree;
}
  
/**
 * 
 * Time compleixty is O(n)
 * Space compleixty is O(n)
 * 
 */