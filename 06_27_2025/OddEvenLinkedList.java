/**
 * 
 * Given a linked list, return the list such that the odd indexed nodes are in
 * the front while the even indexed are behind. Maintain relative order. The
 * idea behind this problem is to use two lists, linking them at the end.
 * 
 */

public class OddEvenLinkedList {
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

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode() {}
     * ListNode(int val) { this.val = val; }
     * ListNode(int val, ListNode next) { this.val = val; this.next = next; }
     * }
     */
    public static class Solution {
        public ListNode oddEvenList(ListNode head) {
            if (head == null || head.next == null) {
                return head;
            }

            ListNode even = head.next;
            ListNode odd = head;
            ListNode evenHead = even;

            while (even != null && even.next != null) {
                odd.next = even.next;
                odd = odd.next;
                even.next = odd.next;
                even = even.next;
            }

            odd.next = evenHead;
            return head;
        }

        public static void printList(ListNode head) {
            ListNode curr = head;
            while (curr != null) {
                System.out.print(curr.val + (curr.next != null ? " → " : ""));
                curr = curr.next;
            }
            System.out.println();
        }

        public static void main(String[] args) {
            ListNode node5 = new ListNode(5);
            ListNode node4 = new ListNode(4, node5);
            ListNode node3 = new ListNode(3, node4);
            ListNode node2 = new ListNode(2, node3);
            ListNode head = new ListNode(1, node2);

            Solution solution = new Solution();
            System.out.print("Original List: ");
            printList(head);

            ListNode result = solution.oddEvenList(head);
            System.out.print("Modified List: ");
            printList(result);
        }
    }
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(1)
 * 
 */