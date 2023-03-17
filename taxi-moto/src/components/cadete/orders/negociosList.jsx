import React from "react";
import { NegocioListItem } from "./negocioListItem";

export const NegociosList = ({ negocios }) => {
  return (
    <ul className="w-5/6 mx-auto lg:grid lg:grid-cols-2 2xl:grid-cols-3 lg:w-4/5">
      {negocios?.map((negocio) => (
        <NegocioListItem key={negocio._id} negocio={negocio} />
      ))}
    </ul>
  );
};
