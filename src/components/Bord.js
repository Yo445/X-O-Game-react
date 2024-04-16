import React, { useState } from "react";
import Card from "./Card";
import "./Board.css";
//import { Button } from '@mui/material';
const defaultBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

const Bord = () => {
  const [values, togglevalues] = useState(defaultBoard);
  const [turn, changeTurn] = useState(true);
  const [disable, toggledisable] = useState(false);
  const [winmessage, setmessage] = useState("");

  const win = (i, data) => {
    let char = turn ? "X" : "O";
    // vertical check
    if (
      data[i] === char &&
      data[(i + 3) % 9] === char &&
      data[(i + 6) % 9] === char
    ) {
      return true;
    }
    // horizontal check
    let weight = i > 2 ? 3 : 0;
    weight = i > 5 ? 6 : weight;
    if (
      data[(i % 3) + weight] === char &&
      data[((i + 1) % 3) + weight] === char &&
      data[((i + 2) % 3) + weight] === char
    ) {
      return true;
    }
    // diagonal check
    if (data[0] === char && data[4] === char && data[8] === char) {
      return true;
    }
    if (data[2] === char && data[4] === char && data[6] === char) {
      return true;
    }
    return false;
  };

  const onClickCard = (i) => {
    if (disable) {
      return;
    }
    let data = [...values];
    if (turn && values[i] === " ") {
      data[i] = "X";
    } else if (values[i] === " ") {
      data[i] = "O";
    } else {
      return;
    }
    togglevalues(data);
    changeTurn(!turn);

    if (win(i, data)) {
      toggledisable(true);
      setmessage(`${turn ? "X" : "O"} Wins`);
    }
    if (!data.includes(" ")) {
      setmessage(`Match is Draw`);
    }
  };

  const resetHandler = () => {
    toggledisable(false);
    togglevalues(defaultBoard);
    setmessage("");
  };

  return (
    <div className="Board">
      {values.map((val, i) => (
        <span
          key={i}
          onClick={() => {
            onClickCard(i);
          }}
        >
          <Card character={val} />
        </span>
      ))}
      <h1 className={!turn ? "blueSign winMessage" : "redSign winMessage"}>
        {winmessage}
      </h1>

      <button onClick={resetHandler} className="btn">
        Reset
      </button>
    </div>
  );
};

export default Bord;
