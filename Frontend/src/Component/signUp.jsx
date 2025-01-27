import { useState } from 'react'
import eyeIcon from '../assets/eye.svg';
import '../index.css';
import Avatar from "react-avatar"
import axios from "axios"

function SignUp() {

    const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');
  	const [name, setName] = useState('');
  	const [avatar, setAvatar] = useState(null);

	const handleFileSubmit = (e) => {
		const file = e.target.files[0];

		if (file) {
			const filePath = URL.createObjectURL(file);
			console.log(filePath);
			setAvatar(file);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData();

		formData.append("name", name);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("avatar", avatar);

		const config = {
			headers: {
				"Content-Type": "multiport-form-data"
			}
		}

		axios.post("http://localhost:3000/create-user", formData, config)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
	}

    const [passwordVisibility, setPasswordVisibiity] = useState(true);
    const toggleVisibility = () => {
        setPasswordVisibiity(!passwordVisibility);
        console.log(passwordVisibility)
    };
    
    const [confirmPassword, setConfirmVisibility] = useState(true);
    const toggleConfirmVisibility = () => {
        setConfirmVisibility(!confirmPassword);
        console.log(confirmPassword)
    };

    return (
        <>
        <form>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign Up
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 jack">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 jack">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={passwordVisibility ? "password" : "text"}
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                    </input>
                        <img onClick={toggleVisibility} src={eyeIcon} alt="Eye Icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer daboey" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={confirmPassword ? "password" : "text"}
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                    </input>
                        <img onClick={toggleConfirmVisibility} src={eyeIcon} alt="Eye Icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer daboey" />
                  </div>
                </div>
                <div className="text-sm">
                <input type="checkbox" className="doc" /> I agree to the ToS
                </div>
				
				<label htmlFor='avatar' className="block text-sm font-medium leading-6 text-white left">
				</label>

				<div className="mt-2 flex items-center">
					<span className='inline-block h-8 w-8 rouned-full overflow-hidden'>
						{
							avatar ? (
								<img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" />)
								: (
									<Avatar name="Foo" 
									className="h-8 w-8 rounded-md" />
								)
						}
					</span>

					<label htmlFor='file-input' className="ml-5 flex items-center justify-center px-4 
						py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700
						bg-white hover-:bg-gray-50">
						Upload a File
					</label>

					<input type='file'
						name="avatar"
						id="file-input"
						accept=".jpg .jpeg .png"
						onChange={(e) => handleFileSubmit(e)}
						className="sr-only" />
				</div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already a member?{' '}
                <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Log In
                </a>
              </p>
            </div>
          </div>
          </form>
        </>
    )
}

export default SignUp;
