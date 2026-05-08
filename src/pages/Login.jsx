import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const email = data.email.trim();
      const password = data.password;

      let userData = null;

      // ======================
      // ADMIN LOGIN
      // ======================
      if (
        email === "admin@gmail.com" &&
        password === "Admin@12345"
      ) {
        userData = {
          name: "Admin",
          email,
          role: "admin",
          status: "active",
        };

        localStorage.setItem("user", JSON.stringify(userData));

        Swal.fire("Success", "Admin Login Successful", "success");

        navigate(from || "/dashboard/manage-users", {
          replace: true,
        });

        return;
      }

      // ======================
      // MANAGER LOGIN
      // ======================
      if (
        email === "manager@gmail.com" &&
        password === "Manager@12345"
      ) {
        userData = {
          name: "Manager",
          email,
          role: "manager",
          status: "active",
        };

        localStorage.setItem("user", JSON.stringify(userData));

        Swal.fire("Success", "Manager Login Successful", "success");

        navigate(from || "/dashboard/add-product", {
          replace: true,
        });

        return;
      }

      // ======================
      // BUYER LOGIN
      // ======================
      const userCredential = await signIn(email, password);

      const user = userCredential.user;

      userData = {
        name: user.displayName || "Buyer",
        email: user.email,
        role: "buyer",
        status: "active",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      Swal.fire("Success", "Login Successful", "success");

      navigate(from || "/dashboard/my-orders", {
        replace: true,
      });

    } catch (err) {
      console.log(err);

      Swal.fire(
        "Error",
        "Wrong email or password",
        "error"
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
        />

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;