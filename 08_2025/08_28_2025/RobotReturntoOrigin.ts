function judgeCircle(moves: string): boolean {
  let x = 0,
    y = 0;

  for (const move of moves) {
    if (move === "R") x++;
    else if (move === "L") x--;
    else if (move === "U") y++;
    else if (move === "D") y--;
  }

  return x === 0 && y === 0;
}

function main() {
  console.log(judgeCircle("UD"));
  console.log(judgeCircle("LL"));
  console.log(judgeCircle("RRDD"));
  console.log(judgeCircle("UDLR"));
}

main();
