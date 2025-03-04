import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import { Signup } from './Components/SignUp/Signup'
import { Home } from './page/Home'
import { ProductForm } from './Components/ProductCard/Productform'
import { Productcardseller } from './Components/productcardforseller'
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Components/Cart/Cart"
import CartComponent from './Components/Cart/CartComponent'
import Singlecard from './Components/Singlecard'


function App() {
 
	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/signup" element={<Signup/>}/>
				<Route path='/productform' element={<ProductForm/>}/>
				<Route path="/cart" element={<Cart />} />
				<Route path="/cartcomponent" element={<CartComponent />} />
				{/* <Route path='/my-product' element={<Productcardseller/>}/>
				<Route path= '/product/:id' element={<Singlecard/>}/> */}
			</Routes>
		</>
	)
}

export default App;