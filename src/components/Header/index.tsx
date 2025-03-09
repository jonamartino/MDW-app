import { useNavigate } from "react-router-dom";
import { headerList, tokenList } from "./consts";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const path = window.location.pathname;

  // Verificar el estado de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
    <header className="top-0 flex flex-row justify-between w-full text-emerald-900 p-0 px-10">
      <h3 className="text-2xl flex-nowrap">ActivityFinder</h3>
      <nav className="flex justify-end w-auto items-center">
        <ul className="flex flex-row gap-3">
          {!user
            ? headerList.map((item, index) => (
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
              ))
            : tokenList.map((item, index) => (
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
          {user && (
            <li
              className="cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;