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
      <h3 className="text-2xl flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7 stroke-1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
        ActivityFinder
      </h3>
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
