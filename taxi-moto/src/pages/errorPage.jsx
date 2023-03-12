import React from "react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="h-screen bg-neutral-200 flex items-center justify-center">
      <div className="bg-white rounded-md w-5/6 md:w-1/2 lg:w-3/12">
        <div className="p-3 bg-error rounded-t-md flex justify-between items-center">
          <h2 className="text-lg font-bold">{error.statusText}</h2>
          <Link
            className="p-3 border-2 border-black rounded-md hover:bg-error-content hover:text-white"
            to=".."
            relative="path"
          >
            Volver
          </Link>
        </div>
        <p className="m-3">Status: {error.status}</p>
        <p className="m-3">{error.data.message ?? error.data}</p>
      </div>
    </div>
  );
};
