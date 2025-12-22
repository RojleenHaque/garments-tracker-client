import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire('Success', 'Logged in successfully', 'success');
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
    </div>
  );
};

export default Login;
