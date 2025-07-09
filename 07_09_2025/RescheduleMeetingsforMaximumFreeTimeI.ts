/**
 * 
 * We’re given an integer eventTime which is the total time of an event. Two arrays, 
 * startTime and endTime of length n, representing n non-overlapping, sorted meetings. 
 * An integer k which is the number of consecutive meetings we’re allowed to reschedule. 
 * We need to return the maximum possible continuous free time within the event after 
 * rescheduling at most k meetings. The total occupied time of meetings is fixed. To maximize 
 * free time, we want to shift a window of k meetings into a tight block, and then see where 
 * this opens the largest contiguous block of time elsewhere. So we’ll compute prefix sums of 
 * meeting durations. For every possible window of k consecutive meetings, we’ll imagine moving 
 * them together and calculate the new schedule. This includes total meeting time inside window, 
 * range they originally spanned, and free time gained = original span - duration. The rest of the 
 * meetings stay where they are. Total free time = eventTime - totalMeetingTime, but we want the 
 * largest single free slot we can get by compacting k meetings.
 * 
 */

function maxFreeTime(
  eventTime: number,
  k: number,
  startTime: number[],
  endTime: number[]
): number {
  const n = startTime.length;

  // Compute durations
  const durations = startTime.map((s, i) => endTime[i] - s);

  // Prefix sum of durations
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + durations[i];
  }

  const totalMeetingTime = prefix[n];
  let maxFreeGain = 0;

  // Sliding window of size k
  for (let l = 0; l <= n - k; l++) {
    const r = l + k - 1;
    const totalDuration = prefix[r + 1] - prefix[l];
    const span = endTime[r] - startTime[l];
    const freeGain = span - totalDuration;
    maxFreeGain = Math.max(maxFreeGain, freeGain);
  }

  const totalFreeTime = eventTime - totalMeetingTime;
  return maxFreeGain + totalFreeTime;
}

/**
 * 
 * Time compleixty is O(n)
 * Space compleixty is O(n)
 * 
 */