import React from "react";
import { redirect, useSubmit } from "react-router-dom";
import Swal from "sweetalert2";
import { NavItem } from "./navItem";

export const Nav = ({ categories }) => {
  const submit = useSubmit();
  function onLogout() {
    Swal.fire({
      title: "Cerrar sesion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0B5087",
      cancelButtonColor: "grey",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        submit(null, { method: "post", action: "/logout" });
        redirect("/");
      }
    });
  }
  return (
    <ul className="flex h-full items-center gap-4">
      {categories.map((category) => (
        <NavItem category={category} />
      ))}
      <li className="h-24 flex items-center">
        <button
          onClick={onLogout}
          className="leading-[2.5rem] text-md text-[#f6e525] bg-[#201d1e] px-4 border-4 border-[#f6e525] rounded-md uppercase transition-all duration-150 hover:scale-110"
        >
          Logout
        </button>
      </li>
    </ul>
  );
};
