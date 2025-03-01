import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoPersonCircleSharp } from "react-icons/io5";
import { useState } from 'react'
import axios from 'axios'

import "./SignUp.css"

export const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [visible, setVisible] = useState(false)

	const navigate = useNavigate();

    const handleFileSubmit = (e) => {
        const file = e.target.files[0]

        if (file) {
            const filepath = URL.createObjectURL(file)
            console.log(filepath)
            setAvatar(file)
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('file', avatar)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        await axios.post('http://localhost:3000/user/create-user', formData, config)
		.then((res) => {
            console.log(res.data)
        })
		.catch((err) => {       
            console.log(err.message)
        })  

		navigate("/")
    }


	return (
		<>
			<div className="register-container">

				<form className="register-form" onSubmit={handleSubmit}>
					<h2> Register </h2>
					
					<label> Name </label>
					<input type="text" name="name" autoComplete="name" required value={name} 
						onChange={(e) => setName(e.target.value)} id="register-inputs" />

					<label> Email </label>
					<input type="email" name="email" autoComplete="email" required value={email} 
						onChange={(e) => setEmail(e.target.value)} id="register-inputs" />

					<label> Password </label>
					<div className="register-password">
						<input type={visible ? "text" : "password"} name="password" autoComplete="password" required value={password} 
							onChange={(e) => setPassword(e.target.value)} className="register-password-input" />
						<span className="register-password-icon"> 
							{visible ? (<AiOutlineEye size={25} onClick={() => setVisible(false)} />) : 
								(<AiOutlineEyeInvisible size={25} onClick={() => setVisible(true)} /> )}
						</span>
					</div>

					<div className="register-upload-file">
						<label htmlFor="avatar" />

						<label htmlFor="file-input" className="register-upload-file-button">
							{avatar ? ( <img src={URL.createObjectURL(avatar)}
							alt="avatar" className="register-upload-file-icon-sub" />
							) : ( <IoPersonCircleSharp className='register-upload-file-icon-sub' /> )}
							<span className="register-upload-file-text"> Upload a file </span>
						</label>

						<input type="file" name="avatar" id="file-input" accept=".jpg, .jpeg, .png" 
						onChange={handleFileSubmit} className="hidden" />
					</div>

					<br />

					<button type="submit" className="register-submit"> Sign Up </button>

					<br />

					<p> Already have an Account? {" "}
						<span className="register-back-to-login" onClick={() => {navigate("/login")}}>
							Log In
						</span>
					</p>

				</form>

			</div>
		</>
	)

}
