import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./validations";
import { joiResolver } from "@hookform/resolvers/joi";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(signUpSchema),
  });

  const handleSignUp = handleSubmit(async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold  mb-4  text-emerald-900">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4 text-emerald-900">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            className="p-2 border rounded caret-emerald-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 font-bold">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            className="p-2 border rounded caret-emerald-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 font-bold">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="repeatPassword" className="block mb-1">
            Repeat Password
          </label>
          <input
            className="p-2 border rounded caret-emerald-500"
            {...register("repeatPassword")}
          />
          {errors.repeatPassword && (
            <p className="text-red-600 font-bold">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-emerald-900 border-emerald-900 px-4 py-2 rounded duration-300 transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
