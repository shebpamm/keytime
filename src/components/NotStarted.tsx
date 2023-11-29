import React from "react";

interface NotStartedProps {
  handler: () => void;
}

const NotStarted: React.FC<NotStartedProps> = ({ handler }) => {
  return (
    <div>
        <h1 className="welcome">Hello! Press
          <button
            className="inline-button"
            onClick={() => {
              handler();
            }}
          >
            Start
          </button>
          to collecting some data.
        </h1>
    </div>
  );
};

export default NotStarted;
