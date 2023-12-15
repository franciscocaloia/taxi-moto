import { io } from "socket.io-client";
import Swal from "sweetalert2";
export const socket = io(import.meta.env.VITE_API_HOST);
socket.on("orderCanceled", (order) => {
  Swal.fire({
    title: `PEDIDO CANCELADO`,
    text: `El pedido para la direccion ${order.direction} del negocio ${order.negocio.name} ha sido cancelado.`,
    icon: "error",
    confirmButtonColor: "#0B5087",
    confirmButtonText: "Entendido",
  }).then((result) => {
    if (result.isConfirmed) socket.emit("orderCanceledNotified", order._id);
  });
});
