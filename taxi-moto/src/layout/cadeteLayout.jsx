import { socket } from "../../src/socket.js";
import Swal from "sweetalert2";
export async function loader({ params }) {
  return socket.emit("cadeteConnection", params.idCadete);
}
