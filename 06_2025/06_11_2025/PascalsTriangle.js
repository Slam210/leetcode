/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (numRows === 0) return [];

  const result = [[1]];

  for (let i = 1; i < numRows; i++) {
    const prevRow = result[i - 1];
    const currRow = [];

    currRow.push(1);
    for (let j = 1; j < i; j++) {
      currRow.push(prevRow[j - 1] + prevRow[j]);
    }
    currRow.push(1);

    result.push(currRow);
  }

  return result;
};

console.log(generate(7));
