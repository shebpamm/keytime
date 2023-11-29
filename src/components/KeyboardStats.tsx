import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Measurements, AveragedMeasurements } from "../types";

interface KeyboardStatsProps {
  data: AveragedMeasurements;
}

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["z", "x", "c", "v", "b", "n", "m", "", "", ""],
];

const KeyboardStatsProps: React.FC<KeyboardStatsProps> = ({ data }) => {
  const KeyboardLayout = ({ averages }) => {
    const rows = keys.map((row) => {
      const keys = row.map((key) => {
        return <div className="keyboard-key"
        style={{
          backgroundColor: data[`Key${key.toUpperCase()}`] ? "var(--primary)" : "var(--color)",
        }}
        >{key}</div>;
      });
      return <div className="keyboard-row">{keys}</div>;
    });

    return <div className="keyboard">{rows}</div>;
  };

  return (
    <div>
      <KeyboardLayout averages={data}/>
    </div>
  );
};

export default KeyboardStatsProps;
