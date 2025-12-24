import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Booking = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: `/booking/${id}` } });
      return;
    }

    api
      .get(`/product/${id}`)
      .then(res => {
        setProduct(res.data);
        setValue("productName", res.data.name);
        setValue("price", res.data.price);
      })
      .catch(err => console.error(err));
  }, [id, user, navigate, setValue]);

  const quantity = watch("quantity") || 1;

  const onSubmit = async data => {
    try {
      const res = await api.post("/book-product", {
        ...data,
        quantity: Number(data.quantity),
        productId: id,
      });

      Swal.fire("Success", "Booking placed successfully", "success");
      navigate("/my-orders");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Booking failed",
        "error"
      );
    }
  };

  if (!product) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Book Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input value={user.email} readOnly className="input-field" />
        </div>
        <div>
          <label>Product</label>
          <input {...register('productName')} readOnly className="input-field" />
        </div>
        <div>
          <label>Price per Unit</label>
          <input {...register('price')} readOnly className="input-field" />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" {...register('quantity', { required: true, min: product.minQuantity || 1, max: product.availableQuantity })} className="input-field"/>
          {errors.quantity && <p className="text-red-600">Quantity must be between {product.minQuantity || 1} and {product.availableQuantity}</p>}
        </div>
        <div>
          <label>Order Price</label>
          <input value={(quantity * product.price).toFixed(2)} readOnly className="input-field"/>
        </div>
        <div>
          <label>Payment Method</label>
          <select {...register('paymentMethod')} className="input-field">
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>
        <div>
          <label>Contact Number</label>
          <input {...register('contactNumber', { required: true })} className="input-field"/>
          {errors.contactNumber && <p className="text-red-600">Contact number required</p>}
        </div>
        <div>
          <label>Delivery Address</label>
          <textarea {...register('deliveryAddress', { required: true })} className="input-field"></textarea>
          {errors.deliveryAddress && <p className="text-red-600">Delivery address required</p>}
        </div>
        <div>
          <label>Additional Notes</label>
          <textarea {...register('additionalNotes')} className="input-field"></textarea>
        </div>
        <button type="submit" className="btn-primary w-full mt-4">Place Booking</button>
      </form>
    </div>
  );
};

export default Booking;

