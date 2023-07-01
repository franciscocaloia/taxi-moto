import React from "react";
import { Link } from "react-router-dom";

export const AdminNegocioListItem = ({ negocio }) => {
  return (
    <li className="my-3 lg:m-6">
      <Link
        className="card p-6 flex-row  items-center gap-6 bg-base-100 shadow-xl transition-all duration-200 hover:scale-105"
        to={`${negocio._id}/pedidos`}
      >
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content w-16 xl:w-20">
            <img
              src={`/assets/negocio/${negocio.username}.jpeg`}
              alt={negocio.username}
            />
          </div>
        </div>
        <h3 className="text-2xl">{negocio.name}</h3>
      </Link>
    </li>
  );
};
