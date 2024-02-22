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
      <div>
        {cadete ? (
          <>
            <h3 className="text-2xl">
              {cadete?.firstname} {cadete?.lastname}
            </h3>
            <span>Telefono: {cadete?.phone}</span>
          </>
        ) : (
          <h3>No asignado</h3>
        )}
      </div>
    </div>
  );
};
