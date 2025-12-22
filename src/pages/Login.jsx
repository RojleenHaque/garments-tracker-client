import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  /* -------- PASSWORD LOGIN -------- */
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/login',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      setUser(res.data.user);
      Swal.fire('Success', 'Logged in successfully', 'success');
      navigate(from, { replace: true });

    } catch {
      Swal.fire('Error', 'Invalid email or password', 'error');
    }
  };

  /* -------- GOOGLE LOGIN -------- */
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      setUser(user);
      Swal.fire('Success', 'Logged in with Google', 'success');
      navigate(from, { replace: true });

    } catch {
      Swal.fire('Error', 'Google login failed', 'error');
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
          {errors.password && (
            <span className="error">Password is required</span>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

      <button onClick={handleGoogleLogin} className="btn-google">
        Continue with Google
      </button>

      <p className="mt-4">
        Don’t have an account?{' '}
        <Link to="/register" className="text-orange-600 font-semibold">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
