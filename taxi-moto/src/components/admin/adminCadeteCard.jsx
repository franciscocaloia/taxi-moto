import React from "react";
import { Link } from "react-router-dom";

export const AdminCadeteCard = ({ cadete }) => {
  return (
    <Link
      to={`${cadete._id}`}
      className="m-6 bg-base-100 rounded-lg p-6 flex items-center gap-6"
    >
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-md w-16 xl:w-20">
          <span className="text-xl xl:text-3xl">
            {`${cadete.firstname.charAt(0) + cadete.lastname.charAt(0)}`}
          </span>
        </div>
      </div>
      <h3 className="text-2xl">{`${cadete?.firstname} ${cadete?.lastname}`}</h3>
    </Link>
  );
};
