import React, { useState, useEffect, useRef } from "react";
import './App.css';

function App() {

  const STARTING_TIME = 15;
  const textAreaRef = useRef(null);

  const [text, setText] = useState("");
  const [words, setWords] = useState(0);
  const [remainingTime, setRemainingTime] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const changeText = (event) => {
    const {value} = event.target;
    setText(value);
  }
  
  const wordsCounter = (text) => {
    if(isTimeRunning === false) {
      const wordsArr = (text.trim().split(' '));
      const wordsArrFilter = wordsArr.filter(word => word !== "").length;
      setWords(wordsArrFilter);
    }
  }

  useEffect(() => {
    if(isTimeRunning && remainingTime > 0) {
      setTimeout(() => {
        setRemainingTime(time => time - 1);
      }, 1000);
    } else if(remainingTime === 0) {
      endGame();
    }
  }, [remainingTime, isTimeRunning]);

  const startGame = () => {
        setIsTimeRunning(true);
        setRemainingTime(STARTING_TIME);
        setWords(0);
        setText("");
        textAreaRef.current.disabled = false;
        textAreaRef.current.focus();
  }

  const endGame = () => {
    setIsTimeRunning(false)
    wordsCounter(text);
  }
 
  return (
    <div>
      <h1>Speed typing game</h1>
      <textarea name="input" 
                value={text} 
                onChange={changeText} 
                disabled={!isTimeRunning} 
                ref={textAreaRef}
      />
      <h4>Remaining: {remainingTime} </h4>
      <button onClick={startGame} disabled={isTimeRunning}> Start</button>
      <h1>Your score: {words} words </h1>
    </div>
  );
}

export default App;
