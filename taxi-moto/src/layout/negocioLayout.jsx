import { redirect } from "react-router-dom";
import { checkAuthLoader } from "../utils/auth.jsx";
export async function loader() {
  const user = await checkAuthLoader();
  if (user.type !== "negocio") {
    return redirect(window.location.origin + `/${user.type}`);
  }
  return user;
}
