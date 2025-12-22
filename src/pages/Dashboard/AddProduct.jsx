import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews(urls); // Requirement: Preview images before uploading [cite: 189]
  };

  const onSubmit = (data) => {
    // Logic to save to database via API [cite: 191]
    Swal.fire("Success", "Product added to inventory!", "success");
    reset();
    setPreviews([]);
  };

  return (
    <div className="form-container">
      <h2>Add New Garment Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input {...register("name", { required: true })} className="form-control" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select {...register("category")} className="form-control">
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description", { required: true })} className="form-control" />
        </div>

        <div className="form-grid">
          <input type="number" placeholder="Price" {...register("price")} className="form-control" />
          <input type="number" placeholder="Quantity" {...register("quantity")} className="form-control" />
          <input type="number" placeholder="Min Order" {...register("minOrder")} className="form-control" />
        </div>

        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} className="form-control" />
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