import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Check password: 1 Upper, 1 Lower, 6+ length [cite: 76, 77]
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      Swal.fire('Error', 'Password must have 1 Uppercase, 1 Lowercase, and 6+ characters', 'error');
      return;
    }
    console.log(data);
    Swal.fire('Success', 'Account created as Pending', 'success');
  };

  return (
    <div className="auth-container">
      <h2>Join GarmentsFlow</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input {...register("name", { required: true })} className="form-control" />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select {...register("role")} className="form-control">
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} className="form-control" />
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;