import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "../nav/nav";
import { Logo } from "./logo";
import menuIcon from "../../assets/menuIcon.svg";
import { UIActions } from "../../store/UISlice";
import { useLocation } from "react-router-dom";
function getCategories(type, id) {
  switch (type) {
    case "cadete":
      return [
        {
          content: "Pedidos",
          url: `/cadete/${id}/pedidos`,
        },
        {
          content: "Negocios",
          url: `/cadete/${id}/negocios`,
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
    case "admin":
      return [
        {
          content: "Negocios",
          url: `/admin/negocio`,
        },
        {
          content: "Cadetes",
          url: `/admin/cadete`,
        },
      ];
    default:
      return [];
  }
}

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth);
  const showMenu = useSelector((state) => state.UI.showMenu);
  const categories = getCategories(user?.type, user?._id);
  const url = user ? "/" + user.type : "/";
  function onClick(event) {
    dispatch(UIActions.toggleShowMenu());
  }
  useEffect(() => {
    dispatch(UIActions.hideMenu());
  }, [location.pathname]);
  return (
    <header className="relative z-50">
      <div className="w-full bg-primary h-24 shadow">
        <div className="w-5/6 mx-auto flex justify-between lg:w-4/5">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Logo url={url} />
            <button className="h-24 py-6 lg:p-6 lg:hidden" onClick={onClick}>
              <img className="h-full" src={menuIcon} alt="menu icon" />
            </button>
          </div>
          {user && <Nav showMenu={showMenu} categories={categories} />}
        </div>
      </div>
    </header>
  );
};
