import React from "react";

export const OrderBadges = ({ state }) => {
  return (
    <div className="card-actions flex-col justify-between">
      {Object.keys(state).map((key) => {
        console.log(state[key]);
        return (
          <div
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
