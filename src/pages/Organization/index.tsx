import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../App.css";
import { Organization as OrganizationData } from "../../components/OrgCard";

const Organization = () => {
  const [organization, setOrganization] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:4000/organizations/${id}`);
    const data = await response.json();
    setOrganization(data); // Asegúrate de que `data.data` contiene el objeto de la organización
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    loading ? 
    <h1>Loading...</h1> : (
    <div>
      <h1>{organization?.name}</h1>
      <p>{organization?.description}</p>
      <button onClick={() => navigate("/organization")}>Go Back</button>
    </div>
    )
  );
};

export default Organization;