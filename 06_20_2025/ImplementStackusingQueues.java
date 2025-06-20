/*
 * 
 * The intuition behind this problem is that we have access to 2 queues.
 * When removing elements, we can shift all but one items to the second
 * queue which will allow us to return the last element. Afterward, we
 * set the first queue equal to the second queue and clear it out which will
 * give us the same state but the last item is removed.
 * 
 */

import java.util.LinkedList;
import java.util.Queue;

public class ImplementStackusingQueues {

    public static class MyStack {

        private Queue<Integer> q1;
        private Queue<Integer> q2;

        public MyStack() {
            q1 = new LinkedList<>();
            q2 = new LinkedList<>();
        }
        
        public void push(int x) {
            q1.offer(x);
        }
        
        public int pop() {
            while (q1.size() > 1) {
                q2.offer(q1.poll());
            }
            int top = q1.poll();
            Queue<Integer> temp = q1;
            q1 = q2;
            q2 = temp;
            return top;
        }
        
        public int top() {
            while (q1.size() > 1) {
                q2.offer(q1.poll());
            }
            int top = q1.poll();
            q2.offer(top);
            Queue<Integer> temp = q1;
            q1 = q2;
            q2 = temp;
            return top;
        }
        
        public boolean empty() {
            return q1.isEmpty();
        }
    }
    
    /**
     * Your MyStack object will be instantiated and called as such:
     * MyStack obj = new MyStack();
     * obj.push(x);
     * int param_2 = obj.pop();
     * int param_3 = obj.top();
     * boolean param_4 = obj.empty();
     */

     public static void main(String[] args) {
        MyStack stack = new MyStack();
        stack.push(1);
        stack.push(2);
        System.out.println(stack.top());
        System.out.println(stack.pop());
        System.out.println(stack.empty());
    }
    
}

/*
 * 
 * Time complexity for push/empty is O(1) and pop/top are O(n)
 * Space complexity is O(n) since we use two queues with a total of n elements
 * 
 */