
/**
 * 
 * We have n rooms labeled 0 to n-1. Given meetings[i] = [starti, endi], each meeting is scheduled 
 * during [starti, endi). Meetings are scheduled such that if a room is free, pick the one with 
 * the smallest number. If all rooms are busy, delay the meeting until the earliest room becomes 
 * available. Delayed meetings keep their original durations. When scheduling delayed meetings, 
 * use original starti for priority. Our goal is to return the room that hosted the most meetings.
 * This is a priority queue simulation problem. We use a min-heap to manage when rooms become free.
 * We use another min-heap to manage free room IDs. Meetings must be processed in order of their 
 * original start time. When all rooms are full, wait until the earliest one becomes available, and 
 * delay the meeting. Track meeting counts per room.
 * 
 */

import java.util.*;

public class MeetingRoomsIII {
    static class Solution {
        public int mostBooked(int n, int[][] meetings) {
            Arrays.sort(meetings, Comparator.comparingInt(a -> a[0]));

            PriorityQueue<Integer> available = new PriorityQueue<>();
            for (int i = 0; i < n; i++)
                available.add(i);

            PriorityQueue<long[]> occupied = new PriorityQueue<>(
                    (a, b) -> a[0] == b[0] ? Long.compare(a[1], b[1]) : Long.compare(a[0], b[0]));

            int[] count = new int[n];

            for (int[] meeting : meetings) {
                int start = meeting[0], end = meeting[1];

                while (!occupied.isEmpty() && occupied.peek()[0] <= start) {
                    available.add((int) occupied.poll()[1]);
                }

                if (!available.isEmpty()) {
                    int room = available.poll();
                    occupied.add(new long[] { end, room });
                    count[room]++;
                } else {
                    long[] roomInfo = occupied.poll();
                    long endTime = roomInfo[0];
                    int room = (int) roomInfo[1];
                    long duration = end - start;
                    occupied.add(new long[] { endTime + duration, room });
                    count[room]++;
                }
            }

            int maxRoom = 0;
            for (int i = 1; i < n; i++) {
                if (count[i] > count[maxRoom])
                    maxRoom = i;
            }

            return maxRoom;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[][] meetings1 = { { 0, 10 }, { 1, 5 }, { 2, 7 }, { 3, 4 } };
        System.out.println(sol.mostBooked(2, meetings1)); 

        int[][] meetings2 = { { 1, 20 }, { 2, 10 }, { 3, 5 }, { 4, 9 }, { 6, 8 } };
        System.out.println(sol.mostBooked(3, meetings2));
    }
}

/**
 * 
 * Run time is O(m log(m)) where m is the number of meetings
 * Space complexity is O(m + n)
 * 
 */