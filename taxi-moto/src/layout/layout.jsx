import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="bottom-36 md:bottom-24"
        />
      </div>
      <Footer />
    </div>
  );
};
