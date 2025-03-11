import { useNavigate } from "react-router-dom";
import { headerList, userList, organizationList } from "./consts";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useSelector, useDispatch } from "../../store/store";
import { getUsers } from "../../slices/users";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const path = window.location.pathname;

  
  const { list: users } = useSelector((state) => state.reducer.users);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      if (user) {
        dispatch(getUsers());
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (firebaseUser && users.length > 0) {
      const matchedUser = users.find(
        (user) => user.firebaseUid === firebaseUser.uid
      );
      if (matchedUser) {
        setUserRole(matchedUser.role);
      }
    }
  }, [firebaseUser, users]);

  const getMenuItems = () => {
    if (!firebaseUser) return headerList;

    if (userRole === "organization") {
      return organizationList;
    } else {
      return userList;
    }
  };

  const handleClick = (link: string) => {
    navigate(link);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="flex flex-row justify-between text-emerald-900 px-10">
      <h3 className="text-2xl flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-7 stroke-1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
        ActivityFinder
      </h3>
      <nav className="flex justify-end w-auto items-center">
        <ul className="flex flex-row gap-3">
          {getMenuItems().map((item, index) => (
            <li
              className={
                (path === item.link ? "underline font-bold" : "") +
                " cursor-pointer"
              }
              key={index}
              onClick={() => handleClick(item.link)}
            >
              {item.title}
            </li>
          ))}
          {firebaseUser && (
            <li className="cursor-pointer text-red-500" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
