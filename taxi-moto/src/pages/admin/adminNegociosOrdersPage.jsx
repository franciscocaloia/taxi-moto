import React, { useState } from "react";
import { fetchData } from "../../utils/fetch";
import { Link, useLoaderData } from "react-router-dom";
import { AdminNegocioOrdersList } from "../../components/admin/adminNegociosOrdersList";
import { DateFilter } from "../../components/utils/dateFilter";

export const AdminNegociosOrdersPage = () => {
  const data = useLoaderData();
  /*   const [initialDate, setInitialDate] = useState();
  const [finallDate, setFinallDate] = useState();

  function onInitialDateChange(e) {
    setInitialDate(e.target.value);
  }
  function onFinalDateChange(e) {
    setFinallDate(e.target.value);
  } */
  return (
    <div className="w-5/6 mx-auto flex lg:w-4/5 ">
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link className="btn btn-primary">Consultar deuda</Link>
      </div>
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link className="btn btn-primary">Gestionar ordenes</Link>
      </div>
      {/* <div className="lg:flex">
        <DateFilter
          id="initialDate"
          label="Desde"
          value={initialDate}
          onChangeValue={onInitialDateChange}
        />
        <DateFilter
          id="finalDate"
          label="Hasta"
          value={finallDate}
          onChangeValue={onFinalDateChange}
        />
      </div>
      <AdminNegocioOrdersList orders={data} />; */}
    </div>
  );
};

export function loader({ params }) {
  return fetchData(`/orders/negocio/${params.idNegocio}`);
}
