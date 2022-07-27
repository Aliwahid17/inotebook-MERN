import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else {
            alert("invalid");
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} placeholder=""  required/>
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder=""  required/>
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' placeholder="" minLength={5} required />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control my-3" id="cpassword" value={credentials.cpassword} onChange={onChange} name='cpassword' placeholder="" minLength={5} required />
                    <label htmlFor="cpassword">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Signup