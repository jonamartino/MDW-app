import { useState, FormEvent } from "react";

interface CreateOrganizationFormProps {
  onOrganizationCreated: (org: unknown) => void;
}

const CreateOrganizationForm = ({ onOrganizationCreated }: CreateOrganizationFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const organizationPayload = {
      name,
      description,
      email,
      phone,
      address: {
        street,
        city,
        state,
        country,
      },
      website,
    };

    try {
      const response = await fetch("http://localhost:4000/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Si es necesario, agrega el token de autorización aquí
        },
        body: JSON.stringify(organizationPayload),
      });
      const data = await response.json();
      if (response.ok && data.data) {
        onOrganizationCreated(data.data);
      } else {
        setError(data.message || "Error al crear la organización.");
      }
    } catch (err) {
      console.error("Error creating organization:", err);
      setError("Error al conectar con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white text-emerald-900 p-6 rounded shadow-md">
      <h2 className="text-xl  font-bold mb-4">Crear Organización</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Teléfono:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Calle:</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Ciudad:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Estado:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">País:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sitio Web:</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Creando..." : "Crear Organización"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrganizationForm;
