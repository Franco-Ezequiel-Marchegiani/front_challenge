import { CalendarIcon, ChatIcon } from '@chakra-ui/icons';
import React from 'react';
import { ReactComponent as HomeIcon } from '../icon/Home_icon.svg';
import '../styles/Footer.css'
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
    const location = useLocation();
    
    // Determinar si estamos en la ruta '/'
    const isHome = location.pathname === '/';

    // Estilos para el logo
    const logoStyles = {
        color: isHome ? '#3540E8' : 'white', // Cambia 'blue' por el color que desees para la ruta '/'
        transition: 'color 0.3s', // Transición suave del color
    };
    console.log(isHome);
    
    return (
        <footer className='footer_container'>
            <div className='iconButtonContainer_Footer'>
                <CalendarIcon w={4} h={4}/>
                <p>Calendario</p>
            </div>
            <div className='iconButtonContainer_Footer'>
                <HomeIcon style={{ fill: isHome ? '#3540E8' : 'white' }}/>
                <p style={logoStyles}>Home</p>
            </div>
            <div className='iconButtonContainer_Footer'>
                <ChatIcon w={4} h={4}/>
                <p>Chat</p>
            </div>
            
            
            
        </footer>
  );
}

export default Footer;