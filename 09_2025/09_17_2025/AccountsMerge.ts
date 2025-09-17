/**
 *
 * We want to merge accounts that share common emails. By modeling emails as nodes in a graph, where edges connect
 * emails belonging to the same account, we can reduce the problem to finding connected components. Once we have
 * connected components, each one represents all the emails of a unique person. We then map the emails back to the
 * name and return the merged account with sorted emails.
 *
 */

export default function accountsMerge(accounts: string[][]): string[][] {
  let emailGraph: Map<string, Set<string>> = new Map();
  let emailToName: Map<string, string> = new Map();

  for (let account of accounts) {
    const name = account[0];
    for (let i = 1; i < account.length; i++) {
      const email = account[i];
      emailToName.set(email, name);

      if (!emailGraph.has(email)) {
        emailGraph.set(email, new Set());
      }
      if (i > 1) {
        const prevEmail = account[i - 1];
        emailGraph.get(email)!.add(prevEmail);
        emailGraph.get(prevEmail)!.add(email);
      }
    }
  }

  let visited = new Set<string>();
  let result: string[][] = [];

  function dfs(email: string, component: string[]) {
    visited.add(email);
    component.push(email);
    for (let neighbor of emailGraph.get(email) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    }
  }

  for (let email of emailToName.keys()) {
    if (!visited.has(email)) {
      let component: string[] = [];
      dfs(email, component);
      component.sort();
      result.push([emailToName.get(email)!, ...component]);
    }
  }

  return result;
}

function main() {
  const accounts = [
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["John", "johnnybravo@mail.com"],
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["Mary", "mary@mail.com"],
  ];
  console.log(accountsMerge(accounts));
}

main();
