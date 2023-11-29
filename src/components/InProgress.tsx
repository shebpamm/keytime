import React from "react";

interface InProgressProps {
  handler: () => void;
}

const InProgress: React.FC<InProgressProps> = ({ handler }) => {
  return (
    <div>
      <h1 className="welcome">Collecting data...</h1>
      <h2 className="welcome">Press
        <button
          className="inline-button"
          onClick={() => {
            handler();
          }}
        >
         here 
        </button>
        to stop collecting data.
      </h2>
    </div>
  );
};

export default InProgress;
