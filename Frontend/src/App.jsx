import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import { Signup } from './Components/SignUp/Signup'
import { Home } from './page/Home'
import { ProductForm } from './Components/ProductCard/Productform'
import { Productcardseller } from './Components/productcardforseller'
import Navbar from "./Components/Navbar/Navbar";
import Singlecard from './Components/Singlecard'


function App() {
 
	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/Login" element={<Login/>}/>
				<Route path="/Signup" element={<Signup/>}/>
				<Route path='/productform' element={<ProductForm/>}/>
				{/* <Route path='/my-product' element={<Productcardseller/>}/>
				<Route path= '/product/:id' element={<Singlecard/>}/> */}
			</Routes>
		</>
	)
}

export default App;