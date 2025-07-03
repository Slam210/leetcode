
/**
 * 
 * This is essentially a string parser that builds a nested data structure using the NestedInteger interface.
 * If the string is just a number like "42" we return a NestedInteger holding that number.
 * If the string starts with '[' we use a stack to track nesting as you parse.
 * 
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class MiniParser {
    /**
     * // This is the interface that allows for creating nested lists.
     * // You should not implement it, or speculate about its implementation
     * public interface NestedInteger {
     * // Constructor initializes an empty nested list.
     * public NestedInteger();
     *
     * // Constructor initializes a single integer.
     * public NestedInteger(int value);
     *
     * // @return true if this NestedInteger holds a single integer, rather than a
     * nested list.
     * public boolean isInteger();
     *
     * // @return the single integer that this NestedInteger holds, if it holds a
     * single integer
     * // Return null if this NestedInteger holds a nested list
     * public Integer getInteger();
     *
     * // Set this NestedInteger to hold a single integer.
     * public void setInteger(int value);
     *
     * // Set this NestedInteger to hold a nested list and adds a nested integer to
     * it.
     * public void add(NestedInteger ni);
     *
     * // @return the nested list that this NestedInteger holds, if it holds a
     * nested list
     * // Return empty list if this NestedInteger holds a single integer
     * public List<NestedInteger> getList();
     * }
     */

    public static class NestedInteger {
        private Integer value;
        private List<NestedInteger> list;

        public NestedInteger() {
            list = new ArrayList<>();
        }

        public NestedInteger(int value) {
            this.value = value;
        }

        public boolean isInteger() {
            return value != null;
        }

        public Integer getInteger() {
            return value;
        }

        public void setInteger(int value) {
            this.value = value;
            this.list = null;
        }

        public void add(NestedInteger ni) {
            if (list == null) {
                list = new ArrayList<>();
            }
            list.add(ni);
        }

        public List<NestedInteger> getList() {
            return list != null ? list : new ArrayList<>();
        }

        @Override
        public String toString() {
            if (isInteger())
                return value.toString();
            return list.toString();
        }
    }

    class Solution {
        public NestedInteger deserialize(String s) {
            if (s == null || s.isEmpty())
                return null;

            if (s.charAt(0) != '[') {
                return new NestedInteger(Integer.parseInt(s));
            }

            Stack<NestedInteger> stack = new Stack<>();
            NestedInteger curr = null;
            int l = 0;

            for (int r = 0; r < s.length(); r++) {
                char ch = s.charAt(r);

                if (ch == '[') {
                    if (curr != null) {
                        stack.push(curr);
                    }
                    curr = new NestedInteger();
                    l = r + 1;

                } else if (ch == ']') {
                    String num = s.substring(l, r).trim();
                    if (!num.isEmpty()) {
                        curr.add(new NestedInteger(Integer.parseInt(num)));
                    }
                    if (!stack.isEmpty()) {
                        NestedInteger parent = stack.pop();
                        parent.add(curr);
                        curr = parent;
                    }
                    l = r + 1;

                } else if (ch == ',') {
                    if (s.charAt(r - 1) != ']') {
                        String num = s.substring(l, r).trim();
                        if (!num.isEmpty()) {
                            curr.add(new NestedInteger(Integer.parseInt(num)));
                        }
                    }
                    l = r + 1;
                }
            }

            return curr;
        }
    }

    public static void main(String[] args) {
        MiniParser outer = new MiniParser();
        Solution sol = outer.new Solution();

        String input1 = "324";
        String input2 = "[123,[456,[789]]]";

        System.out.println("Parsed 1: " + sol.deserialize(input1));
        System.out.println("Parsed 2: " + sol.deserialize(input2));
    }
}

/**
 * 
 * Time complexity is O(n)
 * Space complexitu is O(d) which is the depth of nesting
 * 
 */