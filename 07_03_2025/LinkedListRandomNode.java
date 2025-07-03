
/**
 * 
 * When we don’t know the length of the stream/list in advance and want to 
 * randomly select 1 item with equal probability, Reservoir Sampling ensures 
 * each item has equal chance (1/n).
 * 
 */

import java.util.Random;

public class LinkedListRandomNode {
    public static class ListNode {
        int val;
        ListNode next;

        ListNode() {
        }

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

    static class Solution {
        private ListNode head;
        private Random rand;

        public Solution(ListNode head) {
            this.head = head;
            this.rand = new Random();
        }

        public int getRandom() {
            int result = head.val;
            ListNode current = head.next;
            int i = 2;

            while (current != null) {
                if (rand.nextInt(i) == 0) {
                    result = current.val;
                }
                current = current.next;
                i++;
            }

            return result;
        }
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1, new ListNode(2, new ListNode(3)));
        Solution obj = new Solution(head);

        for (int i = 0; i < 10; i++) {
            System.out.println(obj.getRandom());
        }
    }
}