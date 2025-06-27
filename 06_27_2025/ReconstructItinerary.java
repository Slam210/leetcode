
/**
 * 
 * We're given a list of tickets as [from, to] airport pairs. We must Start at "JFK" Use all tickets exactly once 
 * to form a valid itinerary Among all valid itineraries, return the lexicographically smallest.
 * We can model the problem as a directed multigraph and use Hierholzer’s algorithm to find an Eulerian path 
 * Since we need to ensure lexical order, we use a priority queue to store the destination airports 
 * for each departure point.
 * 
 */

import java.util.*;

public class ReconstructItinerary {

    static class Solution {
        private Map<String, PriorityQueue<String>> graph = new HashMap<>();
        private LinkedList<String> itinerary = new LinkedList<>();

        public List<String> findItinerary(List<List<String>> tickets) {
            for (List<String> ticket : tickets) {
                String from = ticket.get(0), to = ticket.get(1);
                graph.computeIfAbsent(from, k -> new PriorityQueue<>()).add(to);
            }

            dfs("JFK");

            return itinerary;
        }

        private void dfs(String airport) {
            PriorityQueue<String> destinations = graph.get(airport);
            while (destinations != null && !destinations.isEmpty()) {
                String next = destinations.poll();
                dfs(next);
            }
            itinerary.addFirst(airport);
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        List<List<String>> tickets = Arrays.asList(
                Arrays.asList("MUC", "LHR"),
                Arrays.asList("JFK", "MUC"),
                Arrays.asList("SFO", "SJC"),
                Arrays.asList("LHR", "SFO"));
        List<String> itinerary = sol.findItinerary(tickets);
        System.out.println("Itinerary: " + itinerary);
    }
}
