import { useState, useEffect } from "react";

function useTypewriter(text: string) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [text]);

  return displayedText;
}

export default useTypewriter;
