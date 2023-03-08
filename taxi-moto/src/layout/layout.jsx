import React, { useEffect } from "react";
import { Outlet, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { useAuth } from "../store/useAuth";

export const Layout = () => {
  const user = useLoaderData();
  const { setUser } = useAuth();
  useEffect(() => {
    setUser(user);
  }, [user]);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
