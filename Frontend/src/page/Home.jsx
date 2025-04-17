import React, { useEffect, useState } from 'react'
import { Productcard } from '../Components/Products/Productcard'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

	const navigate = useNavigate();

	return (
		<div className='w-full min-h-screen'>
			<h3> Products </h3>
			<h1> Great Products, </h1>
			<h1> Affordable Prices </h1>
			<h3> We provide new products at prices lower than marke value! </h3>

			<div>
				<img src="https://images.moneycontrol.com/static-mcnews/2022/09/Galaxy_Fold4_Flip4_Buds2pro_PR_dl4-652x435.jpg?impolicy=website&width=770&height=431" />
			</div>

			<button onClick={() => {
				navigate("/products");
			}}> View Products </button>
		</div>
	)
}
