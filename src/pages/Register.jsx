import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      Swal.fire('Error', 'Password must have 1 Uppercase, 1 Lowercase, and 6+ characters', 'error');
      return;
    }

    // Simulate account creation
    console.log(data);
    Swal.fire('Success', 'Account created successfully', 'success');
    navigate('/login'); // Redirect to Login page after registration
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input {...register("name", { required: true })} placeholder="John Doe" />
          {errors.name && <span className="error">Name is required</span>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <select {...register("role")}>
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} placeholder="Enter strong password" />
        </div>

        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
