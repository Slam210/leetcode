
/**
 * 
 * We're given two linked lists l1 and l2 where each node contains a single digit. The digits are 
 * stored in forward order.  The numbers do not contain leading zeroes, except possibly the number 
 * 0 itself. The goal is to return a new linked list representing the sum of the two numbers, also 
 * in forward order. The challenge here is that addition typically starts from the least significant 
 * digit, but the digits in the lists are ordered from most to least significant. We can approach this 
 * by using stacks to simulate reversing, so we avoid modifying input lists.
 * 
 */

import java.util.Stack;

public class AddTwoNumbersII {

    // Definition for singly-linked list.
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

    class Solution {
        public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
            Stack<Integer> s1 = new Stack<>();
            Stack<Integer> s2 = new Stack<>();

            while (l1 != null) {
                s1.push(l1.val);
                l1 = l1.next;
            }
            while (l2 != null) {
                s2.push(l2.val);
                l2 = l2.next;
            }

            int carry = 0;
            ListNode head = null;

            while (!s1.isEmpty() || !s2.isEmpty() || carry != 0) {
                int x = s1.isEmpty() ? 0 : s1.pop();
                int y = s2.isEmpty() ? 0 : s2.pop();

                int sum = x + y + carry;
                carry = sum / 10;

                ListNode node = new ListNode(sum % 10);
                node.next = head;
                head = node;
            }

            return head;
        }
    }

    public static void main(String[] args) {
        AddTwoNumbersII outer = new AddTwoNumbersII();
        Solution solution = outer.new Solution();

        ListNode l1 = new ListNode(7, new ListNode(2, new ListNode(4, new ListNode(3))));
        ListNode l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

        ListNode result = solution.addTwoNumbers(l1, l2);

        System.out.print("Result: ");
        while (result != null) {
            System.out.print(result.val);
            if (result.next != null)
                System.out.print(" -> ");
            result = result.next;
        }
    }
}

/**
 * 
 * Run time is O(m + n)
 * Space time is O(m + n)
 * 
 */