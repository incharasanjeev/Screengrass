import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

export default function Navbar() {
     
  const navigate=useNavigate();
  const handleLogout= ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate('/login');
  }
    return (

        <div>
            <nav  className="navbar bg-dark navbar-expand-lg border-bottom border-bottom-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Sensegrass</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                           
                        </div>
                    </div>
                </div>
                {
            (!localStorage.getItem("authToken")) ? <div className='d-flex'>
              <Link className="btn" to="/login" style={{ border: "1px solid black", borderRadius: "10px" ,marginRight:"4px",background:"white", color:"black"}}>Login</Link>

              <Link className="btn" to="/createuser" style={{ border: "1px solid black", borderRadius: "10px" ,background:"white", color:"black"}}>SignUp</Link>
            </div> : <div>
              
             
          
              <div className='btn' style={{ border: "1px solid black", borderRadius: "10px" ,background:"white", color:"black"}} onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
            </nav>
        </div>
    )
}