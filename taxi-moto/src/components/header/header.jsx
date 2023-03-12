import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Nav } from "../nav/nav";
import { Logo } from "./logo";

function getCategories(type, id) {
  switch (type) {
    case "cadete":
      return [
        {
          content: "Pedidos",
          url: "/cadetes/pedidos",
        },
        {
          content: "Información",
          url: "/cadetes/info",
        },
      ];
    case "negocio":
      return [
        {
          content: "Pedidos",
          url: "/negocio/pedidos/" + id,
        },
        {
          content: "Nuevo Pedido",
          url: "/negocio/nuevopedido",
        },
        {
          content: "Información",
          url: "/negocio/info",
        },
      ];
    default:
      return [];
  }
}

export const Header = () => {
  const user = useSelector((state) => state.auth);
  const categories = getCategories(user?.type, user?._id);
  const url = user ? "/" + user.type : "/";
  return (
    <header className="w-screen bg-primary ">
      <div className="w-4/5 mx-auto flex justify-between">
        <Logo url={url} />
        {user && <Nav categories={categories} />}
      </div>
    </header>
  );
};
