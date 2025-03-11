// src/components/organizations/CreateOrganizationForm.tsx
import React, { useState } from "react";
import { useDispatch } from "../../store/store";
import { createOrganization } from "../../slices/organizations";

const CreateOrganizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createOrganization(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mt-4 bg-gray-50">
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
      </div>
      <div className="mb-2">
        <label className="block font-semibold">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Crear Organización
      </button>
    </form>
  );
};

export default CreateOrganizationForm;
