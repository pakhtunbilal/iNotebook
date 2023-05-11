import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  let navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://inotebook-ucvf.onrender.com/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NzRjNmQ4YjJkNTIwMjgwMzgxZjM4In0sImlhdCI6MTY4MjM5NzQyMn0.0jbZImJDnq8mKPKLy09BWrkU3PnUxnedDJmT5GJ3abY"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // save the token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("user logged in succesfully!", "success")
      navigate('/')

    } else {
      props.showAlert("Invalid credentials!", "danger")
    }
  }

  const OnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2 className='my-3'>Login to continue to iNotebook</h2>
      <form onSubmit={HandleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={OnChange} value={credentials.email} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={OnChange} value={credentials.password} />
        </div>
        <button type="submit" className="btn btn-primary" >Log in</button>
      </form>

    </div>
  )
}

export default Login
