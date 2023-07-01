import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, json, redirect, useLoaderData } from "react-router-dom";
import { authActions } from "../store/authSlice";

export async function checkAuthLoader() {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(import.meta.env.VITE_API_HOST + "/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw json(
        { message: "Error de autenticacion" },
        { status: response.status }
      );
    }
    const user = await response.json();
    if (!user) {
      redirect("/");
      throw json(
        { message: "Error de autenticacion" },
        { status: response.status }
      );
    }
    return user;
  } else {
    redirect("/");
  }
}

export const Layout = () => {
  const user = useLoaderData();
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.login(user));
  }, [user]);
  return <Outlet />;
};

export async function logoutAction() {
  localStorage.removeItem("token");
  return redirect("/");
}
