import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import api from "../api/axios";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1. Firebase user create
      const result = await createUser(data.email, data.password, data.name);

      const user = result.user;

      // 2. Save role in MongoDB
      await api.post("/users", {
        name: data.name,
        email: data.email,
        role: data.role,   // 👈 IMPORTANT
        photoURL: user.photoURL || "",
        status: "pending"
      });

      Swal.fire("Success", "Account created successfully", "success");

      navigate("/login");

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("name", { required: true })} placeholder="Name" />

        <input {...register("email", { required: true })} placeholder="Email" />

        {/* 👇 ROLE DROPDOWN (IMPORTANT FOR ASSIGNMENT) */}
        <select {...register("role", { required: true })}>
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
        </select>

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;