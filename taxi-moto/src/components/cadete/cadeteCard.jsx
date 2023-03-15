import React from "react";

export const CadeteCard = ({ cadete }) => {
  return (
    <div className="w-full bg-base-200 rounded-lg p-6 flex items-center gap-6">
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
  );
};
