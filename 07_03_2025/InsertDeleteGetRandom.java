
/**
 * 
 * To implement a RandomizedSet with O(1) average time complexity for all operations
 * insert, remove, and getRandom, we combine the power of a HashMap for O(1) lookups
 * of elements and a List for O(1) access by index and to allow random access 
 * 
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class InsertDeleteGetRandom {
    public static class RandomizedSet {
        private List<Integer> list;
        private Map<Integer, Integer> map;
        private Random rand;

        public RandomizedSet() {
            list = new ArrayList<>();
            map = new HashMap<>();
            rand = new Random();
        }

        public boolean insert(int val) {
            if (map.containsKey(val))
                return false;
            list.add(val);
            map.put(val, list.size() - 1);
            return true;
        }

        public boolean remove(int val) {
            if (!map.containsKey(val))
                return false;

            int index = map.get(val);
            int lastVal = list.get(list.size() - 1);

            list.set(index, lastVal);
            map.put(lastVal, index);

            list.remove(list.size() - 1);
            map.remove(val);
            return true;
        }

        public int getRandom() {
            int randomIndex = rand.nextInt(list.size());
            return list.get(randomIndex);
        }
    }

    /**
     * Your RandomizedSet object will be instantiated and called as such:
     * RandomizedSet obj = new RandomizedSet();
     * boolean param_1 = obj.insert(val);
     * boolean param_2 = obj.remove(val);
     * int param_3 = obj.getRandom();
     */

    public static void main(String[] args) {
        RandomizedSet obj = new RandomizedSet();
        System.out.println(obj.insert(1));
        System.out.println(obj.insert(2));
        System.out.println(obj.insert(1));
        System.out.println(obj.remove(1));
        System.out.println(obj.remove(3));
        System.out.println(obj.getRandom());
    }
}

/**
 * 
 * Average O(1) time complexity
 * O(n) space complexity if all 3 functions
 * 
 */