/*
 * @lc app=leetcode id=802 lang=typescript
 *
 * [802] Find Eventual Safe States
 */
// @lc code=start
function eventualSafeNodes(graph: number[][]): number[] {
    const n = graph.length;

    const state = new Array(n).fill(0);

    function dfs(node: number): boolean {
        if (state[node] === 1) return false;
        if (state[node] === 2) return true;
        if (state[node] === 3) return false;

        state[node] = 1;

        for (const neighbor of graph[node]) {
            if (!dfs(neighbor)) {
                state[node] = 3;
                return false;
            }
        }

        state[node] = 2;
        return true;
    }

    const result: number[] = [];

    for (let i = 0; i < n; i++) {
        if (dfs(i)) {
            result.push(i);
        }
    }

    return result;
};
// @lc code=end