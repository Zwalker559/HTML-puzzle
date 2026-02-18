import { useState } from "react";

export default function RiddleRoom({ puzzle, onSolved }) {
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");

  function updateAnswer(i, val) {
    setAnswers({ ...answers, [i]: val });
  }

  const allCorrect = puzzle.riddles.every((r, i) =>
    r.answer.toLowerCase() === (answers[i] || "").toLowerCase()
  );

  function tryUnlock() {
    if (puzzle.check(input)) onSolved();
  }

  return (
    <div>
      <h2>Riddle Room</h2>
      <p>Solve all riddles to reveal the code digits.</p>

      {puzzle.riddles.map((r, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p>
            <strong>Riddle {i + 1}:</strong> {r.prompt}
          </p>
          <input
            placeholder="Your answer"
            value={answers[i] || ""}
            onChange={(e) => updateAnswer(i, e.target.value)}
          />
          {answers[i] &&
            (answers[i].toLowerCase() === r.answer.toLowerCase() ? (
              <p style={{ color: "lime" }}>Correct! Digit: {r.digit}</p>
            ) : (
              <p style={{ color: "red" }}>Incorrect</p>
            ))}
        </div>
      ))}

      {allCorrect && (
        <div style={{ marginTop: "20px" }}>
          <p>Enter the 3-digit code:</p>
          <input
            placeholder="Code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={tryUnlock}>Unlock Padlock</button>
        </div>
      )}
    </div>
  );
}
