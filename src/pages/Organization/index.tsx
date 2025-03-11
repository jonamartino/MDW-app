// src/components/organizations/Organization.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../slices/users";
import {
  getOrganizationById,
  deleteOrganization,
} from "../../slices/organizations";
import { useSelector, useDispatch } from "../../store/store";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UpdateOrganizationForm from "../../components/UpdateOrganizationForm";
import CreateOrganizationForm from "../../components/CreateOrganizationForm";

const Organization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { selectedOrganization, loading, error } = useSelector(
    (state) => state.reducer.organizations
  );
  const { list: users } = useSelector((state) => state.reducer.users);

  const [firebaseUser, setFirebaseUser] = useState<string | null>(null);
  const [matchedUser, setMatchedUser] = useState<any>(null);
  const [shouldUseUserOrg, setShouldUseUserOrg] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "activities">("info");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user.uid);
      } else {
        setFirebaseUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (firebaseUser && users.length > 0) {
      const matched = users.find((user) => user.firebaseUid === firebaseUser);
      setMatchedUser(matched || null);
    }
  }, [firebaseUser, users]);

  useEffect(() => {
    if (matchedUser) {
      if (!id && matchedUser.organization) {
        setShouldUseUserOrg(true);
      } else if (id && matchedUser.organization === id) {
        setShouldUseUserOrg(true);
      } else {
        setShouldUseUserOrg(false);
      }
    }
  }, [matchedUser, id]);

  useEffect(() => {
    if (matchedUser && shouldUseUserOrg && matchedUser.organization) {
      console.log(
        "Cargando la organización del usuario:",
        matchedUser.organization
      );
      dispatch(getOrganizationById(matchedUser.organization));
    } else if (id) {
      console.log("Cargando la organización de la URL:", id);
      dispatch(getOrganizationById(id));
    }
  }, [dispatch, matchedUser, id, shouldUseUserOrg]);

  // Función para eliminar la organización
  const handleDelete = async () => {
    if (
      selectedOrganization &&
      window.confirm("¿Estás seguro de eliminar la organización?")
    ) {
      await dispatch(deleteOrganization(selectedOrganization._id));
      navigate("/organizations");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col text-emerald-900 py-6 px-10">
      {/* Header con pestañas */}
      <nav className="flex mb-6 border-b pb-1 ">
        <ul className="flex gap-4 ">
          <li
            onClick={() => {
              setActiveTab("info");
              setEditMode(false);
            }}
            className={`cursor-pointer scale-90 ${
              activeTab === "info"
                ? "border-emerald-900 font-bold"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Mi Organización
          </li>
          <li className="">|</li>
          <li
            onClick={() => {
              setActiveTab("activities");
              setEditMode(false);
            }}
            className={`cursor-pointer scale-90 ${
              activeTab === "activities"
                ? "border-emerald-900 font-bold"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Actividades
          </li>
        </ul>
      </nav>

      {activeTab === "info" && (
        <div className="bg-white shadow-md rounded p-6 ">
          {selectedOrganization ? (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedOrganization.name}
              </h2>
              <p className="mb-4">{selectedOrganization.description}</p>
              {matchedUser && matchedUser.role === "organization" && (
                <>
                  {editMode ? (
                    <UpdateOrganizationForm
                      organization={selectedOrganization}
                    />
                  ) : (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setEditMode(true)}
                        className="text-emerald-900 border border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
                      >
                        Editar Organización
                      </button>
                      <button
                        onClick={handleDelete}
                        className="text-emerald-900 border border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
                      >
                        Eliminar Organización
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div>
              {matchedUser && matchedUser.role === "organization" ? (
                <CreateOrganizationForm />
              ) : (
                <p>
                  No se encontró la organización. Verifica el ID o consulta al
                  administrador.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "activities" && (
        <div className="bg-white shadow-md rounded p-6 ">
          <h2 className="text-2xl font-bold mb-4">Actividades</h2>
          <p>Aquí se listarán las actividades de la organización.</p>
          <button
            onClick={() => navigate("/activities/create")}
            className="text-emerald-900 border border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
          >
            Crear Actividad
          </button>
        </div>
      )}
    </div>
  );
};

export default Organization;
