import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AdminNegociosDetailPage = () => {
  return (
    <div className="w-5/6 mx-auto flex lg:w-4/5 ">
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link to="debt" className="btn btn-primary">
          Consultar deuda
        </Link>
      </div>
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link to="orders" className="btn btn-primary">
          Gestionar ordenes
        </Link>
      </div>
    </div>
  );
};
