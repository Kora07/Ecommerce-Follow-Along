import { useState } from 'react'
import "./app.css"
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import SignUp from './Component/signUp'
import Homepage from './Component/home'
import Product from "./Component/product"
import ProductForm from './Component/productForm'
import ProductCard from './Component/sellerProductCard'
import Navbar from './Component/navbar'
import Cart from './Component/cart'

function App() {


	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/product' element={<Product/>}/>
				<Route path='/sign-up' element={<SignUp/>}/>
				<Route path='/productForm' element={<ProductForm/>}/>
				<Route path='/sellerProductForm' element={<ProductCard/>}/>
				<Route path='/cart' element={<Cart/>}/>
			</Routes>
		</>
	)
}

export default App;