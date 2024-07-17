import React from "react";
import { fetchData } from "../../utils/fetch";
import { Link, useLoaderData } from "react-router-dom";
import { AdminNegociosList } from "../../components/admin/adminNegociosList";

export const AdminNegociosPage = () => {
  const data = useLoaderData();
  return (
    <div className="w-5/6 mx-auto lg:w-4/5">
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link to="new" className="btn btn-primary">Nuevo negocio</Link>
      </div>
      <AdminNegociosList negocios={data} />
    </div>
  );
};

export function loader() {
  return fetchData("/negocio");
}
