/*
 * 
 * The intuition behind this is to use 2 stacks. stackIn is used for enqueue while
 * stackOut is used for dequeue. When pushing, just add to stackIn. When popping 
 * or peeking, if stackOut is empty, move all elements from stackIn to stackOut. 
 * Then pop or peek from stackOut.
 * 
 */

import java.util.Stack;

public class ImplementQueueusingStacks {
    public static class MyQueue {

        private Stack<Integer> stackIn;
        private Stack<Integer> stackOut;

        public MyQueue() {
            stackIn = new Stack<>();
            stackOut = new Stack<>();
        }

        public void push(int x) {
            stackIn.push(x);
        }

        public int pop() {
            if (stackOut.isEmpty()) {
                while (!stackIn.isEmpty()) {
                    stackOut.push(stackIn.pop());
                }
            }
            return stackOut.pop();
        }

        public int peek() {
            if (stackOut.isEmpty()) {
                while (!stackIn.isEmpty()) {
                    stackOut.push(stackIn.pop());
                }
            }
            return stackOut.peek();
        }

        public boolean empty() {
            return stackIn.isEmpty() && stackOut.isEmpty();
        }

    }

    /**
     * Your MyQueue object will be instantiated and called as such:
     * MyQueue obj = new MyQueue();
     * obj.push(x);
     * int param_2 = obj.pop();
     * int param_3 = obj.peek();
     * boolean param_4 = obj.empty();
     */

    public static void main(String[] args) {
        MyQueue queue = new MyQueue();
        queue.push(1);
        queue.push(2);
        System.out.println(queue.peek());
        System.out.println(queue.pop());
        System.out.println(queue.empty());
    }
}

/*
 * 
 * Run time is O(1) for push/empty while O(n) in the worst case of pop/peek
 * Space complexity is O(n) for stacks store a total of n elements
 * 
 */