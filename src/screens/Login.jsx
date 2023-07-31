import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const initialFormState = {

    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormState);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await fetch('http://localhost:8000/api/loginuser',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:formValues.email,
        password:formValues.password
      })
    }) 

    const ans=await response.json();
    if(!ans.success){
        alert("Invalid id or password");
    }

    else {
      
      alert("Login Successfully");
      localStorage.setItem("userEmail",formValues.email);
      localStorage.setItem("authToken",ans.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate('/');
    }

     setFormValues(initialFormState);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

  }
  const handleSignUp= () => {
    navigate('/SignUp');
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

                      <p className="text-center h1 fw-bold mb-2 mx-2 mx-md-4 mt-4">Hey!! LogIn to see more.</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" name='email' value={formValues.email} onChange={handleChange} className="form-control" required />
                            <label className="form-label" for="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" name='password' value={formValues.password} onChange={handleChange} className="form-control" required />
                            <label className="form-label" for="form3Example4c">Password</label>
                          </div>
                        </div>




                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Already have an account ? <br/>Login</button>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={handleSignUp}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://i.pinimg.com/564x/ee/e2/79/eee279c7d9b4c4e5fc060a9f9bb61c5f.jpg" />

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