import React from 'react';
import { HamburgerIcon, BellIcon,  } from '@chakra-ui/icons'
import { ReactComponent as MyIcon } from '../icon/User_icon.svg';

import '../styles/Navbar.css'
const NavBar: React.FC = () => {
    console.log("Holaa");
    
    return (
    <div className='main_container_navbar'>
        <div className='left_container_navbar'><HamburgerIcon color='white' w={4} h={4}/> </div>
        <div className='right_container_navbar'>
            <BellIcon color='white' w={4} h={4}/>
            <MyIcon/> 
        </div>
    </div>
  );
}

export default NavBar;