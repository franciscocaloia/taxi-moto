import React from "react";
import { useSelector } from "react-redux";
import { useNavigation, useSubmit } from "react-router-dom";
import Swal from "sweetalert2";
import loadingIcon from "../../../assets/loadingIcon.svg";

export const CadeteOrderActions = ({ order }) => {
  const navigation = useNavigation();
  const submit = useSubmit();
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
        submit(formData, {
          method: "put",
        });
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
          {!order.state.ENTREGADO && (
            <button
              value="ENTREGADO"
              className="btn btn-primary w-full"
              onClick={onClick}
            >
              Pedido entregado
            </button>
          )}
        </div>
      )}
    </>
  );
};
