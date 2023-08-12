import { Link, useLoaderData } from "react-router-dom";
import { AdminCadetesList } from "../../components/admin/adminCadeteList";
import { fetchData } from "../../utils/fetch";

export const AdminCadetesPage = () => {
  const data = useLoaderData();
  return (
    <div className="w-5/6 mx-auto lg:w-4/5">
      <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
        <Link to={"new"} className="btn btn-primary">
          Nuevo cadete
        </Link>
      </div>
      <AdminCadetesList cadetes={data} />
    </div>
  );
};

export function loader() {
  return fetchData("/cadete");
}
