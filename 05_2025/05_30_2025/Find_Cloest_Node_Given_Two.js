/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function (edges, node1, node2) {
  // Utilize a dfs like function to get distances from node
  const getDistances = (start) => {
    const dist = new Array(edges.length).fill(-1);
    let curr = start,
      d = 0;

    while (curr !== -1 && dist[curr] === -1) {
      dist[curr] = d;
      curr = edges[curr];
      d++;
    }

    return dist;
  };

  const dist1 = getDistances(node1);
  const dist2 = getDistances(node2);

  let minDist = Infinity;
  let result = -1;

  // Loop used to calculate the mimimum distance between two nodes if both nodes come from it
  for (let i = 0; i < edges.length; i++) {
    if (dist1[i] !== -1 && dist2[i] !== -1) {
      let maxDist = Math.max(dist1[i], dist2[i]);
      if (maxDist < minDist) {
        minDist = maxDist;
        result = i;
      } else if (maxDist === minDist && i < result) {
        result = i;
      }
    }
  }

  return result;
};

console.log(closestMeetingNode([2, 2, 3, -1], 0, 1));
