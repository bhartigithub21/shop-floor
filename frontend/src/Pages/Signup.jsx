// src/pages/Signup.jsx

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
		<div>
			<h1>Operator Signup</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Employee ID</label>
					<input
						type='text'
						name='employeeId'
						value={formData.employeeId}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Email</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Password</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Confirm Password</label>
					<input
						type='password'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
				</div>

				<button type='submit'>Signup</button>
			</form>

			<p>
				Already have an account? <Link to='/'>Login</Link>
			</p>
		</div>
	)
}

export default Signup
