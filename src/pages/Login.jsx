import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/login',
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      const loggedInUser = res.data.user;
      setUser(loggedInUser); // store user in context or state

      Swal.fire('Success', 'Logged in successfully', 'success');

      // Redirect based on role
      switch (loggedInUser.role) {
        case 'admin':
          navigate('/dashboard/manage-users', { replace: true });
          break;
        case 'manager':
          navigate('/dashboard/add-product', { replace: true });
          break;
        default:
          navigate('/dashboard/my-orders', { replace: true });
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Login failed';
      Swal.fire('Error', msg, 'error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input
            {...register('email', { required: true })}
            placeholder="example@mail.com"
          />
          {errors.email && <span className="error">Email is required</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Enter password"
          />
          {errors.password && <span className="error">Password is required</span>}
        </div>

        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;

