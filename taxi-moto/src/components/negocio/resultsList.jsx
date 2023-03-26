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
            <ul className="menu absolute max-h-80 w-full overflow-hidden top-0 bg-[#e0dfdf]">
              {results.length !== 0 ? (
                results.map((result) => (
                  <ResultItem
                    key={result.place_id}
                    result={result}
                    clearResults={clearResults}
                  />
                ))
              ) : (
                <li>No se encontraron resultados</li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};
