import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch } from "react-redux";
import { createUser } from "../../slices/users";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastname: string;
  birthday: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(signUpSchema),
  });

  const handleSignUp = handleSubmit(async (data) => {
    try {
      // Step 1: Create Firebase Auth user from the frontend
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Extract the Firebase UID
      const firebaseUid = userCredential.user.uid;

      // Direct API call with corrected field names
      const userData = {
        name: data.name,
        lastname: data.lastname,
        // The backend expects 'birthday' not 'birthDate'
        birthday: data.birthday,
        email: data.email,
        password: data.password,
        firebaseUid: firebaseUid,
        isAdmin: false,
      };
      console.log("Direct API call with:", userData);

      // Make direct API call
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (result.error) {
        throw new Error(result.message);
      }

      // Step 3: Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup. Please try again.");
    }
  });

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4 text-emerald-900">Sign Up</h1>
      {error && <p className="text-red-600 font-bold mb-4">{error}</p>}
      <form onSubmit={handleSignUp} className="space-y-4 text-emerald-900">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            className="p-2 border rounded caret-emerald-500"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 font-bold">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastname" className="block mb-1">
            Last Name
          </label>
          <input
            className="p-2 border rounded caret-emerald-500"
            {...register("lastname")}
          />
          {errors.lastname && (
            <p className="text-red-600 font-bold">{errors.lastname.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="birthday" className="block mb-1">
            Birthday
          </label>
          <input
            type="date"
            className="p-2 border rounded caret-emerald-500"
            {...register("birthday")}
          />
          {errors.birthday && (
            <p className="text-red-600 font-bold">{errors.birthday.message}</p>
          )}
        </div>
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
            type="password"
            autoComplete="new-password"
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
            type="password"
            autoComplete="new-password"
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
