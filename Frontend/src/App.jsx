import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import { Signup } from './Components/SignUp/Signup'
import { Home } from './page/Home'
import { ProductForm } from './Components/ProductForm/Productform'
import { Productcardseller } from './Components/productcardforseller'
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Components/Cart/Cart"
import CartComponent from './Components/Cart/CartComponent'
import Singlecard from './Components/Singlecard'
import Profile from "./Components/Profile/Profile"
import Address from "./Components/Address/Address"
import SelectAddress from './Components/Address/SelectAddress'
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation'


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
				<Route path="profile" element={<Profile />} />
				<Route path="addaddress" element={<Address />} />
				<Route path="selectaddress" element={<SelectAddress />} />
				<Route path="orderconfirmation" element={<OrderConfirmation />} />
				{/* <Route path='/my-product' element={<Productcardseller/>}/>
				<Route path= '/product/:id' element={<Singlecard/>}/> */}
			</Routes>
		</>
	)
}

export default App;