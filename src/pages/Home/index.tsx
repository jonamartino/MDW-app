//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ActCard from "../../components/ActCard";
import { useDispatch, useSelector } from "../../store/store";
import { getActivities } from "../../slices/activities";

const Home = () => {
  const { list, loading } = useSelector((state) => state.reducer.activities);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [sortBy, setSortBy] = useState<"date" | "title">("date"); // Estado para el ordenamiento

  useEffect(() => {
    if (!list.length) {
      dispatch(getActivities());
    }
  }, [dispatch, list]);

  // Función para filtrar actividades
  const filteredActivities = list.filter((activity) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      activity.title.toLowerCase().includes(searchLower) ||
      activity.description.toLowerCase().includes(searchLower) ||
      activity.category.toLowerCase().includes(searchLower)
    );
  });

  // Función para ordenar actividades
  const sortedActivities = filteredActivities.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="flex flex-col min-h-fit p-6 px-10 ">
      {/* Barra de búsqueda y ordenamiento */}
      <div className="bg-green-100 mb-6 ">
        <div className="flex items-center shadow-md p-1 px-4 gap-3 rounded-lg">
          {/* Icono de búsqueda */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="p"
          >
            <path
              fill="bg-gray-800"
              fillRule="evenodd"
              d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426M10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
            ></path>
          </svg>

          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar actividad..."
            className="placeholder-gray-800 text-gray-800 flex-1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="sc-8520dcc6-10 jLGfJv"></div>
          {/* Dropdown para ordenar */}
          <div className="relative ">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "title")}
              className=" rounded-lg p-2 text-gray-800 focus:outline-none focus:text-white focus:ring-2 focus:ring-emerald-500'"
            >
              <option
                value="date"
                className="rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500'"
              >
                Ordenar por fecha
              </option>
              <option value="title">Ordenar por nombre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cargando */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-emerald-800 text-xl font-bold ">Loading...</h1>
        </div>
      ) : (
        <div className="cardsList grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedActivities.map((activity) => (
            <ActCard key={activity._id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
