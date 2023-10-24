import React from "react";
import { fetchData, submitData } from "../../utils/fetch";
import { AdminCadetesForm } from "../../components/admin/adminCadeteForm";
import { useLoaderData } from "react-router-dom";

export const AdminEditarCadetePage = () => {
  const cadete = useLoaderData();
  return <AdminCadetesForm cadete={cadete} />;
};

export function loader({ params }) {
  return fetchData(`/cadete/${params.idCadete}`);
}
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
    `/signin/${params.idCadete}`,
    { method: "put", body: JSON.stringify(cadete) },
    `/admin/cadete/${params.idCadete}`
  );
}
