/*

We’re given numCourses courses and their prerequisite relationships. 
We want to determine if it’s possible to take all courses without running into a circular dependency.
This is equivalent to checking whether a directed graph has a cycle:  
Courses are nodes. Prerequisites are directed edges. 
If there's a cycle, at least one course depends on itself indirectly, so it's impossible to finish all.
If the graph is acyclic (no cycle) → return true 
If the graph has a cycle → return false  
We can use Kahn’s Algorithm for cycle detection.

*/

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: Map<number, number[]> = new Map();
  const inDegree: number[] = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    if (!graph.has(prereq)) graph.set(prereq, []);
    graph.get(prereq)!.push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let taken = 0;
  while (queue.length > 0) {
    const course = queue.shift()!;
    taken++;

    if (graph.has(course)) {
      for (const next of graph.get(course)!) {
        inDegree[next]--;
        if (inDegree[next] === 0) {
          queue.push(next);
        }
      }
    }
  }

  return taken === numCourses;
}

const numCourses = 4;
const prerequisites = [
  [1, 0],
  [2, 1],
  [3, 2],
];
console.log(canFinish(numCourses, prerequisites));

const cyclicPrereqs = [
  [1, 0],
  [0, 1],
];
console.log(canFinish(2, cyclicPrereqs));

/*

Run time is O(V + E)
Space complexity is O(V + E)

*/
