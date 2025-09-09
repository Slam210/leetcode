/**
 *
 * We are asked to compute the total importance of an employee and all of their subordinates. This is equivalent to traversing a hierarchy graph
 * where each employee is a node with importance, and edges connect to their subordinates. Starting from the target employee, we explore their
 * entire subordinate tree using DFS or BFS, ensuring we visit each employee exactly once and accumulate their importance values. This way, we
 * capture both direct and indirect contributions to the total.
 *
 */

class Employee {
  id: number;
  importance: number;
  subordinates: number[];
  constructor(id: number, importance: number, subordinates: number[]) {
    this.id = id === undefined ? 0 : id;
    this.importance = importance === undefined ? 0 : importance;
    this.subordinates = subordinates === undefined ? [] : subordinates;
  }
}

function getImportance(employees: Employee[], id: number): number {
  const map = new Map<number, Employee>();
  for (const emp of employees) {
    map.set(emp.id, emp);
  }

  function dfs(empId: number): number {
    const emp = map.get(empId)!;
    let total = emp.importance;
    for (const subId of emp.subordinates) {
      total += dfs(subId);
    }
    return total;
  }

  return dfs(id);
}

function main() {
  const employees = [
    new Employee(1, 5, [2, 3]),
    new Employee(2, 3, []),
    new Employee(3, 3, []),
  ];
  console.log(getImportance(employees, 1));

  const employees2 = [
    new Employee(1, 15, [2]),
    new Employee(2, 10, [3]),
    new Employee(3, 5, []),
  ];
  console.log(getImportance(employees2, 1));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
