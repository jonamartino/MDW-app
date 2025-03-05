
export interface Organization {
  _id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Organization = ({ organization}: { organization: Organization }) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
          <span className="font-medium">Dirección:</span> {organization.address}
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