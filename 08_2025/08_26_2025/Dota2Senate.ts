/**
 *
 * We want to determine which party wins after repeatedly banning opponents until only one party remains.
 * Because rounds are cyclical and senators reappear in later rounds, we can simulate the process using queues.
 * Each queue stores the indices of senators from one party. In each step, the senator with the smaller index acts first,
 * bans one opponent, and re-enters the queue at position index + n to represent wrapping into the next round. We repeat
 * this until one queue is empty, meaning all opponents are banned, and the winner can be declared.
 *
 */

function predictPartyVictory(senate: string): string {
  let radiant: number[] = [];
  let dire: number[] = [];

  for (let i = 0; i < senate.length; i++) {
    if (senate[i] === "R") radiant.push(i);
    else dire.push(i);
  }

  while (radiant.length > 0 && dire.length > 0) {
    const rIndex = radiant.shift()!;
    const dIndex = dire.shift()!;

    if (rIndex < dIndex) {
      radiant.push(rIndex + senate.length);
    } else {
      dire.push(dIndex + senate.length);
    }
  }

  return radiant.length > 0 ? "Radiant" : "Dire";
}

function main() {
  console.log(predictPartyVictory("RD"));
  console.log(predictPartyVictory("RDD"));
  console.log(predictPartyVictory("RRDDD"));
  console.log(predictPartyVictory("DRRDR"));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
