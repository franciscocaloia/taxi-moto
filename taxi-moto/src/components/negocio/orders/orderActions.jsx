import React, { useRef } from "react";
import { Link, useSubmit } from "react-router-dom";
import Swal from "sweetalert2";

export const OrderActions = ({ order }) => {
  const submit = useSubmit()
 
  function onClick(event) {
    Swal.fire({
      title: `Desea confirmar el estado del pedido [${event.target.value}]?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0B5087",
      cancelButtonColor: "grey",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("hola")
      const formData = new FormData();
      formData.append("state",event.target.value);
      submit(formData,{
        method:"put",
        action:`/negocio/${order.negocio}/editarEstadoPedido/${order._id}`
      });
      }
    });
  }
  return (
    <div className="flex flex-1 flex-col justify-between gap-1">
      <button value="RETIRADO" className="btn btn-primary w-full" onClick={onClick}>Pedido retirado</button>
      <button value="ABONADO" className="btn btn-primary w-full" onClick={onClick}>Pedido abonado</button>
      <Link
        state={order}
        to={`/negocio/editarpedido/${order._id}`}
        className="btn btn-primary w-full "
      >
        Editar pedido
      </Link>
      <button className="btn btn-success w-full ">Finalizar pedido</button>
      <button className="btn btn-error  w-full ">Cancelar pedido</button>
    </div>
  );
};
