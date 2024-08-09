import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
// import { Bounce, Flip, ToastContainer, toast } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

	let navigate = useNavigate()

	let [data, setData] = useState({ email: "", password: "" });

	function handleCheng(e) {
		e.preventDefault()
		setData({ ...data, [e.target.id]: e.target.value });
		// console.log(data);
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (data.email == "") {
			toast.warn('Please enter your email.', { position: "top-right", autoClose: 2000 });
			// alert("Enter email") 

			return;
		}
		axios.post(process.env.REACT_APP_BASE_URL + "authentication/login", data).then((result) => {
			if (result.data.status == "success") {
				let user = result.data.data;
				console.log(result.data);
				localStorage.setItem("user", JSON.stringify({ id:user.id, name: user.name, email: user.email, mobileno: user.mobileno, utype:user.utype }));
				localStorage.setItem("token", user.token);
				navigate("/admin");
			} else {
				toast.error(result.data.data, { position: "top-right", autoClose: 3000 });
				// alert(result.data.data);
			}
		}).catch((ex) => {
			toast.error(ex.message, { position: "top-right", autoClose: 2000 });
			// alert(ex);
		})
	}

	return (
		<div class="container1">
			<ToastContainer />

			<div class="screen1">
				<div class="screen__content1">
					<form class="login1">
						<div class="login__field1">
							<i class="login__icon1 fas fa-user"></i>
							<input type="text" id='email' onChange={(e) => { handleCheng(e) }} class="login__input1" placeholder="Email" />
						</div>
						<div class="login__field1">
							<i class="login__icon1 fas fa-lock"></i>
							<input type="password" id='password' onChange={(e) => { handleCheng(e) }} class="login__input1" placeholder="Password" />
						</div>
						{/* <Link to={"/admin"}> */}
							<button onClick={(e) => { handleSubmit(e) }} class="button login__submit1">

								<span class="button__text">Log In Now </span>

								<i class="button__icon fas fa-chevron-right ms-2"></i>
							</button>
						{/* </Link> */}
					</form>
					<div class="social-login1">

						<div class="social-icons">
							<a href="#" class="social-login__icon1 fab fa-instagram"></a>
							<a href="#" class="social-login__icon1 fab fa-facebook"></a>
							<a href="#" class="social-login__icon1 fab fa-twitter"></a>
						</div>
					</div>
					<div className='login-other'>
						<Link to={"/forget/pass"}>
							<a className='log' href="">Forget Password !</a> <br />
						</Link>
						<Link to={"/admin/register"}>
							<a className='log' href="">Create a new account</a>
						</Link>
					</div>

				</div>
				<div class="screen__background1">
					<span class="screen__background__shape1 screen__background__shape4_1"></span>
					<span class="screen__background__shape1 screen__background__shape3_1"></span>
					<span class="screen__background__shape1 screen__background__shape2_1"></span>
					<span class="screen__background__shape1 screen__background__shape1_1"></span>
				</div>
			</div>
		</div>
	)
}

export default Login