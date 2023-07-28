import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../utils/fetch";

export const AdminNegocioLayout = () => {
  const negocio = useLoaderData();
  return (
    <>
      <h2>{negocio.name}</h2>
      <Outlet />
    </>
  );
};

export async function loader({ params }) {
  return await fetchData(`/negocio/${params.idNegocio}`);
}
