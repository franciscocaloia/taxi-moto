import React from "react";
import { AdminCadetesForm } from "../../components/admin/adminCadeteForm";
import { submitData } from "../../utils/fetch";

export const AdminNuevoCadetePage = () => {
  return (
    <>
      <AdminCadetesForm />
    </>
  );
};
export async function action({ request, params }) {
  const data = await request.formData();
  const firstname = data.get("firstName");
  const lastname = data.get("lastName");
  const phone = data.get("phone");
  const username = data.get("userName");
  const password = data.get("password");
  const cadete = {
    firstname,
    lastname,
    phone,
    type: "cadete",
    username,
    password,
    earnings: 0,
  };
  return submitData(
    "/signin",
    { method: "post", body: JSON.stringify(cadete) },
    "/admin/cadete"
  );
}
