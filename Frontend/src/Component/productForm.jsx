import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css"

export default function ProductForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
      
  })

  const handleImage = (e) => {
    const file = Array.from(e.target.files);
    setImage((prev) => [...prev, ...file]);

    const imgPreviews = file.map((file) => URL.createObjectURL(file));
    setPreview(imgPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('tag', tag);

    image.forEach((file) => {
        formData.append('images', file);
    });

    console.log(formData);
    alert('Product added successfully');

    const res = await axios.post('http://localhost:3000/product/post-product', formData);

    if (res.status === 200) {
        setName('');
        setEmail('');
        setPrice('');
        setDescription('');
        setCategory('');
        setStock('');
        setTag('');
        setImage([]);
        setPreview([]);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="tag">Tag</label>
        <input type="text" id="tag" value={tag} onChange={(e) => setTag(e.target.value)} />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label htmlFor="stock">Stock</label>
        <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" multiple onChange={handleImage} />
        <div>
          {preview.map((img, index) => (
            <img key={index} src={img} alt="preview" style={{ width: "100px", height: "100px", margin: "10px" }} />
          ))}
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
