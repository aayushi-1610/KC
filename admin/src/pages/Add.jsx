import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const Add = () => {
  const [imagePreviews, setImagePreviews] = useState({});
  const [imageFiles, setImageFiles] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Chiffon");
  const [subCategory, setSubCategory] = useState("Formal");
  const [bestseller, setBestseller] = useState(false);

  const handleImageChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPEG, PNG, or WebP image.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size is too large. Please upload an image smaller than 5MB.");
        return;
      }

      setImagePreviews((prev) => ({ ...prev, [imageKey]: URL.createObjectURL(file) }));
      setImageFiles((prev) => ({ ...prev, [imageKey]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller.toString());

      // Append images with correct keys
      Object.keys(imageFiles).forEach((key) => {
        formData.append(key, imageFiles[key]);
      });

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in! Please log in first.");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert("Product added successfully!");
        setName("");
        setDescription("");
        setCategory("Chiffon");
        setSubCategory("Formal");
        setBestseller(false);
        setImagePreviews({});
        setImageFiles({});
      }
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Failed to add product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-start gap-3">
      {/* Image Upload Section */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-3">
          {["image1", "image2", "image3", "image4"].map((key) => (
            <label key={key} htmlFor={key} className="cursor-pointer">
              <img 
                className="w-20 h-20 object-cover border" 
                src={imagePreviews[key] || assets.upload_area} 
                alt="Upload Preview" 
              />
              <input 
                type="file" 
                id={key} 
                hidden 
                accept="image/*"
                onChange={(e) => handleImageChange(e, key)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input 
          className="w-full max-w-[500px] px-3 py-2 border rounded" 
          type="text" 
          placeholder="Enter product name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
          aria-label="Product Name"
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea 
          className="w-full max-w-[500px] px-3 py-2 border rounded" 
          placeholder="Enter product description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required 
          aria-label="Product Description"
        ></textarea>
      </div>


     

      {/* Category & Subcategory */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select 
            className="w-full px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Product Category"
          >
            <option value="organza">Organza</option>
            <option value="chiffon">Chiffon</option>
            <option value="silk">Silk</option>
            <option value="cotton">Cotton</option>
            <option value="denim">Denim</option>
          </select>
        </div>
        <div>
          <p className="mb-2">SubCategory</p>
          <select 
            className="w-full px-3 py-2 border rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            aria-label="Product Subcategory"
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="partywear">Party Wear</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
          </select>
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input 
          type="checkbox" 
          id="bestseller" 
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          aria-label="Bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded">
        ADD
      </button>
    </form>
  );
};

export default Add;
