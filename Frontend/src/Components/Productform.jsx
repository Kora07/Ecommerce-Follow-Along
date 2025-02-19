import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

export const ProductForm = () => {
   const { id } = useParams();
   const navigate=useNavigate()
    const isEdit = Boolean(id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [tag, setTag] = useState("");
  const [email, setEmail] = useState("");

  const [preview, setPreview] = useState([]);
  const [image, setImage] = useState([]);


  useEffect(() => {
    if (isEdit) {
        axios
            .get(`http://localhost:8000/api/v2/product/product/${id}`)
            .then((response) => {
                const p = response.data.product;
                setName(p.name);
                setDescription(p.description);
                setCategory(p.category);
                setTag(p.tags || "");
                setPrice(p.price);
                setStock(p.stock);
                setEmail(p.email);
                if (p.images && p.images.length > 0) {
                    setPreview(
                        p.images.map((imgPath) => `http://localhost:3000${imgPath}`)
                    );
                }
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
            });
    }
}, [id, isEdit]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    
    // Update state with new images
    setImage(files);

    // Generate previews
    const imgPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(imgPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("tag", tag);

    image.forEach((img) => formData.append("image", img));

    try {

      if (isEdit) {
        const response = await axios.put(
            `http://localhost:8000/api/v2/product/update-product/${id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (response.status === 200) {
            alert("Product updated successfully!");
            navigate("/my-products");
        }
    }
     else {
        const res = await axios.post("http://localhost:3000/product/post-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
  
      });
  

      if (res.status === 200) {
        alert("Product Added Successfully");

        // Reset form
        setEmail("");
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setTag("");
        setImage([]);
        setPreview([]);
      }
    } 
  } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} 
            placeholder="Enter Your Email"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input type="text" required onChange={(e) => setName(e.target.value)} value={name} 
            placeholder="Enter Product Name"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Price</label>
          <input type="number" required onChange={(e) => setPrice(e.target.value)} value={price} 
            placeholder="Enter Product Price"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Description</label>
          <input type="text" required onChange={(e) => setDescription(e.target.value)} value={description} 
            placeholder="Enter Description"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Category</label>
          <input type="text" required onChange={(e) => setCategory(e.target.value)} value={category} 
            placeholder="Enter Category"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Stock</label>
          <input type="number" required onChange={(e) => setStock(e.target.value)} value={stock} 
            placeholder="Enter Stock"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Tag</label>
          <input type="text" required onChange={(e) => setTag(e.target.value)} value={tag} 
            placeholder="Enter Tag"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Image</label>
          <input type="file" multiple required onChange={handleImage} id="upload" className="hidden" />
          
          <label htmlFor="upload" className="flex items-center gap-2 cursor-pointer text-blue-500 hover:text-blue-700">
            <AiOutlinePlusCircle size={24} />
            <span>Upload Images</span>
          </label>
        </div>

        {preview.length > 0 && (
          <div className="mb-4 flex gap-2">
            {preview.map((img, index) => (
              <img src={img} key={index} alt="preview" className="h-20 w-20 object-cover rounded-md shadow" />
            ))}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
