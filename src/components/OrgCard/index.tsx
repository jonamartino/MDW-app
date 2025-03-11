import { Organization as OrganizationType } from "../../types/organizations";

const Organization = ({ organization}: { organization: OrganizationType }) => {

  return (
    <div className="bg-green-100 rounded-lg shadow-md p-6">
      {/* Nombre de la organización */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {organization.name}
      </h2>

      {/* Descripción */}
      <p className="text-gray-600 text-sm mb-4">{organization.description}</p>

      {/* Información de contacto */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Email:</span> {organization.email}
        </p>
        <p>
          <span className="font-medium">Teléfono:</span> {organization.phone}
        </p>
        <p>
          <span className="font-medium">Dirección:</span> {organization.address.street}
        </p>
        <p>
          <span className="font-medium">Sitio Web:</span> {organization.website}
        </p>
      </div>

      {/* Fechas */}
      <div className="mt-4 text-xs text-gray-500">
        <p>
          Creado el: {new Date(organization.createdAt).toLocaleDateString()}
        </p>
        <p>
          Última actualización:{" "}
          {new Date(organization.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Organization;