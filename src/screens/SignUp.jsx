import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';


export default function SignUp() {

    const initialFormState = {
        name: '',
        email: '',
        password: '',
    };
  const navigate=useNavigate();
    const [formValues, setFormValues] = useState(initialFormState);


    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Submitted data:', formValues);
        
        const response=await fetch('http://localhost:8000/api/createuser', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:formValues.name,
                email:formValues.email,
                password:formValues.password
            })
        })

        const ans=await response.json();
        const error=ans.error;
        if(!ans.success){
           
            if(error){
                alert("Email already exists");
            }
            else{
            alert("Invalid " + ans.errors[0].path);
            }             
        }
        else{
            navigate('/login');

        }

        setFormValues(initialFormState);
    }

    const handleChange = (e) => {
      const {name, value}=e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });

    }
    const handleLogin=()=>{
        navigate('/Login');
    }




    return (
        <div>
            <section className="vh-100" style={{ background: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" name='name' value={formValues.name} onChange={handleChange} className="form-control" required/>
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" name='email' value={formValues.email} onChange={handleChange} className="form-control" required/>
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" name='password' value={formValues.password} onChange={handleChange} className="form-control" required/>
                                                        <label className="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>


                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label" for="form2Example3">
                                                        I agree all statements in <Link to="#!">Terms of service</Link>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={handleLogin}>Already a user ?</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}