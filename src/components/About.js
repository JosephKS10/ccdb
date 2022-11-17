import React from 'react'
import back from '../pictures/back.svg'
import './About.css'
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="body">
      <div className="about-container1">
      <div className="header-login">
            <div className="heading-login">CCDB.</div>
            <Link className='Link' to='/'><button className="button"><img src={back} alt="back" className="back"/><h2 className='back-title'>Back</h2></button></Link>
        </div>
      </div>
      <div className="about-container2">
         <div className="about-box1"><br />
            <h1 className="heading-about">Group Members</h1><br /><br />
            <ol className="list">
              <li>Joseph Kalayathankal Saji</li>
              <li>Samir Bharti</li>
              <li>Harsh Singh</li>
              <li>Pranav bhagwat</li>
              <li>bhavvan Dubey</li>
            </ol>
        </div>
        <div className="about-box2"><br />
        <h1 className="heading-about">About CCDB.</h1><br />
        <p className="Content-p">What is chemical carcinogen? Chemical Carcinogens are <br /> chemical compounds which can cause cancer in humans <br /> and experimental animals. This Database consist of around 115 carcinogens with information related to its structure, physical and chemical properties and references from various database. In India among males was 679,421 (94.1 per 100,000) and among females 712,758 (103.6 per 100,000) suffer from cancer due to chemical carcinogen.</p>
        </div>
      </div>  
       
    </div>
  );
}
