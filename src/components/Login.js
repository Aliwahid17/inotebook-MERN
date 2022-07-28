import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect

            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In successfully", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container mt-3">
                <h2 className='mb-3'>Log In to continue With iNoteBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="" required />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' placeholder="" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary my-3" >Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login