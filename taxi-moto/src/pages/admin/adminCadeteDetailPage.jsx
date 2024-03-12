import React from "react";
import { useLoaderData } from "react-router-dom";
import { fetchData, submitData } from "../../utils/fetch";
import { AdminCadeteDetail } from "../../components/admin/adminCadeteDetail";

export const AdminCadeteDetailPage = () => {
  const cadete = useLoaderData();
  return <AdminCadeteDetail cadete={cadete} />;
};

export function loader({ params }) {
  return fetchData(`/cadete/${params.idCadete}`);
}

export function action({ params }) {
  return submitData(
    `/signin/${params.idCadete}`,
    { method: "delete" },
    `/admin/cadete`
  );
}
