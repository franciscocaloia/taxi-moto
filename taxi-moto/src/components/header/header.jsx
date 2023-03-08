import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { Nav } from "../nav/nav";
import { Logo } from "./logo";

function getCategories(type) {
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
          url: "/negocio/pedidos",
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
  const { user } = useAuth();
  const categories = getCategories(user?.type);
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
