import React from "react";

export const NegocioCard = ({ negocio }) => {
  return (
    <>
      {negocio && (
        <div className="w-full bg-base-200 rounded-lg p-6 flex items-center gap-6">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-md w-16 xl:w-20">
              <span className="text-xl xl:text-3xl">
                <img
                  src={`/assets/negocio/${negocio.username}.jpeg`}
                  alt={negocio.username}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl">{negocio.name}</h3>
            <p>Teléfono: {negocio.phone}</p>
            <p>Dirección: {negocio.direction}</p>
          </div>
        </div>
      )}
    </>
  );
};
