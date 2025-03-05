import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSignUp = handleSubmit(async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="name">Email</label>
        <input
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email is not valid",
            },
            })}
            type="email"
            id="email"
        />
        {errors.email && <p className="text-red-600 font-bold">{errors.email.message}</p>}
        </div>
        <div>
        <label htmlFor="email">Password</label>
        <input
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 10,
              message: "Password must be less than 10 characters",
            },
            })}
            type="password"
            id="password"
        />

        {errors.password && <p className="text-red-600 font-bold">{errors.password.message}</p>}
    </div>
    <div>
        <label htmlFor="email">Repeat Password</label>
        <input
          {...register("repeatPassword", {
            required: { value: true, message: "Repeat Password is required" },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 10,
              message: "Password must be less than 10 characters",
            },
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
            })}
            type="password"
            id="repeatPassword"
        />
        {errors.repeatPassword && <p className="text-red-600 font-bold">{errors.repeatPassword.message}</p>}
        </div>
        <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
