import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold  mb-4  text-emerald-900" >Login</h1>
      <form className="space-y-4  text-emerald-900">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            onChange={handleEmailChange}
            className=" p-2 border rounded caret-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 ">
            Password
          </label>
          <input
            type="password"
            onChange={handlePasswordChange}
            className=" p-2 border rounded caret-emerald-500"
          />
        </div>
        <button
          type="button"
          onClick={handleLogIn}
          className="text-emerald-900 border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;