import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ category }) => {
  /**
   * after:absolute after:h-6 after:w-12 after:left-0 after:right-0 after:mx-auto after:z-[-1] after:bg-[url('/assets/logoTaxiSign.png')] after:bg-contain after:bg-no-repeat after:transition-all after:duration-150
   *
   * text-md text-[#f6e525] bg-[#201d1e] px-4 py-2 border-4 border-[#f6e525] rounded-md uppercase transition-all duration-150 hover:scale-110
   */
  return (
    <li className="flex justify-center my-6 lg:m-0">
      <NavLink
        className={({ isActive }) =>
          `block w-5/6 text-md uppercase text-center text-[#f6e525] px-4 py-2 border-4 rounded-md bg-[#201d1e] border-[#f6e525] transition-all duration-150 hover:scale-105 lg:w-auto ${
            isActive ? "" : ""
          }`
        }
        to={category.url}
      >
        {category.content}
      </NavLink>
    </li>
  );
};
