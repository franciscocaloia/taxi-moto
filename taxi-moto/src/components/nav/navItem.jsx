import React from "react";
import { Link } from "react-router-dom";

export const NavItem = ({ category }) => {
  return (
    <li className="h-24 flex items-center">
      <Link
        className="leading-[2.5rem] text-md text-[#f6e525] bg-[#201d1e] px-4 border-4 border-[#f6e525] rounded-md uppercase transition-all duration-150 hover:scale-110"
        to={category.url}
      >
        {category.content}
      </Link>
    </li>
  );
};
