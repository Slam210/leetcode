/**
 *
 * We must form the powers array containing the minimal number of powers of two that sum to n. That's just the
 * binary decomposition of n as each set bit at position i contributes a value 2^i. powers is sorted non-decreasing.
 * For each query [left, right] we must return the product of the powers[left..right] modulo 10^9+7. Each element of
 * powers is 2^e for some exponent e. The product of several such elements is 2^{sum of those exponents}. So rather
 * than multiplying possibly large numbers repeatedly, we collect the exponents of n into an array so that is the
 * powers in exponent form. We then recompute prefix sums of exponents to get the exponent sum for any query in O(1).
 * Lastly, we compute 2^(exponentSum) mod M using fast modular exponentiation.
 *
 */

const MOD = 1000000007n;

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  base %= mod;
  let result = 1n;
  while (exp > 0n) {
    if ((exp & 1n) === 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}

function buildExponents(n: number): number[] {
  const exps: number[] = [];
  let bn = BigInt(n);
  let idx = 0;
  while (bn > 0n) {
    if ((bn & 1n) === 1n) exps.push(idx);
    bn >>= 1n;
    idx++;
  }
  return exps;
}

function buildPrefix(exps: number[]): bigint[] {
  const prefix: bigint[] = new Array(exps.length + 1);
  prefix[0] = 0n;
  for (let i = 0; i < exps.length; i++) {
    prefix[i + 1] = prefix[i] + BigInt(exps[i]);
  }
  return prefix;
}

function productQueries(n: number, queries: number[][]): number[] {
  const exps = buildExponents(n);
  const prefix = buildPrefix(exps);
  const answers: number[] = [];

  for (const q of queries) {
    const l = q[0],
      r = q[1];
    const expSum = prefix[r + 1] - prefix[l];
    const val = modPow(2n, expSum, MOD);
    answers.push(Number(val));
  }

  return answers;
}

function main(): void {
  const tests: { n: number; queries: number[][] }[] = [
    {
      n: 12,
      queries: [
        [0, 1],
        [0, 0],
      ],
    },
    {
      n: 7,
      queries: [
        [0, 2],
        [1, 1],
        [0, 0],
      ],
    },
    {
      n: 10,
      queries: [
        [0, 0],
        [1, 1],
        [0, 1],
      ],
    },
  ];

  for (const t of tests) {
    console.log("n =", t.n, "queries =", JSON.stringify(t.queries));
    console.log("answers =", productQueries(t.n, t.queries));
    console.log("---");
  }
}

main();

/**
 *
 * Time complexity is O(B + q * log(n)) where B is floor(log2(n)) + 1 and q the number of queries
 * Space complexity is O(log(n)) space
 *
 */
