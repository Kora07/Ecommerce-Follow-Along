import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import "./ProductForm.css"

export const ProductForm = () => {
	const { id } = useParams();
	const navigate = useNavigate()
	const isEdit = Boolean(id);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState("");
	const [tag, setTag] = useState("");
	const [email, setEmail] = useState("");
	const [seller, setSeller] = useState("");

	const [preview, setPreview] = useState([]);
	const [files, setfiles] = useState([]);


	useEffect(() => {
		if (id) {
			axios
				.get(`http://localhost:3000/product/edit-product/${id}`)
				.then((response) => {
					const p = response.data.product;
					console.log(p)
					setName(p.name);
					setDescription(p.description);
					setCategory(p.category);
					setTag(p.tags || "");
					setPrice(p.price);
					setStock(p.stock);
					setEmail(p.email);
					if (p.files && p.files.length > 0) {
						setPreview(
							p.files.map((imgPath) => `http://localhost:3000${imgPath}`)
						);
					}
				})
				.catch((err) => {
					console.error("Error fetching product:", err);
				});
		}
	}, [id]);

  	const handlefiles = (e) => {
		const files = Array.from(e.target.files);
		
		setfiles(files);

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
		formData.append("seller", seller);

		files.forEach((img) => formData.append("files", img));

		try {

			if (isEdit) {
				const response = await axios.put(`http://localhost:3000/product/edit-product/${id}`,
					formData, {
						headers: { "Content-Type": "multipart/form-data" },
					}
				);
				if (response.status === 200) {
					alert("Product updated successfully!");
					navigate("/my-products");
				}
			}
			else {
				const res = await axios.post("http://localhost:3000/product/post-product", 
					formData, {
						headers: { "Content-Type": "multipart/form-data", 
					},
			});
		

				if (res.status === 200) {
					alert("Product Added Successfully");

					// Form reset
					setEmail("");
					setName("");
					setPrice("");
					setDescription("");
					setCategory("");
					setStock("");
					setTag("");
					setfiles([]);
					setPreview([]);
					setSeller("");
				}
			} 
		} 
		catch (error) {
			console.error("Error adding product:", error.response?.data || error.message);
			alert("Failed to add product: " + (error.response?.data?.message || "Unknown error"));
		}
		
	};

	return (
		<>
			<div className="add-product-container">
				<form onSubmit={handleSubmit}>
					<h2> Add a Product</h2>
					
					
					<label> Email </label>
					<input type="email" required onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
					{/* </div> */}
					<label> Product Name </label>
					<input type="text" required onChange={(e) => setName(e.target.value)} placeholder="Enter product name" />

					<label> Price </label>
					<input type="number" required onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />

					<label> Description </label>
					<input type="text" required onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />

					<label> Category </label>
					<input type="text" required onChange={(e) => setCategory(e.target.value)} placeholder="Enter category of product" />

					<label> Stock </label>
					<input type="number" required onChange={(e) => setStock(e.target.value)} placeholder="Enter stock of product" />

					<label> Tags </label>
					<input type="text" required onChange={(e) => setTag(e.target.value)} placeholder="Enter tags" />

					<label> Product Seller </label>
					<input type="text" required onChange={(e) => setSeller(e.target.value)} placeholder="Enter name of seller" />

					<label> Product Images </label>
					<input type="file" multiple required onChange={handlefiles} id="upload" className="hidden"/>

					<label htmlFor="upload" className="upload-product-image-icon">
						<AiOutlinePlusCircle size={24} className="broNah"/>
						<p> Upload Files </p>
					</label>

					{preview.length > 0 && (
						<div className="mb-4 flex gap-2">
							{preview.map((img, index) => (
								<img src={img} key={index} alt="preview" />
							))}
						</div>
					)}

					<div className="add-product-button-div">
						<button type="submit" className="add-product-button">
							Add Product
						</button>
					</div>

				</form>
			</div>
		</>

	);
};