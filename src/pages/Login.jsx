import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/'; // Redirect destination after login

  const onSubmit = (data) => {
    // Simulate login success (replace with actual API call)
    const user = { name: "Rojleen", email: data.email, role: "buyer", status: "active" };
    setUser(user); // Update App state
    Swal.fire('Success', 'Logged in successfully', 'success');

    // Redirect to the original page or home
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input {...register("email", { required: true })} placeholder="example@mail.com" />
          {errors.email && <span className="error">Email is required</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password", { required: true })} placeholder="Enter password" />
          {errors.password && <span className="error">Password is required</span>}
        </div>

        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/register" className="text-orange-600 hover:text-orange-800 font-semibold">Register here</Link>
      </p>
    </div>
  );
};

export default Login;

