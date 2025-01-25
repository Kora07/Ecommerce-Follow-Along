import { useState } from 'react'
import "./app.css"
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import SignUp from './Component/signUp'
import Home from './Component/home'


function App() {


	return (
		<>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/sign-up' element={<SignUp/>}/>
			</Routes>
		</>
	)
}

export default App;