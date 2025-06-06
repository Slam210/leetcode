/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
  const parent = Array(26)
    .fill(0)
    .map((_, i) => i);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX === rootY) return;
    if (rootX < rootY) {
      parent[rootY] = rootX;
    } else {
      parent[rootX] = rootY;
    }
  };

  for (let i = 0; i < s1.length; i++) {
    const charCode1 = s1.charCodeAt(i) - 97;
    const charCode2 = s2.charCodeAt(i) - 97;
    union(charCode1, charCode2);
  }

  let result = "";
  for (const ch of baseStr) {
    const rootChar = String.fromCharCode(find(ch.charCodeAt(0) - 97) + 97);
    result += rootChar;
  }

  return result;
};

console.log(smallestEquivalentString("parker", "morris", "parser"));
