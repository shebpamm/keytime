import React from "react";
import { Measurements, AveragedMeasurements } from "../types";
import { IoMdRefresh } from "react-icons/io";
import { SlRefresh } from "react-icons/sl";

interface ResultsProps {
  restartHandler: () => void;
  data: Measurements;
}

// example input data:
// {
//  "q": [22, 54, 33, 34],
//  "w": [24, 54, 33, 34],
//  "e": [32, 54, 33, 34],
//  "r": [22, 84, 13, 34],
//  "t": [21, 54, 33, 34],
//  "y": [22, 54, 53, 34],
// }
const calculateAverages = (data: Measurements) => {
  const averages: AveragedMeasurements = {};
  for (const key in data) {
    const measurements = data[key];
    const average = measurements.reduce((a, b) => a + b) / measurements.length;
    averages[key] = average;
  }
  return averages;
};

const calculateTotalAverage = (averages: AveragedMeasurements) => {
  const values = Object.values(averages);
  const totalAverage = values.reduce((a, b) => a + b) / values.length;
  return totalAverage;
};

const Results: React.FC<ResultsProps> = ({ restartHandler, data }) => {
  return (
    <div className="results">
      <h1 className="welcome">
        Results{" "}
        <button
          className="restart-button"
          onClick={() => {
            restartHandler();
          }}
        > <SlRefresh />
        </button>
      </h1>
      <h2 className="welcome">
        Total average:{" "}
        {calculateTotalAverage(calculateAverages(data)).toFixed(0)}ms
      </h2>
    </div>
  );
};

export default Results;
