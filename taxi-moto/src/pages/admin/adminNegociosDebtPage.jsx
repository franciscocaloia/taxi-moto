import React, { useEffect, useState } from "react";
import { fetchData, submitData } from "../../utils/fetch";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { DateFilter } from "../../components/utils/dateFilter";

export const AdminNegociosDebtPage = () => {
  const data = useActionData();
  console.log(data);
  const [initDate, setInitDate] = useState();
  const [finalDate, setFinalDate] = useState();

  function onInitDateChange(e) {
    setInitDate(e.target.value);
  }
  function onFinalDateChange(e) {
    setFinalDate(e.target.value);
  }
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <Form className="lg:flex lg:items-center" method="post">
        <DateFilter
          id="initDate"
          label="Desde"
          value={initDate}
          onChangeValue={onInitDateChange}
        />
        <DateFilter
          id="finalDate"
          label="Hasta"
          value={finalDate}
          onChangeValue={onFinalDateChange}
        />
        <button
          disabled={!initDate || !finalDate}
          className="btn btn-primary"
          type="submit"
        >
          Consultar deuda
        </button>
      </Form>

      {data && <p className="m-6">El monto a cobrar es de: ${data}</p>}
    </>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();
  const initDate = data.get("initDate");
  const finalDate = data.get("finalDate");
  return fetchData(
    `/orders/negocio/${params.idNegocio}/debt?initDate=${Date.parse(
      initDate
    )}&finalDate=${Date.parse(finalDate)}`
  );
}
export function loader({ params }) {
  return fetchData(`/orders/negocio/${params.idNegocio}`);
}
