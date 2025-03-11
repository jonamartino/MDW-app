import { useEffect } from "react";
import "../../App.css";
import OrgCard from "../../components/OrgCard";
import { useSelector, useDispatch } from "../../store/store";
import { getOrganizations } from "../../slices/organizations";

const Organizations = () => {

  const { list, loading } = useSelector((state) => state.reducer.organizations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!list.length) {
      dispatch(getOrganizations());
    }
  }, [dispatch, list]);

  return (
    <div className="flex justify-center flex-col min-h-screen py-6 px-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-emerald-900 mb-4">
          🏟️ Organizaciones Destacadas
        </h2>
        <p className="text-emerald-600 text-lg">
          Descubre espacios para tu próxima actividad saludable
        </p>
      </div>

      {/* Cargando */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-green-700 text-xl font-bold">Loading...</h1>
          <p className="text-emerald-600 text-lg">
            Descubre espacios para tu próxima actividad saludable
          </p>
        </div>
      ) : (
        <div className="cardsList grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((organization) => (
            <OrgCard key={organization._id} organization={organization} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Organizations;
