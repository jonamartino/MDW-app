interface OrganizationDashboardProps {
    organization: {
      _id: string;
      name: string;
      description: string;
      email: string;
      phone: string;
      address: {
        street: string;
        city: string;
        state: string;
        country: string;
      };
      website?: string;
      // Otros campos que tengas...
    };
  }
  
  const OrganizationDashboard = ({ organization }: OrganizationDashboardProps) => {
    return (
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2">{organization.name}</h2>
        <p className="mb-2">{organization.description}</p>
        <p className="mb-2">
          <strong>Email:</strong> {organization.email}
        </p>
        <p className="mb-2">
          <strong>Teléfono:</strong> {organization.phone}
        </p>
        <p className="mb-2">
          <strong>Dirección:</strong>{" "}
          {`${organization.address.street}, ${organization.address.city}, ${organization.address.state}, ${organization.address.country}`}
        </p>
        {organization.website && (
          <p className="mb-2">
            <strong>Sitio Web:</strong>{" "}
            <a
              href={organization.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {organization.website}
            </a>
          </p>
        )}
        {/* Aquí podrías agregar botones para editar o administrar actividades */}
      </div>
    );
  };
  
  export default OrganizationDashboard;
  