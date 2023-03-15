import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Nav } from "../nav/nav";
import { Logo } from "./logo";
import menuIcon from "../../assets/menuIcon.svg";
import { useNavigation } from "react-router-dom";
function getCategories(type, id) {
  switch (type) {
    case "cadete":
      return [
        {
          content: "Pedidos",
          url: `/cadete/${id}/pedidos`,
        },
        {
          content: "Información",
          url: `/cadete/${id}/info`,
        },
      ];
    case "negocio":
      return [
        {
          content: "Pedidos",
          url: `/negocio/${id}/pedidos`,
        },
        {
          content: "Nuevo Pedido",
          url: "/negocio/nuevopedido",
        },
        {
          content: "Información",
          url: `/negocio/${id}/info`,
        },
      ];
    default:
      return [];
  }
}

export const Header = () => {
  const user = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const categories = getCategories(user?.type, user?._id);
  const url = user ? "/" + user.type : "/";
  function toggleMenu(event) {
    console.log("object");
    setShowMenu((state) => !state);
  }
  return (
    <header className="relative z-10">
      <div className="w-full bg-primary h-24 shadow">
        <div className="w-5/6 mx-auto flex justify-between lg:w-4/5">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Logo url={url} />
            <button className="h-24 py-6 lg:p-6 lg:hidden" onClick={toggleMenu}>
              <img className="h-full" src={menuIcon} alt="menu icon" />
            </button>
          </div>
          {user && <Nav showMenu={showMenu} categories={categories} />}
        </div>
      </div>
    </header>
  );
};
