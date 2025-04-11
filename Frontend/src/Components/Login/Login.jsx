import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/action" 

export default function Login() {

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await dispatch(loginUser({ email, password }));
			navigate("/home");
		}
		catch (error) {
			setError("Login failed. Please try again.");
		}
	}

	return (
		<>
			<div className="login-container">
				<form className="login-form" onSubmit={handleSubmit}>
					<h1> Login </h1>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<label className="login-email"> Email </label>
					<input type="email" placeholder="Enter your email" onChange={(e) => {
						setEmail(e.target.value)
					}}/>
					
					<label className="login-password"> Password </label>
					<input type="password" placeholder="Enter your Password" onChange={(e) => {
						setPassword(e.target.value)
					}}/>

					<div className="login-remember-forgot">
						<div className="login-remember">
							<input type="checkbox" /> 
							<p> Remember me</p>
						</div>
						<div className="login-forgot" onClick={() => navigate("/forgot-password")}>
							Forgot Password?
						</div>
					</div>

					<button type="submit" className="login-button"> Login </button>

					<br />

					<div>
						<label> Don't have an account? {" "} </label>
						<span className="login-sign-up" onClick={() => navigate("/Signup")}>  
							Sign up
						</span> 
					</div>
				</form>
			</div>
		</>
	);
}