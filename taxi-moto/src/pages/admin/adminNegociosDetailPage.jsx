import React, { useState } from "react";
import { fetchData } from "../../utils/fetch";
import { Link, useLoaderData } from "react-router-dom";
import { AdminNegocioOrdersList } from "../../components/admin/adminNegociosOrdersList";
import { DateFilter } from "../../components/utils/dateFilter";

export const AdminNegociosDetailPage = () => {
  return (
    <div className="w-5/6 mx-auto flex lg:w-4/5 ">
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link to="debt" className="btn btn-primary">
          Consultar deuda
        </Link>
      </div>
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link className="btn btn-primary">Gestionar ordenes</Link>
      </div>
    </div>
  );
};
