import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrganizationById } from "../../slices/organizations";
import { getUsers } from "../../slices/users"; // Importar la acción para obtener los usuarios
import { useSelector, useDispatch } from "../../store/store";
import { auth } from "../../config/firebase";
import { User as AppUser } from "../../types/users"; // Tipo de usuario de la app
import { onAuthStateChanged } from "firebase/auth";

const Organization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { selectedOrganization, loading, error } = useSelector((state) => state.reducer.organizations);
  const { list: users } = useSelector((state) => state.reducer.users);

  const [firebaseUser, setFirebaseUser] = useState<string | null>(null);
  const [matchedUser, setMatchedUser] = useState<AppUser | null>(null);

  useEffect(() => {
    // Obtener el usuario autenticado en Firebase
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
    if (id) {
      dispatch(getOrganizationById(id));
    }
    dispatch(getUsers()); // Obtener los usuarios de Redux al cargar la página
  }, [dispatch, id]);

  useEffect(() => {
    if (firebaseUser && users.length > 0) {
      const matched = users.find((user) => user.firebaseUid === firebaseUser);
      setMatchedUser(matched || null);
    }
  }, [firebaseUser, users]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="text-emerald-900">
      <h2>{selectedOrganization?.name}</h2>
      <p>{selectedOrganization?.description}</p>

      {/* Mostrar información del usuario autenticado */}
      {matchedUser ? (
        <div>
          <h3>Bienvenido, {matchedUser.name} {matchedUser.lastname}</h3>
          <p>Rol: {matchedUser.role}</p>
          {matchedUser.organization === selectedOrganization?.name ? (
            <p>Perteneces a esta organización ✅</p>
          ) : (
            <p>No perteneces a esta organización ❌</p>
          )}
        </div>
      ) : (
        <p>No se encontró el usuario autenticado en la base de datos.</p>
      )}

      <button onClick={() => navigate("/organizations")}>Go Back</button>
    </div>
  );
};

export default Organization;
