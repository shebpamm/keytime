import React from "react";
import { Measurements, AveragedMeasurements } from "../types";
import { SlRefresh } from "react-icons/sl";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { KbdIcon, GraphIcon } from "../assets/icons";

import KeyboardStats from "./KeyboardStats";
import GraphStats from "./GraphStats";

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
  const items: TabsProps["items"] = [
    {
      key: "keyboard",
      label: (
        <span>
          <KbdIcon />
        </span>
      ),
      children: <KeyboardStats data={calculateAverages(data)} />,
    },
    {
      key: "graphs",
      label: (
        <span>
          <GraphIcon />
        </span>
      ),
      children: <GraphStats />,
    },
  ];
  if (Object.keys(data).length === 0) {
    return (
      <div className="results">
        <h1 className="welcome">Results</h1>
        <h2 className="welcome">
          No data collected!
          <button
            className="inline-button"
            onClick={() => {
              restartHandler();
            }}
          >
            {" "}
            Try again?
          </button>
        </h2>
      </div>
    );
  }

  return (
    <div className="results">
      <h1 className="welcome">
        Results{" "}
        <button
          className="restart-button"
          onClick={() => {
            restartHandler();
          }}
        >
          {" "}
          <SlRefresh />
        </button>
      </h1>
      <h2 className="welcome">
        Total average:{" "}
        {calculateTotalAverage(calculateAverages(data)).toFixed(0)}ms
      </h2>

      <Tabs centered items={items} size={"large"} />
    </div>
  );
};

export default Results;
