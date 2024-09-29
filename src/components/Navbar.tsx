import React from 'react';
import { HamburgerIcon, BellIcon,  } from '@chakra-ui/icons'
import { ReactComponent as MyIcon } from '../icon/User_icon.svg';
import { useNavigate } from 'react-router-dom';

import '../styles/Navbar.css'
import { IconButton } from '@chakra-ui/react';

interface MyIconComponent{
    icon: React.ElementType ;
}
const NavBar: React.FC<MyIconComponent> = ({icon: IconComponent}) => {
    const navigate = useNavigate(); //Hook para navegar entre las rutas
    
    //Función para enviar al usuario al inicio
    const handleBackHome = () =>{
        navigate('/')
    }
    return (
    <div className='main_container_navbar'>
        <div className='left_container_navbar'>
            <IconButton 
                aria-label="Get back home" 
                backgroundColor={'#010316'}
                _hover={{
                    backgroundColor:"#131314"
                }} 
                icon={<IconComponent color='white' w={4} h={4}/>}
                onClick={handleBackHome}
                />
             </div>
        <div className='right_container_navbar'>
            <BellIcon color='white' w={4} h={4}/>
            <MyIcon/> 
        </div>
    </div>
  );
}

export default NavBar;