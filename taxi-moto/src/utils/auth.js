import { json, redirect } from "react-router-dom";

export async function checkAuthLoader({ request, params }) {
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
    const user = await response.json();
    if (request.url.includes(user.type)) {
      return user;
    } else {
      return redirect("/" + user.type);
    }
  } else {
    if (location.origin + "/" !== request.url) {
      return redirect("/");
    }
    return null;
  }
}

export async function logoutAction() {
  localStorage.removeItem("token");
  return redirect("/");
}
