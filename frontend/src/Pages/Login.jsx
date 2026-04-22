// src/pages/Login.jsx

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		employeeId: "",
		password: "",
	})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		console.log("Login Data:", formData)

		navigate("/dashboard")
	}

	return (
		<div>
			<h1>Operator Login</h1>

			<form onSubmit={handleSubmit}>
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
					<label>Password</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<button type='submit'>Login</button>
			</form>

			<p>
				Don't have an account? <Link to='/signup'>Signup</Link>
			</p>
		</div>
	)
}

export default Login
