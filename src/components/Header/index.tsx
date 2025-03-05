import { useNavigate } from "react-router-dom";
import {headerList, tokenList} from "./consts";

const Header = () => {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const handleClick = (link: string) => {
    navigate(link);
  };

  const token = localStorage.getItem("token");

  return (
    <header className="top-0 flex flex-row  justify-between w-full bg-gray-800 p-4">
      <h3 className="text-2xl flex-nowrap">MDW - App</h3>
      <nav className="flex justify-end w-auto items-center">
        <ul className="flex flex-row gap-3">
          {
          !token ? headerList.map((item, index) => (
            <li className={(path === item.link ? "underline font-bold" : "") + "cursor-pointer"} key={index} onClick={() => handleClick(item.link)}>
              {item.title}
            </li>
          ))
          : tokenList.map((item, index) => (
            <li className={(path === item.link ? "underline font-bold" : "") + "cursor-pointer"} key={index} onClick={() => handleClick(item.link)}>
              {item.title}
            </li>
          ))
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
