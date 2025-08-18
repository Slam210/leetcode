/**
 *
 * We’re given an expression like "-1/2+1/2+1/3". Each piece is a fraction of form ±numerator/denominator.
 * We must evaluate and return an irreducible fraction. The intuition is to parse each fraction with its
 * sign and add fractions one by one.
 *
 */

function fractionAddition(expression: string): string {
  // Greatest Common Divisor
  function gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  }

  let num = 0;
  let den = 1;

  const regex = /[+-]?\d+\/\d+/g;
  const fractions = expression.match(regex)!;

  for (const frac of fractions) {
    const [nStr, dStr] = frac.split("/");
    const n = parseInt(nStr, 10);
    const d = parseInt(dStr, 10);

    num = num * d + n * den;
    den = den * d;

    const g = gcd(num, den);
    num /= g;
    den /= g;
  }

  if (den < 0) {
    num = -num;
    den = -den;
  }

  return `${num}/${den}`;
}

/**
 *
 * Time complexity is O(k)
 * Space complexity is O(1)
 *
 */
