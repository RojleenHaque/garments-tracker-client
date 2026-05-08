import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "../api/axios";

const Booking = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // login protection
  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { from: `/booking/${id}` },
      });
    }
  }, [id, navigate, user]);

  // load product
  useEffect(() => {

    api.get(`/product/${id}`)
      .then((res) => {

        setProduct(res.data);

        setValue("email", user?.email);
        setValue("productName", res.data.name);
        setValue("price", res.data.price);

      });

  }, [id, setValue, user]);

  const quantity = watch("quantity") || 1;

  const totalPrice =
    quantity * (product?.price || 0);

  const onSubmit = async (data) => {

    if (quantity < product.minQuantity) {
      return Swal.fire(
        "Error",
        `Minimum order quantity is ${product.minQuantity}`,
        "error"
      );
    }

    if (quantity > product.availableQuantity) {
      return Swal.fire(
        "Error",
        "Quantity exceeds stock",
        "error"
      );
    }

    try {

      await api.post("/book-product", {
        ...data,
        productId: id,
        quantity: Number(quantity),
        totalPrice,
        userEmail: user.email,
      });

      Swal.fire(
        "Success",
        "Booking placed successfully",
        "success"
      );

      navigate("/dashboard/my-orders");

    } catch (err) {

      Swal.fire(
        "Error",
        "Booking failed",
        "error"
      );
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">

      <h2 className="form-title">
        Product Booking
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label>Email</label>

          <input
            {...register("email")}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Product</label>

          <input
            {...register("productName")}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Price Per Unit</label>

          <input
            {...register("price")}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>

          <input
            type="number"
            {...register("quantity", {
              required: true,
            })}
            className="form-input"
          />

          {errors.quantity && (
            <p className="error">
              Quantity required
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Total Price</label>

          <input
            value={totalPrice}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>

          <select
            {...register("paymentMethod")}
            className="form-input"
          >
            <option value="COD">
              Cash On Delivery
            </option>

            <option value="Online">
              Online Payment
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact Number</label>

          <input
            {...register("contactNumber", {
              required: true,
            })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Delivery Address</label>

          <textarea
            {...register("deliveryAddress", {
              required: true,
            })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Additional Notes</label>

          <textarea
            {...register("additionalNotes")}
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
        >
          Place Booking
        </button>

      </form>
    </div>
  );
};

export default Booking;