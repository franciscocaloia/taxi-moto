import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
// import { useAuth } from "../store/useAuth";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";

export const Layout = () => {
  const user = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.login(user));
  }, [user]);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-base-200 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
