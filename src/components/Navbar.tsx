import React, { useRef } from 'react';
import { BellIcon,  } from '@chakra-ui/icons'
import { ReactComponent as MyIcon } from '../icon/User_icon.svg';
import { useNavigate } from 'react-router-dom';

import '../styles/Navbar.css'
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

interface MyIconComponent{
    icon: React.ElementType ;
}
const NavBar: React.FC<MyIconComponent> = ({icon: IconComponent}) => {
    const { logout } = useAuth();

    const navigate = useNavigate(); //Hook para navegar entre las rutas
    
    //Función para enviar al usuario al inicio
    const handleBackHome = () =>{
        navigate('/')
    }
    const handleLogOut = () =>{
        logout()
        navigate('/login')
    }

    //Variables para el drawer lateral
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement | null>(null);
  
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
            
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen} backgroundColor={"#010316"} _hover={{backgroundColor:"#131314"}}>
                <MyIcon/> 
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'xs'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody paddingTop={'44px'}>
                            <Text align={'start'} _hover={{cursor: 'pointer', color:"#1e1e1e", backgroundColor: '#fbfbfb'}} onClick={handleLogOut}>Log out</Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    </div>
  );
}

export default NavBar;