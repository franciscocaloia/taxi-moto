import React from "react";
import { useSelector } from "react-redux";
import { useSubmit } from "react-router-dom";
import Swal from "sweetalert2";

export const CadeteNegocioOrderActions = ({ order }) => {
  const submit = useSubmit();
  const user = useSelector((state) => state.auth);
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
        const formData = new FormData();
        formData.append("state", event.target.value);
        formData.append("cadete", JSON.stringify(user));
        submit(formData, {
          method: "put",
          action: `/cadete/${user._id}/tomarPedido/${order._id}`,
        });
      }
    });
  }
  return (
    <div className="flex flex-1 flex-col justify-between gap-1">
      <button
        value="TOMADO"
        className="btn btn-primary w-full"
        onClick={onClick}
      >
        Tomar pedido
      </button>
    </div>
  );
};
