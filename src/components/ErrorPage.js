import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import './ErrorPage.css'
import {TbError404} from 'react-icons/tb'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
 
  return (
      <div className="error-body">
          <div className='error-box'>
      <div className="error-content">
          <TbError404 className='icon'/>
    <TypeAnimation
    sequence={[
        "The page you are looking for is not available",
      1000,
      "You did't break the internet, but we can't find what you are looking for...",
        1000,
      () => {
        console.log('Done typing!'); // Place optional callbacks anywhere in the array
      }
    ]}
    wrapper="div"
    cursor={true}
    repeat={Infinity}
    style={{ fontSize: '2em',
    color: "#FFCF00",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto" }}
    className="animation"
  />
 </div>
 <div className="button-container">
 <button className='link-button' onClick={window.close}><Link to="/" className='link'>Go back to Home Page</Link></button>
 </div>
 </div>
 </div>
  )
}

export default ErrorPage