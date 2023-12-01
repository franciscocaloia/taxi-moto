import React from "react";
import { useSelector } from "react-redux";
import { useSubmit } from "react-router-dom";
import { submitData } from "../../utils/fetch";

export const CadeteInfoPage = () => {
  const submit = useSubmit();
  function onClick(e) {
    submit(null, { method: "put" });
  }
  const user = useSelector((state) => state.auth);
  return (
    <div className="w-full h-full p-6 lg:w-4/5 xl:w-2/3  mx-auto">
      <div className="card p-6 bg-base-100 shadow-xl">
        <h2 className="card-title capitalize border-b-2 border-b-base-200 max-w-sm">
          Ganancia acumulada: ${user?.earnings}
        </h2>
        <button className="btn btn-primary max-w-sm" onClick={onClick}>
          Reiniciar acumulador
        </button>
      </div>
    </div>
  );
};

export function action({ params }) {
  return submitData(
    `/user/${params.idCadete}`,
    {
      method: "put",
      body: JSON.stringify({
        earnings: 0,
      }),
    },
    `/cadete/${params.idCadete}/info`
  );
}
