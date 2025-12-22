import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const onSubmit = (data) => {
    Swal.fire("Success", "Product added to inventory!", "success");
    reset();
    setPreviews([]);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Garment Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product Name</label>
          <input {...register("name", { required: true })} className="form-input" />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select {...register("category")} className="form-input">
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description")} className="form-input" />
        </div>
        <div className="form-group-horizontal">
          <input type="number" placeholder="Price" {...register("price")} className="form-input" />
          <input type="number" placeholder="Quantity" {...register("quantity")} className="form-input" />
          <input type="number" placeholder="Min Order" {...register("minOrder")} className="form-input" />
        </div>
        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} className="form-input" />
          <div className="preview-row">
            {previews.map((src, i) => <img key={i} src={src} alt="preview" className="img-preview" />)}
          </div>
        </div>
        <button type="submit" className="btn-primary">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
