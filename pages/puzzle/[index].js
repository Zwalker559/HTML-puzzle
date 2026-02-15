import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import loadConfig from "../../utils/loadConfig";
import generatePuzzle from "../../utils/generatePuzzle";
import Timer from "../../components/Timer";
import PuzzleUI from "../../components/PuzzleUI";

export default function PuzzlePage() {
  const router = useRouter();
  const { index } = router.query;
  const config = loadConfig();

  const [puzzle, setPuzzle] = useState(null);
  const [input, setInput] = useState("");

  const numericIndex = parseInt(index, 10);

  const resetAll = useCallback(() => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!index) return;

    const orderRaw = sessionStorage.getItem("puzzleOrder");
    if (!orderRaw) {
      resetAll();
      return;
    }

    const order = JSON.parse(orderRaw);
    const idx = numericIndex - 1;
    if (idx < 0 || idx >= order.length) {
      resetAll();
      return;
    }

    const puzzleId = order[idx];

    const cacheRaw = sessionStorage.getItem("puzzleCache");
    const cache = cacheRaw ? JSON.parse(cacheRaw) : {};

    if (cache[puzzleId]) {
      setPuzzle(cache[puzzleId]);
    } else {
      const generated = generatePuzzle(config.puzzles[puzzleId]);
      cache[puzzleId] = generated;
      sessionStorage.setItem("puzzleCache", JSON.stringify(cache));
      setPuzzle(generated);
    }
  }, [index, numericIndex, config.puzzles, resetAll]);

  function goNext() {
    if (numericIndex >= config.puzzles.length) {
      router.push("/final");
    } else {
      router.push(`/puzzle/${numericIndex + 1}`);
    }
  }

  function checkAnswer() {
    if (!puzzle) return;
    if (puzzle.check(input)) {
      goNext();
    }
  }

  function handleSolved() {
    goNext();
  }

  if (!index || !puzzle) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Timer onExpire={resetAll} />
      <h1>Puzzle {index}</h1>
      <PuzzleUI
        puzzle={puzzle}
        input={input}
        setInput={setInput}
        onSubmit={checkAnswer}
        onSolved={handleSolved}
      />
    </div>
  );
}
