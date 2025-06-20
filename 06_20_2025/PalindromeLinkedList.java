/*
 * 
 * A linked list is a palindrome if the sequence of its values reads the same forward and backward. 
 * However, since it’s a singly linked list, we cannot traverse backward. To get around this we 
 * use the two-pointer technique to find the middle of the list. Reverse the second half of the list. 
 * Compare the first half and the reversed second half.
 * 
 */

public class PalindromeLinkedList {
    public static void main(String[] args) {
        ListNode n4 = new ListNode(1);
        ListNode n3 = new ListNode(2, n4);
        ListNode n2 = new ListNode(2, n3);
        ListNode n1 = new ListNode(1, n2);

        Solution solution = new Solution();
        System.out.println("Is Palindrome? " + solution.isPalindrome(n1)); // true
    }
}

class ListNode {
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
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null)
            return true;

        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode secondHalfStart = reverse(slow);

        ListNode firstHalfStart = head;

        while (secondHalfStart != null) {
            if (firstHalfStart.val != secondHalfStart.val) {
                return false;
            }
            firstHalfStart = firstHalfStart.next;
            secondHalfStart = secondHalfStart.next;
        }

        return true;
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }

}

/*
 * 
 * Run time is O(n)
 * Space complexity is O(1)
 * 
 */