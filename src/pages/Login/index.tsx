import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { loginSchema } from "./validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(loginSchema),
  });

  const handleLogIn = async (data: FormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4 text-emerald-900">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogIn)}
        className="space-y-4 text-emerald-900"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="p-2 border rounded caret-emerald-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="p-2 border rounded caret-emerald-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de Login */}
        <button
          type="submit"
          className="text-emerald-900 border border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
