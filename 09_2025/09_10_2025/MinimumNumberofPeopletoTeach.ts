/**
 *
 * We identify which friendships fail and collect all users involved in those failing friendships.
 * Then, for each candidate language, we count how many of those bad users already know it.
 * If many already know a language, fewer users need teaching, so we pick the language that maximizes
 * the number of bad users who already know it, and teach that language to the remaining bad users.
 * This gives the minimum number of users to teach.
 *
 */

function minimumTeachings(
  n: number,
  languages: number[][],
  friendships: number[][]
): number {
  const m = languages.length;
  const userLangSets: Set<number>[] = new Array(m);
  for (let i = 0; i < m; i++) {
    userLangSets[i] = new Set(languages[i]);
  }

  const badUsers = new Set<number>();
  for (const pair of friendships) {
    const [u1, v1] = pair;
    const a = u1 - 1;
    const b = v1 - 1;
    if (a < 0 || a >= m || b < 0 || b >= m) continue;

    const setA = userLangSets[a];
    const setB = userLangSets[b];

    let hasCommon = false;
    if (setA.size <= setB.size) {
      for (const lang of setA) {
        if (setB.has(lang)) {
          hasCommon = true;
          break;
        }
      }
    } else {
      for (const lang of setB) {
        if (setA.has(lang)) {
          hasCommon = true;
          break;
        }
      }
    }

    if (!hasCommon) {
      badUsers.add(a);
      badUsers.add(b);
    }
  }

  if (badUsers.size === 0) return 0;

  const counts = new Array<number>(n + 1).fill(0);
  for (const user of badUsers) {
    for (const lang of userLangSets[user]) {
      if (typeof lang === "number" && lang >= 1 && lang <= n) {
        counts[lang]++;
      }
    }
  }

  let maxKnown = 0;
  for (let lang = 1; lang <= n; lang++) {
    if (counts[lang] > maxKnown) maxKnown = counts[lang];
  }

  return badUsers.size - maxKnown;
}

function main(): void {
  const cases = [
    {
      n: 2,
      languages: [[1], [2], [1, 2]],
      friendships: [
        [1, 2],
        [1, 3],
        [2, 3],
      ],
      expected: 1,
    },
    {
      n: 3,
      languages: [[2], [1, 3], [1, 2], [3]],
      friendships: [
        [1, 4],
        [1, 2],
        [3, 4],
        [2, 3],
      ],
      expected: 1,
    },
    {
      n: 3,
      languages: [
        [1, 2],
        [2, 3],
        [1, 3],
      ],
      friendships: [
        [1, 2],
        [1, 3],
        [2, 3],
      ],
      expected: 0,
    },
    {
      n: 3,
      languages: [[1], [2], [3]],
      friendships: [
        [1, 2],
        [2, 3],
        [1, 3],
      ],
      expected: 2,
    },
  ];

  for (const [i, c] of cases.entries()) {
    const result = minimumTeachings(c.n, c.languages, c.friendships);
    console.log(`Case ${i + 1}: result=${result}, expected=${c.expected}`);
  }
}

main();

/**
 *
 * Time complexity is O(m*K + F*K) where F is number of friendships
 * Space complexity is O(m*K) where m is number of users and K is average number of languages known per user
 *
 */
