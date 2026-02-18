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
  const [progress, setProgress] = useState([]);
  const [total, setTotal] = useState(config.puzzles.length);

  const numericIndex = parseInt(index, 10);

  const resetAll = useCallback(() => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!index) return;

    const orderRaw = sessionStorage.getItem("puzzleOrder");
    const progressRaw = sessionStorage.getItem("progress");

    if (!orderRaw || !progressRaw) {
      resetAll();
      return;
    }

    const order = JSON.parse(orderRaw);
    const prog = JSON.parse(progressRaw);

    setProgress(prog);
    setTotal(order.length);

    const idx = numericIndex - 1;
    if (idx < 0 || idx >= order.length) {
      resetAll();
      return;
    }

    if (numericIndex > 1 && !prog[numericIndex - 2]) {
      const firstUnsolved = prog.findIndex((p) => p === false) + 1;
      router.push(`/puzzle/${firstUnsolved}`);
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
  }, [index, numericIndex, config.puzzles, resetAll, router]);

  function updateProgressAndGoNext() {
    const progressRaw = sessionStorage.getItem("progress");
    const prog = progressRaw ? JSON.parse(progressRaw) : null;
    if (!prog) {
      resetAll();
      return;
    }

    prog[numericIndex - 1] = true;
    sessionStorage.setItem("progress", JSON.stringify(prog));
    setProgress(prog);

    if (numericIndex >= total) {
      router.push("/final");
    } else {
      router.push(`/puzzle/${numericIndex + 1}`);
    }
  }

  function checkAnswer() {
    if (!puzzle) return;
    if (puzzle.check(input)) {
      updateProgressAndGoNext();
    }
  }

  function handleSolved() {
    updateProgressAndGoNext();
  }

  if (!index || !puzzle || !progress.length) {
    return <p>Loading...</p>;
  }

  const solvedCount = progress.filter((p) => p).length;
  const percent = (solvedCount / total) * 100;

  return (
    <div>
      <Timer onExpire={resetAll} />
      <h1>Puzzle {index}</h1>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p>
        Progress: {solvedCount} / {total}
      </p>
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
