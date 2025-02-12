import { useState } from 'react'
import "./app.css"
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import SignUp from './Component/signUp'
import Homepage from './Component/home'
import ProductForm from './Component/productForm'




function App() {


	return (
		<>
			<Routes>
				<Route path='/' element={<Homepage/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/sign-up' element={<SignUp/>}/>
				<Route path='/productForm' element={<ProductForm/>}/>
			</Routes>
		</>
	)
}

export default App;