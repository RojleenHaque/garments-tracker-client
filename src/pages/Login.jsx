import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Simulate login success (replace with actual API call)
    const user = { name: "Rojleen", email: data.email, role: "buyer" };
    setUser(user); // Update App state
    Swal.fire('Success', 'Logged in successfully', 'success');
    navigate('/'); // Redirect to Home
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
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
