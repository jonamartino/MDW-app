import { useEffect, useState } from "react";
import "../../App.css";
import Card, { Organization } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import SignOutButton from "../../components/SignOutButton";

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
        "http://localhost:4000/organizations/678438645b0352627ba262b7",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${token}`,
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
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        <h3 className="mb-10 bg-black rounded-md w-fit p-2">
          MDW Organizations
        </h3>
      </div>
      <SignOutButton />
      <div className="flex justify-center">
        <h4 className="mb-10 bg-white rounded-md w-fit p-2 text-black">
          List of organizations
        </h4>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="cardsList">
          {organizations.map((organization) => (
            <Card key={organization._id} organization={organization} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Organizations;
