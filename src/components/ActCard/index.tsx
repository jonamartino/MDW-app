import { useEffect, useState } from "react";

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  capacity: number;
  organization: Address;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isActive: boolean;
  isFull: boolean;
}

/* interface Organization {
  _id: string;
  name: string;
}
 */
const ActCard = ({ activity }: { activity: Activity }) => {
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationAddress, setOrganizationAddress] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrganizationName = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/organizations/${activity.organization}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.data && data.data.name) {
          setOrganizationName(data.data.name);
          setOrganizationAddress(data.data.address.street);
          console.log("Organization name:", data.data.name);
        }
        console.log("Organization name:", data.data.name);
      } catch (error) {
        console.error("Error fetching organization name:", error);
      }
    };

    fetchOrganizationName();
  }, [activity.organization]);

  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 overflow-hidden transform hover:scale-105">
      {/* Header */}
      <div className="bg-green-100 p-4">
        <h2 className="text-xl font-bold">{activity.title}</h2>
        <p>
          <span className="font-medium">🏢</span>{" "}
          {organizationName || "Cargando..."}
        </p>
      </div>

      <div className="p-1 space-y-1">
        <p className="text-sm text-gray-800">{activity.category}</p>
        <p className="text-sm text-gray-700">{organizationAddress}</p>
        <p className="text-sm text-gray-700">{activity.date}</p>

        {/* Detalles */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-100"></div>
    </div>
  );
};

export default ActCard;
