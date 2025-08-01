
/**
 * 
 * To support duplicates while maintaining O(1) average time complexity for insert, 
 * remove, and getRandom, the intuition is to combine the strengths of a list and a map. 
 * The list allows us to retrieve random elements uniformly and in constant time, 
 * while the map (specifically, a HashMap of value-to-set-of-indices) tracks all 
 * positions of each value in the list—even when duplicates exist. On insertion, we 
 * simply add the value to the list and record its index in the map. For deletion, we 
 * remove one occurrence by swapping it with the last element in the list and updating 
 * both the list and the map accordingly. This clever use of index tracking and in-place 
 * element swapping ensures that no matter how many duplicates exist, we can always 
 * maintain constant-time operations.
 * 
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

public class InsertDeleteGetRandomDuplicatesallowed {
    public static class RandomizedCollection {
        private List<Integer> list;
        private Map<Integer, Set<Integer>> valToIndices;
        private Random rand;

        public RandomizedCollection() {
            list = new ArrayList<>();
            valToIndices = new HashMap<>();
            rand = new Random();
        }

        public boolean insert(int val) {
            boolean notPresent = !valToIndices.containsKey(val);
            valToIndices.putIfAbsent(val, new HashSet<>());
            list.add(val);
            valToIndices.get(val).add(list.size() - 1);
            return notPresent;
        }

        public boolean remove(int val) {
            if (!valToIndices.containsKey(val) || valToIndices.get(val).isEmpty()) {
                return false;
            }

            int idxToRemove = valToIndices.get(val).iterator().next();
            valToIndices.get(val).remove(idxToRemove);

            int lastVal = list.get(list.size() - 1);
            int lastIdx = list.size() - 1;

            list.set(idxToRemove, lastVal);
            valToIndices.get(lastVal).add(idxToRemove);
            valToIndices.get(lastVal).remove(lastIdx);

            list.remove(lastIdx);

            if (valToIndices.get(val).isEmpty()) {
                valToIndices.remove(val);
            }

            return true;
        }

        public int getRandom() {
            return list.get(rand.nextInt(list.size()));
        }

    }

    public static void main(String[] args) {
        RandomizedCollection obj = new RandomizedCollection();
        System.out.println(obj.insert(1));
        System.out.println(obj.insert(1));
        System.out.println(obj.insert(2));
        System.out.println(obj.getRandom());
        System.out.println(obj.remove(1));
        System.out.println(obj.getRandom());
    }
}

/**
 * 
 * Time complexity is O(1) average
 * Space complexity is O(n)
 * 
 */