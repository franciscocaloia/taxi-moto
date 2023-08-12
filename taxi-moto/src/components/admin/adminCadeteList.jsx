import React from "react";
import { CadeteCard } from "../cadete/cadeteCard";
import { AdminCadeteCard } from "./adminCadeteCard";

export const AdminCadetesList = ({ cadetes }) => {
  return (
    <ul className="lg:grid lg:grid-cols-2 2xl:grid-cols-3 ">
      {cadetes?.map((cadete) => (
        <AdminCadeteCard cadete={cadete} />
      ))}
    </ul>
  );
};
