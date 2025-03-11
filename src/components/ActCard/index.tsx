import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Activity } from "../../types/activities";
import { getOrganizationById } from "../../slices/organizations";

const ActCard = ({ activity }: { activity: Activity }) => {
  const dispatch = useDispatch();

  // Traer los datos desde el store
  const { list } = useSelector((state) => state.reducer.organizations);
  const organization = list.find(org => org._id === activity.organization);

  useEffect(() => {
    if (!organization) {
      dispatch(getOrganizationById(activity.organization));
    }
  }, [dispatch, activity.organization, organization]);

  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 overflow-hidden transform hover:scale-105">
      {/* Header */}
      <div className="bg-green-100 p-4">
        <h2 className="text-xl font-bold">{activity.title}</h2>
        <p>
          <span className="font-medium">🏢</span>{" "}
          {organization ? organization.name : "Cargando..."}
        </p>
      </div>

      <div className="p-1 space-y-1">
        <p className="text-sm text-gray-800">{activity.category}</p>
        <p className="text-sm text-gray-700">{organization?.address?.street || "Cargando..."}</p>
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
