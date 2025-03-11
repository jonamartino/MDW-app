import React, { useState } from "react";
import { useDispatch } from "../../store/store";
import { createOrganization } from "../../slices/organizations";
import { validateOrganizationCreate } from "../../pages/Organization/validations";
import { Organization } from "../../types/organizations";

const CreateOrganizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialFormState = {
    name: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    logo: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
  };

  const [formData, setFormData] = useState(initialFormState);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    // Limpiar el mensaje de éxito cuando el usuario empieza a editar de nuevo
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setValidationErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = validateOrganizationCreate(formData);

    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((detail) => {
        if (detail.context?.key) {
          errors[detail.context.key] = detail.message;
        }
      });
      setValidationErrors(errors);
      console.error("Validation Errors:", errors);
      return;
    }

    setValidationErrors({});

    try {
      await dispatch(createOrganization(formData));
      setSuccessMessage("¡Organización creada exitosamente!");
      resetForm();

      // Opcionalmente, puedes hacer que el mensaje desaparezca después de unos segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error al crear la organización:", error);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded mt-4 bg-gray-50"
      >
        <h2 className="text-xl font-semibold mb-2">Crear Organización</h2>

        <div className="mb-2">
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm">{validationErrors.name}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors.description && (
            <p className="text-red-500 text-sm">
              {validationErrors.description}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm">{validationErrors.email}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Sitio Web</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors.website && (
            <p className="text-red-500 text-sm">{validationErrors.website}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors.logo && (
            <p className="text-red-500 text-sm">{validationErrors.logo}</p>
          )}
        </div>

        <h3 className="text-lg font-semibold mt-4 mb-2">Dirección</h3>

        <div className="mb-2">
          <label className="block font-semibold">Calle</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors["address.street"] && (
            <p className="text-red-500 text-sm">
              {validationErrors["address.street"]}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Ciudad</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors["address.city"] && (
            <p className="text-red-500 text-sm">
              {validationErrors["address.city"]}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">Estado/Provincia</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors["address.state"] && (
            <p className="text-red-500 text-sm">
              {validationErrors["address.state"]}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-semibold">País</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {validationErrors["address.country"] && (
            <p className="text-red-500 text-sm">
              {validationErrors["address.country"]}
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="text-emerald-900 border border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
          >
            Crear Organización
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="text-emerald-900 border border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
          >
            Limpiar Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrganizationForm;
