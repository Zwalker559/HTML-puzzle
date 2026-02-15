import { useState } from "react";
import loadConfig from "../utils/loadConfig";

export default function Final() {
  const config = loadConfig();
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);

  function check() {
    if (input.toLowerCase() === config.finalAnswer.toLowerCase()) {
      setDone(true);
    }
  }

  return (
    <div>
      <h1>Final Question</h1>
      <p>{config.finalQuestion}</p>

      {!done && (
        <>
          <input
            placeholder="Your answer"
            value={input}
            onChange={e => setInput(e.target.value)}
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
