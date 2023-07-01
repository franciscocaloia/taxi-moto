import React from "react";
import { AdminNegocioListItem } from "./adminNegociosListItem";

export const AdminNegociosList = ({ negocios }) => {
  console.log(negocios);
  return (
    <ul className="lg:grid lg:grid-cols-2 2xl:grid-cols-3">
      {negocios?.map((negocio) => (
        <AdminNegocioListItem negocio={negocio} />
      ))}
    </ul>
  );
};
