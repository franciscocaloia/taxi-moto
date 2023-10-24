import React from "react";
import { Link, useSubmit } from "react-router-dom";
import editLogo from "../../assets/edit-content-svgrepo-com.svg";
import deleteLogo from "../../assets/delete-2-svgrepo-com.svg";
import Swal from "sweetalert2";
export const AdminCadeteDetail = ({ cadete }) => {
  const submit = useSubmit();
  function onDeleteUser(event) {
    Swal.fire({
      title: `Desea eliminar este usuario?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0B5087",
      cancelButtonColor: "grey",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        submit(null, { method: "delete" });
      }
    });
  }
  return (
    <div className="w-full  p-6 mx-auto bg-base-100 my-3 lg:w-2/5 ">
      <div className="m-6">
        <p>
          <b>Nombre:</b> {cadete.firstname}
        </p>
        <p>
          <b>Apellido:</b> {cadete.lastname}
        </p>
        <p>
          <b>Telefono:</b> {cadete.phone}
        </p>
        <p>
          <b>Nombre de usuario:</b> {cadete.username}
        </p>
      </div>
      <div className="flex justify-around m-6">
        <Link to={`editarCadete`} className="">
          <img className="h-6" src={editLogo} alt="edit" />
        </Link>
        <button onClick={onDeleteUser}>
          <img className="h-6" src={deleteLogo} alt="delete" />
        </button>
      </div>
    </div>
  );
};
