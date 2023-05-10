import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NzRjNmQ4YjJkNTIwMjgwMzgxZjM4In0sImlhdCI6MTY4MjM5NzQyMn0.0jbZImJDnq8mKPKLy09BWrkU3PnUxnedDJmT5GJ3abY"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // save the token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("user created succesfully!", "success")
      navigate('/')

    } else {
      props.showAlert("user with this email already exists!", "danger")
    }
  }

  const OnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2 className='my-3'>Signup to use the amazing features of iNotebook</h2>
      <form onSubmit={HandleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={OnChange} value={credentials.name} minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={OnChange} value={credentials.email} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={OnChange} value={credentials.password} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={OnChange} value={credentials.cpassword} required />
        </div>
        <button type="submit" className="btn btn-primary" >Log in</button>
      </form>
    </div>
  )
}

export default Signup