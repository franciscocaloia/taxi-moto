import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { redirect, useActionData, useRouteLoaderData } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
import "react-toastify/dist/ReactToastify.css";
export const LoginPage = () => {
  const actionData = useActionData();
  useEffect(() => {
    if (actionData) {
      toast.error("Error: " + actionData.message);
    }
  }, [actionData]);
  return (
    <>
      <h1 className="font-bebas text-2xl  m-3 text-center sm:m-6 sm:text-4xl sm:leading-10">
        Inicio de sesion
      </h1>
      <LoginForm />
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
    </>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();
  const user = {
    username: data.get("username"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    return response;
  } else {
    const { token, type } = await response.json();
    localStorage.setItem("token", token);
    return redirect("/" + type);
  }
}

export async function loader() {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch("http://localhost:8080/user", {
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
    const { type } = await response.json();
    return redirect("/" + type);
  }
  return null;
}
