import React, {useState} from 'react'
import "./Login.css";
import back from '../pictures/back.svg'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    email:"",
    password:""
  })
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    
    if(!values.email || !values.password){
      alert("Please fill all the fields");
      return;
    }
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth,values.email,values.password).then(async res=>{
      setSubmitButtonDisabled(false);
      console.log(res);
      navigate("/"); 
    })
    .catch(err=> {
      setSubmitButtonDisabled(false);
      alert(err.message);
    })
  }
  return (
    <div className="body">
        <div className="header-login">
            <div className="heading-login">CCDB.</div>
           <Link className="Link" to='/'><button className="button"><img src={back} alt="back" className="back"/><h2 className='back-title'>Back</h2></button></Link>
        </div>
        <div className="login-box">
          <h1 className="login">Login</h1><br /><br /><br />
          <div className="container-login">
          <input type="email" name="email" id="email" className='textfield-login' value={values.email} onChange={(event) => setValues((prev) => ({...prev, email: event.target.value}))} placeholder='email'/><br /><br /><br />
          <input type="password" name="password" id="password" className='textfield-login' value={values.password} onChange={(event) => setValues((prev) => ({...prev, password: event.target.value}))} placeholder='password'/> <br /><br /><br />
          <button className="button-login" onClick={handleSubmit} disabled={submitButtonDisabled}>Login</button>
          </div>
          <p>Don’t have an account? <Link className="Link" to='/signup'>Signup here</Link></p>
        </div>
    </div>
  )
}
