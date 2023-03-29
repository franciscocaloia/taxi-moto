import { json, redirect } from "react-router-dom";

export async function fetchData(path) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(import.meta.env.VITE_API_HOST + path, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw response;
    }
    return response;
  }
}
export async function submitData(path, options, redirectUrl) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(import.meta.env.VITE_API_HOST + path, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      ...options,
    });
    if (!response.ok) {
      throw response;
    }

    return redirect(redirectUrl);
  }

  throw json(
    { message: "Debe iniciar sesión" },
    { status: "401", statusText: "Usuario no autenticado" }
  );
}

export async function submitDataWithErrorReturn(path, options, redirectUrl) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(import.meta.env.VITE_API_HOST + path, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      ...options,
    });
    if (!response.ok) {
      return response;
    }
    return redirect(redirectUrl);
  }

  throw json(
    { message: "Debe iniciar sesión" },
    { status: "401", statusText: "Usuario no autenticado" }
  );
}
