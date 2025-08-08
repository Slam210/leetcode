/**
 *
 * A complex number in the form "a+bi" can be multiplied using the formula (a + bi) * (c + di) = (a*c - b*d) + (a*d + b*c)i.
 * The task is to parse the input strings to extract a and b from each number, compute the real and imaginary parts separately
 * using integer arithmetic, and return the result in the same "real+imaginaryi" format. Since the real and imaginary parts are
 * guaranteed to be integers, this becomes a straightforward parsing and arithmetic problem.
 *
 */

function complexNumberMultiply(num1: string, num2: string): string {
  function parseComplex(num: string): [number, number] {
    const [realStr, imagStr] = num.split("+");
    const real = parseInt(realStr, 10);
    const imag = parseInt(imagStr.slice(0, -1), 10);
    return [real, imag];
  }

  const [a, b] = parseComplex(num1);
  const [c, d] = parseComplex(num2);

  const real = a * c - b * d;
  const imag = a * d + b * c;

  return `${real}+${imag}i`;
}

function main(): void {
  console.log(complexNumberMultiply("1+1i", "1+1i"));
  console.log(complexNumberMultiply("1+-1i", "1+-1i"));
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */
