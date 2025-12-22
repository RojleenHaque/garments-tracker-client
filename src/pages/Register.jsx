import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit } = useForm(); // removed 'errors' since it was unused
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (data.role === 'manager') {
        data.password = 'Admin@123';
      }

      await axios.post('http://localhost:5000/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      Swal.fire('Success', 'Account created successfully', 'success');
      navigate('/login');

    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} placeholder="Name" />
        <input {...register('email', { required: true })} placeholder="Email" />

        <select {...register('role')}>
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
        </select>

        <input type="password" {...register('password')} placeholder="Password" />

        <button type="submit">Register</button>
      </form>

      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
