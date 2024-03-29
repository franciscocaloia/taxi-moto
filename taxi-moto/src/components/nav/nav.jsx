import React, { useState } from "react";
import { Link, redirect, useNavigation, useSubmit } from "react-router-dom";
import Swal from "sweetalert2";
import { NavItem } from "./navItem";
import reloadIcon from "../../assets/reloadIcon.svg";

export const Nav = ({ categories, showMenu }) => {
  const submit = useSubmit();
  const naviation = useNavigation();
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
    <>
      <ul
        className={`absolute w-full left-0 bg-primary z-[-1] transition-all duration-200 lg:px-6 lg:static lg:z-auto lg:w-auto lg:flex lg:items-center lg:gap-2  ${
          showMenu ? "top-24" : "-top-[400px]"
        } lg:top-0`}
      >
        {categories.map((category) => (
          <NavItem key={category.content} category={category} />
        ))}
        <li className="flex justify-center my-6 lg:m-0">
          <Link
            className={`block w-5/6 text-md uppercase text-center text-[#f6e525] px-4 py-2 border-4 rounded-md bg-[#201d1e] border-[#f6e525] transition-all duration-150 hover:scale-105 lg:w-auto`}
          >
            <img
              src={reloadIcon}
              className={`h-6 ${
                naviation.state === "loading" && "animate-spin"
              }`}
              alt="reload icon"
            />
          </Link>
        </li>
        <li className="flex justify-center my-6 lg:m-0">
          <button
            onClick={onLogout}
            className="w-5/6 text-md text-center text-[#f6e525] bg-[#201d1e] px-4 py-2 mx-auto border-4 border-[#f6e525] rounded-md uppercase transition-all duration-150 hover:scale-105 lg:w-auto"
          >
            Logout
          </button>
        </li>
      </ul>
    </>
  );
};
