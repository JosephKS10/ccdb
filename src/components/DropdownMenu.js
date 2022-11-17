import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import menu from '../pictures/menu.svg';
import {Link} from 'react-router-dom';

function DropdownMenu(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic" bsPrefix="p-0">
      <img src={menu} alt="menu icon" height="90px" width="90px" className="menu"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item><Link className='Link-dropdown' to='/login'>{props.login}</Link></Dropdown.Item>
        <Dropdown.Item><Link className='Link-dropdown' to='/alldata'>ALL DATA</Link></Dropdown.Item>
        <Dropdown.Item><Link className='Link-dropdown' to='/dataanalysis'>DATA ANALYSIS</Link></Dropdown.Item>
        <Dropdown.Item><Link className='Link-dropdown' to='/about'>ABOUT</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownMenu

