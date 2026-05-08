import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setPreviews(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  const onSubmit = async (data) => {
    try {

      // manager info
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // product object
      const productData = {
        name: data.name,
        category: data.category,
        description: data.description,
        price: Number(data.price),
        availableQuantity: Number(data.quantity),
        minQuantity: Number(data.minOrder),

        image:
          previews[0] ||
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

        createdBy: user?.email,

        showOnHome: false,
      };

      // save in DB
      await api.post("/products", productData);

      Swal.fire(
        "Success",
        "Product added successfully",
        "success"
      );

      reset();
      setPreviews([]);

      // REDIRECT
      navigate("/dashboard/manage-products");

    } catch (error) {
      console.log(error);

      Swal.fire(
        "Error",
        "Failed to add product",
        "error"
      );
    }
  };

  return (
    <div className="form-container">

      <h2 className="form-title">
        Add New Garment Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label>Product Name</label>

          <input
            {...register("name", { required: true })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            {...register("category")}
            className="form-input"
          >
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            {...register("description")}
            className="form-input"
          />
        </div>

        <div className="form-group-horizontal">

          <input
            type="number"
            placeholder="Price"
            {...register("price")}
            className="form-input"
          />

          <input
            type="number"
            placeholder="Quantity"
            {...register("quantity")}
            className="form-input"
          />

          <input
            type="number"
            placeholder="Min Order"
            {...register("minOrder")}
            className="form-input"
          />

        </div>

        <div className="form-group">

          <label>Upload Images</label>

          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="form-input"
          />

          <div className="preview-row">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="img-preview"
              />
            ))}
          </div>

        </div>

        <button
          type="submit"
          className="btn-primary"
        >
          Create Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
