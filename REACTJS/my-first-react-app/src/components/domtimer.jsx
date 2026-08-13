import { useState, useEffect } from "react";

function DOMTimer() {
//Use state - hook
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
     <div>
      <h1>Virtual DOM Demo</h1>

      <h2>Timer: {seconds}</h2>

      <p>
        This paragraph never changes.
      </p>

      <button onClick={() => setSeconds(0)}>Reset</button>
      
    </div>
  );
}

export default DOMTimer;