import { useState, useEffect } from "react";
import loadConfig from "../utils/loadConfig";

export default function Final() {
  const config = loadConfig();
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const progressRaw = sessionStorage.getItem("progress");
    if (!progressRaw) {
      window.location.href = "/";
      return;
    }
    const prog = JSON.parse(progressRaw);

    // NEW: ensure all puzzles solved
    if (prog.every((p) => p === true)) {
      setAllowed(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  function check() {
    if (input.toLowerCase() === config.finalAnswer.toLowerCase()) {
      setDone(true);
    }
  }

  if (!allowed) return <p>Loading...</p>;

  return (
    <div>
      <h1>Final Question</h1>
      <p>{config.finalQuestion}</p>

      {!done && (
        <>
          <input
            placeholder="Your answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={check}>Submit</button>
        </>
      )}

      {done && (
        <>
          <h2>Secret:</h2>
          <p>{config.finalSecret}</p>
        </>
      )}
    </div>
  );
}
