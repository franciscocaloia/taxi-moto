import React from "react";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import Swal from "sweetalert2";
import { socket } from "../../../socket";

export const OrderActions = ({ order }) => {
  const navigation = useNavigation();
  function onCancel(event) {
    Swal.fire({
      title: `Desea confirmar el estado del pedido [${event.target.value}]?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0B5087",
      cancelButtonColor: "grey",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("orderCanceled", order._id);
      }
    });
  }
  return (
    <>
      {navigation.state === "submitting" ? (
        <img
          className="animate-spin h-6 w-6"
          src={loadingIcon}
          alt="loading icon"
        />
      ) : (
        <div className="flex flex-1 flex-col justify-between gap-1">
          <Link
            state={order}
            to={`/negocio/editarpedido/${order._id}`}
            className="btn btn-primary w-full "
          >
            Editar pedido
          </Link>
          <button onClick={onCancel} className="btn btn-error  w-full">
            Cancelar pedido
          </button>
        </div>
      )}
    </>
  );
};
