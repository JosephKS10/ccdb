import React, {useState} from 'react'
import back from '../pictures/back.svg'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../firebase';
import {ref, set } from "firebase/database";

export default function () {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email:"",
    password:""
  })
  
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if(!values.name || !values.email || !values.password){
      alert("Please fill all the fields");
      return;
    }
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth,values.email,values.password).then(async res=>{
      setSubmitButtonDisabled(false);
      console.log(res);
      const user = res.user;
      await updateProfile(user,{
        displayName:values.name
      });
      //

      set(ref(database, 'users/' + user.uid), {
        username: user.displayName,
        email: user.email,
      });
      console.log(user)

      navigate("/"); 
    })
    .catch(err=> {
      setSubmitButtonDisabled(false);
      alert(err.message);
    })
  }

  return (
    <div className='body'>
        <div className="header-signup">
            <div className="heading-signup">CCDB.</div>
            <Link className="Link" to='/'><button className="button"><img src={back} alt="back" className="back"/><h2 className='back-title'>Back</h2></button></Link>
        </div>
        <div className="signup-box">
          <h1 className="signup">Signup</h1><br /><br />
          <div className="container-signup">
          <input type="text" name="name" id="name" className='textfield-signup' placeholder='name' value={values.name} onChange={(event) => setValues((prev) => ({...prev, name: event.target.value}))}/><br /><br />
          <input type="email" name="email" id="email" className='textfield-signup' placeholder='email' value={values.email} onChange={(event) => setValues((prev) => ({...prev, email: event.target.value}))}/><br /><br />
          <input type="password" name="password" id="password" className='textfield-signup' placeholder='password' value={values.password} onChange={(event) => setValues((prev) => ({...prev, password: event.target.value}))}/><br /><br />
          <button className="button-signup" onClick={handleSubmit} disabled={submitButtonDisabled}>signup</button>
          </div>
          <p className='signup-last'>Have an account? <Link className="Link" to='/login'>Login here</Link></p>
        </div>
    </div>
  )
}
