import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ url }) => {
  return (
    <Link to={url}>
      <img
        className="h-24 p-6 "
        src="/assets/logoTIME-notext.png"
        alt="Logo Taxi Moto Esperanza"
      />
    </Link>
  );
};
