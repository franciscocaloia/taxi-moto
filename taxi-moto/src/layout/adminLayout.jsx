import { redirect } from "react-router-dom";
import { socket } from "../../src/socket.js";
import { checkAuthLoader } from "../utils/auth.jsx";
export async function loader() {
  const user = await checkAuthLoader();
  if (user.type !== "admin") {
    return redirect(window.location.origin + `/${user.type}`);
  }
  return user;
}
