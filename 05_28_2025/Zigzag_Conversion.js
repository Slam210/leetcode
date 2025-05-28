/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1 || s.length <= numRows) return s;

  const rows = new Array(numRows).fill("");
  let currentRow = 0;
  let goingDown = false;

  // Simulate a zigzag through the use of rows, currentRows to change directions, and goingDown to determine direction
  for (let char of s) {
    rows[currentRow] += char;
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }
    currentRow += goingDown ? 1 : -1;
  }

  return rows.join("");
};

const word = "PAYPALISHIRING";
const result = convert(word, 3);
console.log(result);
