// src/pages/Login.jsx

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { postReq } from "../config/request"
import "./Login.css"

function Login() {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			navigate("/dashboard")
		}
	}, [navigate])

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const res = await postReq("api/auth/login", formData, "")
		console.log(res)

		if (res.success) {
			localStorage.setItem("token", res.token)
			localStorage.setItem("isLogin", "true")
			navigate("/dashboard")
		} else {
			alert("Login failed: " + res.message)
		}
	}

	return (
		<section className='login-page'>
			<div className='login-card'>
				<div className='login-copy'>
					{/* <p className='login-kicker'>Shop Floor Portal</p> */}
					<h1>Operator Login</h1>
					{/* <p className='login-subtitle'>
						Sign in to view jobs, manage tasks, and track shop floor updates.
					</p> */}
				</div>

				<form className='login-form' onSubmit={handleSubmit}>
					<div className='login-field'>
						<label htmlFor='username'>User ID</label>
						<input
							id='username'
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
							placeholder='Enter your user ID'
							autoComplete='username'
						/>
					</div>

					<div className='login-field'>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Enter your password'
							autoComplete='current-password'
						/>
					</div>

					<button className='login-button' type='submit'>
						Login
					</button>
				</form>

				<p className='login-footer'>
					Don't have an account? <Link to='/signup'>Signup</Link>
				</p>
			</div>
		</section>
	)
}

export default Login
