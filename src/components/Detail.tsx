import React, { useEffect, useRef, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import OpinionesDetail from './OpinionesDetail';
import { Box, Button, Card, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { ReactComponent as IconLocation } from '../icon/location-pin-svgrepo-com.svg';
import { PhoneIcon, ArrowBackIcon } from '@chakra-ui/icons';
import '../styles/Detail.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  state: string;
  street: string;
}
const Detail: React.FC = () => {

    const urlBase = process.env.REACT_APP_URL_BASE || 'http://localhost:5056/breweries';
    const [data, setData] = useState<Brewery | null>(null);

    const { id } = useParams<{id: string}>();
    
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Función para manejar el scroll horizontal usando la rueda del mouse
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
    }, [data]); //Se coloca el "data" para que se aplique cuando la data se encuentre disponible
    //Llamada API por ID
    useEffect(() =>{
      axios.get(`${urlBase}/${id}`).then((response) =>{
          setData(response.data)
      }).catch((error) => {
          console.error('Error al hacer la solicitud:', error);
        });
    },[urlBase, id])
    
    //Acá vendría la consulta a la API, pasando la info por props al BoxDetail, para que rellene cada campo
    //Osea, lo que se haría sería pasarle el state con el array de objetos, y luego en el componente BoxDetail, se mapea y repite la info, acorde sea enviada por props
    return (
    <div className="detail">
        <NavBar icon={ArrowBackIcon}/>
        
        <div className="DetailContainer">
          {data ? 
          <>
            <h1 className='titleDetail'>{data.name}</h1>
            <div className='DetailTextContainer'>
              <VStack align="start" spacing={2}>
                  <Text color={'#FFFFFF'}> <IconLocation className='iconLocation_detail'/>{data.address_1 ? data.address_1 : data.address_2 ? data.address_2 : data.address_3}</Text>
                  <Text color={'#FFFFFF'}> <PhoneIcon className='iconPhone_detail'/> {data.phone} </Text>
              </VStack>
            </div>

            <Box
                ref={scrollRef}
                className='carrousel'
                flexDirection="row"
                flexWrap="nowrap"
                >
                <Card 
                  maxW='md'
                  direction={{ base: 'row', sm: 'row' }}
                  backgroundColor={'#010316'}
                >
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                    <Image
                      objectFit='cover'
                      src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Chakra UI'
                      maxW={{ base: '30%', sm: '30%', md: '156px' }}
                      maxH={{ base: '30%', sm: '30%', md: '104px' }}
                      borderRadius="12px" 
                      marginRight="16px"
                    />
                </Card>
            </Box>
            
          </>
          :
          <>
            <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  />
          </>
          }
          <h2 className='subtitleDetail'>Opiniones</h2>
            <OpinionesDetail/>
            <OpinionesDetail/>
            <OpinionesDetail/>
          <div className='btn_container_detail'>
            <Button 
                width={'342px'} 
                marginTop={'16px'} 
                marginBottom={'24px'} 
                color={'#FFFFFF'} 
                _hover={{
                  bgGradient: "linear(to-r, #6674F4, #FF69E2)",  // Degradado más claro en hover
                }}
                sx={{bgGradient: 'linear(to-r, #3540E8, #E41AD6)'}} 
                >
                  Reservar mesa
            </Button>
              <button className="gradient-border-button">Opciones de transporte</button>
          </div>
          <Footer/>
        </div>
    </div>
  );
}

export default Detail;
