import React from "react";
import { useSelector } from "react-redux";
export const NegocioInformacionPage = () => {
  const user = useSelector((state) => state.auth);
  return (
    <div className="w-full h-full p-6 lg:w-4/5 xl:w-2/3  mx-auto">
      <div className="card p-6 lg:card-side bg-base-100 shadow-xl">
        <h2 className="card-title capitalize border-b-2 border-b-base-200">
          Servicio: ${user?.debt}
        </h2>
      </div>
    </div>
  );
};
