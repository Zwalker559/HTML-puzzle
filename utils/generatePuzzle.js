export default function generatePuzzle(cfg) {
  // SIMPLE RIDDLE
  if (cfg.type === "riddle") {
    return {
      type: "riddle",
      prompt: cfg.prompt,
      check: (input) =>
        cfg.answers.map((a) => a.toLowerCase()).includes(input.toLowerCase())
    };
  }

  // CODE
  if (cfg.type === "code") {
    const code = Array.from({ length: cfg.length }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    return {
      type: "code",
      prompt: `Enter the ${cfg.length}-digit code:`,
      code,
      check: (input) => input === code
    };
  }

  // MATH
  if (cfg.type === "math") {
    const a = Math.floor(Math.random() * 10 * cfg.difficulty);
    const b = Math.floor(Math.random() * 10 * cfg.difficulty);
    const op = Math.random() < 0.5 ? "+" : "-";
    const answer = op === "+" ? a + b : a - b;

    return {
      type: "math",
      prompt: `Solve: ${a} ${op} ${b}`,
      answer,
      check: (input) => parseInt(input, 10) === answer
    };
  }

  // SOLVABLE SLIDING PUZZLE
  if (cfg.type === "sliding") {
    const size = cfg.size || 3;
    let tiles = Array.from({ length: size * size }, (_, i) => i);

    function isSolvable(arr) {
      let inv = 0;
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
        }
      }
      return inv % 2 === 0;
    }

    do {
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    } while (!isSolvable(tiles));

    const checkSolved = (arr) => {
      const solvedA = arr.every((v, i) => v === i);
      const solvedB =
        arr.slice(0, -1).every((v, i) => v === i + 1) &&
        arr[arr.length - 1] === 0;
      return solvedA || solvedB;
    };

    return {
      type: "sliding",
      prompt: "Arrange the tiles into the correct order.",
      tiles,
      size,
      check: checkSolved
    };
  }

  // MULTI-RIDDLE ROOM
  if (cfg.type === "riddleRoom") {
    const riddles = cfg.riddles || [];
    const selected = [];

    for (let i = 0; i < 3; i++) {
      const r = riddles[Math.floor(Math.random() * riddles.length)];
      selected.push(r);
    }

    const code = selected.map((r) => r.digit).join("");

    return {
      type: "riddleRoom",
      riddles: selected,
      code,
      check: (input) => input === code
    };
  }

  // MAZE
  if (cfg.type === "maze") {
    return {
      type: "maze",
      size: cfg.size || 8
    };
  }

  return {
    type: "unknown",
    prompt: "Unknown puzzle type.",
    check: () => false
  };
}
