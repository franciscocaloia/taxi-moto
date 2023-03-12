import React from "react";
import { ResultItem } from "./resultItem";

export const ResultsList = ({ results, clearResults }) => {
  return (
    <>
      {results && (
        <>
          <div
            onClick={clearResults}
            className="absolute top-0 left-0 h-screen w-screen bg-opacity-5 bg-black"
          />
          <div className="relative">
            <ul className="menu absolute top-0 bg-[#e0dfdf]">
              {results.map((result) => (
                <ResultItem
                  key={result.place_id}
                  result={result}
                  clearResults={clearResults}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};
