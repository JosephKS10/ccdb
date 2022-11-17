import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import profilecard from '../pictures/profile.png';
import Card from 'react-bootstrap/Card';
import {CgProfile} from "react-icons/cg";
import Button from 'react-bootstrap/Button';
import './Profilecard.css'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

export default function Profilecard(props) {
    const [submitLogoutButtonDisabled, setLogoutButtonDisabled] = useState(false);

    const Logout = () => {
        setLogoutButtonDisabled(true);
        signOut(auth).then(() => {
            // Sign-out successful.
            setLogoutButtonDisabled(false);
            props.show(false);

          }).catch((error) => {
            setLogoutButtonDisabled(false);
          });
    }

  return (
    <Dropdown style={{border: "none"}}>
    <Dropdown.Toggle variant="none" id="dropdown-basic" bsPrefix="p-0">
    <button className="white"><img src={profilecard} alt="profile card" height="75px" width="75px"/></button>
    </Dropdown.Toggle>

    <Dropdown.Menu style={{background:"none"}}>
    <Card className='card'>
        <CgProfile className='profile-image'/>
        <Card.Body className="card-body">
          <Card.Title  className="card-title">{props.name}</Card.Title>
          <Card.Title  className="card-title">{props.email}</Card.Title>
          <Card.Text  className="card-text">
              <div className="profile-btn-container">
          <Link to="/profile"><Button variant="primary">View Profile</Button></Link>
          <Button variant="primary" onClick={Logout} disabled={submitLogoutButtonDisabled} className="logout-button">Logout</Button>
          </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Dropdown.Menu>
  </Dropdown>

  );
}