import React from "react";
import { Link, NavLink } from "react-router-dom";

export const NavItem = ({ category }) => {
  return (
    <li className="h-24 flex items-center justify-center relative z-10">
      <NavLink
        className={({ isActive }) =>
          `leading-[2.5rem] text-md uppercase text-[#f6e525] px-4 border-4 rounded-md bg-[#201d1e] border-[#f6e525] transition-all  after:absolute after:h-6 after:w-12 after:left-0 after:right-0 after:mx-auto after:z-[-1] after:bg-[url('/assets/logoTaxiSign.png')] after:bg-contain after:bg-no-repeat after:transition-all after:duration-150 ${
            isActive ? "after:top-1" : ""
          }`
        }
        to={category.url}
      >
        {category.content}
      </NavLink>
    </li>
  );
};
