import { useEffect, useState } from "react";
import "../../App.css";
import OrgCard, { Organization } from "../../components/OrgCard";
//import { useNavigate } from "react-router-dom";

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  //const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/organizations/");
    const data = await response.json();
    setOrganizations(data.data); // Asegúrate de que `data.data` contiene el objeto de la organización
    setLoading(false);
  };

  const token = localStorage.getItem("token");
  const fetchProductById = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/organizations/67cd10e304f1db00135c7f09",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetchProductById", response);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductById();
  }, []);

  return (
    <div className="flex justify-center flex-col min-h-screen p-6">
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
          {organizations.map((organization) => (
            <OrgCard key={organization._id} organization={organization} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Organizations;