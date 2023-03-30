import React from "react";
import { useSelector } from "react-redux";

export const CadetePage = () => {
  const user = useSelector((state) => state.auth);
  return (
    <div className="w-full p-6 h-full mx-auto lg:w-5/6">
      {user && <h1>Bienvenido {user.firstname} a Taxi Moto Esperanza</h1>}
    </div>
  );
};
