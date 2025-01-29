import { useState } from 'react'
import "./app.css"
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import SignUp from './Component/signUp'
import Home from './Component/home'
import Product from './Component/product'



function App() {


	return (
		<>
			<Routes>
				<Route path='/' element={<Product/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/sign-up' element={<SignUp/>}/>
			</Routes>
		</>
	)
}

export default App;