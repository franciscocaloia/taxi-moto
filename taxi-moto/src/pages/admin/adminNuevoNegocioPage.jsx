import React from "react";
import { AdminNegocioForm } from "../../components/admin/adminNegocioForm";
import { submitDataWithFiles } from "../../utils/fetch";
import { json } from "react-router-dom";

export const AdminNuevoNegocioPage = () => {
  return (
    <>
      <AdminNegocioForm />
    </>
  );
};

export async function action({ request, params }) {
  const formData = await request.formData();
  const state = JSON.parse(formData.get("state"));
  const location = state.mapInput.mapCoords;
  if (!(location)) {
    return json({ data: "Debe ingresar una ubicacion en el mapa" });
  }
  return submitDataWithFiles(
    "/signin_negocio",
    { method: "post", body:formData },
    "/admin/negocio"
  );
}