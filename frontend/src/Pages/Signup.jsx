// src/pages/Signup.jsx

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"

const Signup = () => {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		name: "",
		employeeId: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match")
			return
		}

		console.log("Signup Data:", formData)

		navigate("/")
	}

	return (
		<section className='signup-page'>
			<div className='signup-card'>
				<div className='signup-copy'>
					<h1>Operator Signup</h1>
				</div>

				<form className='signup-form' onSubmit={handleSubmit}>
					<div className='signup-grid'>
						<div className='signup-field'>
							<label htmlFor='name'>Name</label>
							<input
								id='name'
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Enter your full name'
								autoComplete='name'
							/>
						</div>

						<div className='signup-field'>
							<label htmlFor='employeeId'>Employee ID</label>
							<input
								id='employeeId'
								type='text'
								name='employeeId'
								value={formData.employeeId}
								onChange={handleChange}
								placeholder='Enter your employee ID'
								autoComplete='username'
							/>
						</div>

						<div className='signup-field signup-field--full'>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='Enter your work email'
								autoComplete='email'
							/>
						</div>

						<div className='signup-field'>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								placeholder='Create a password'
								autoComplete='new-password'
							/>
						</div>

						<div className='signup-field'>
							<label htmlFor='confirmPassword'>Confirm Password</label>
							<input
								id='confirmPassword'
								type='password'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleChange}
								placeholder='Re-enter your password'
								autoComplete='new-password'
							/>
						</div>
					</div>

					<button className='signup-button' type='submit'>
						Create Account
					</button>
				</form>

				{/* <p className='signup-footer'>
					Already have an account? <Link to='/'>Login</Link>
				</p> */}
			</div>
		</section>
	)
}

export default Signup
