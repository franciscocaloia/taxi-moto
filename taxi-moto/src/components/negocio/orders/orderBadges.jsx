import React from "react";

export const OrderBadges = ({ state }) => {
  return (
    <div className="card-actions flex-col justify-between">
      {Object.keys(state).map((key) => {
        return (
          <div
            key={key}
            className={`badge w-full ${
              state[key] ? "badge-primary" : "badge-ghost"
            }`}
          >
            {key}
          </div>
        );
      })}
    </div>
  );
};
