import React, { useEffect, useRef } from 'react';
import NavBar from './Navbar';
import BoxDetail from './BoxDetail';
import Footer from './Footer';
import OpinionesDetail from './OpinionesDetail';
import { Box, Card, Image, Text, VStack } from '@chakra-ui/react';
import { ReactComponent as IconLocation } from '../icon/location-pin-svgrepo-com.svg';
import { PhoneIcon } from '@chakra-ui/icons';
import '../styles/Detail.css'

const Detail: React.FC = () => {

    const scrollRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
          // Función para manejar el scroll horizontal usando la rueda del mouse
          const handleScroll = (event: WheelEvent) => {
              if (scrollRef.current) {
                  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                      event.preventDefault(); // Previene el scroll vertical
                      scrollRef.current.scrollLeft += event.deltaY; // Desplaza horizontalmente
                  }
              }
          };

          const currentRef = scrollRef.current;
          // Agregar el evento wheel con passive: false
          currentRef?.addEventListener('wheel', handleScroll, { passive: false });

          return () => {
              // Limpiar el evento en el desmontaje
              currentRef?.removeEventListener('wheel', handleScroll);
          };
      }, []);
    //Acá vendría la consulta a la API, pasando la info por props al BoxDetail, para que rellene cada campo
    //Osea, lo que se haría sería pasarle el state con el array de objetos, y luego en el componente BoxDetail, se mapea y repite la info, acorde sea enviada por props
    return (
    <div className="detail">
        <NavBar/>
        <div className="DetailContainer">
          <h1 className='titleDetail'>Bar Nim</h1>
          <div className='DetailTextContainer'>
            <VStack align="start" spacing={2}>
                <Text color={'#FFFFFF'}> <IconLocation className='iconLocation_detail'/>Text 1.</Text>
                <Text color={'#FFFFFF'}> <PhoneIcon className='iconPhone_detail'/> Text 2.</Text>
            </VStack>
          </div>

          <Box
              ref={scrollRef}
              className='carrousel'
            >
              <Card maxW='md'
                direction={{ base: 'column', sm: 'row' }}

              >
                  <Image
                    objectFit='cover'
                    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Chakra UI'
                    maxW={{ base: '30%', sm: '30%', md: '156px' }}
                    maxH={{ base: '30%', sm: '30%', md: '104px' }}

                  />
                  <Image
                  objectFit='cover'
                  src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Chakra UI'
                  maxW={{ base: '30%', sm: '30%', md: '156px' }}
                  maxH={{ base: '30%', sm: '30%', md: '104px' }}
                  />
                  <Image
                  objectFit='cover'
                  src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Chakra UI'
                  maxW={{ base: '30%', sm: '30%', md: '156px' }}
                  maxH={{ base: '30%', sm: '30%', md: '104px' }}
                  />
              </Card>
          </Box>
          
          <BoxDetail title={'Todas las opciones'}/>
          <h2 className='subtitleDetail'>Opiniones</h2>
          <OpinionesDetail/>
          <OpinionesDetail/>
          <OpinionesDetail/>
          <Footer/>
        </div>
    </div>
  );
}

export default Detail;
