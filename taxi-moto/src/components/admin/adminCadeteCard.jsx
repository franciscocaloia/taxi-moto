import React from "react";
import { Link } from "react-router-dom";

export const AdminCadeteCard = ({ cadete }) => {
  return (
    <Link className="my-3 lg:m-6">
      <div className="w-full bg-base-100 rounded-lg p-6 flex items-center gap-6">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-md w-16 xl:w-20">
            <span className="text-xl xl:text-3xl">
              {cadete
                ? `${cadete.firstname.charAt(0) + cadete.lastname.charAt(0)}`
                : "-"}
            </span>
          </div>
        </div>
        <h3 className="text-2xl">
          {cadete ? `${cadete?.firstname} ${cadete?.lastname}` : "No asignado"}
        </h3>
      </div>
    </Link>
  );
};
