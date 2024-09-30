import { ChevronDownIcon, PhoneIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, HStack, Image, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { ReactComponent as IconLocation } from '../icon/location-pin-svgrepo-com.svg';
import '../styles/BoxDetail.css'
import { useNavigate } from 'react-router-dom';

interface Cities{
    cities: string[];
  }

interface DetailProps {
    title: string;
    dataAPI: Brewery[];
    cities: Cities | null;
    setCitySelected: Function;
    refreshing: boolean;
}

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

const BoxDetail: React.FC<DetailProps> = (props) => {
    const {title, dataAPI, cities, setCitySelected, refreshing} = props
    const navigate = useNavigate(); //Hook para navegar entre las rutas

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

    //Obtenemos la ciudad que el usuario seleccionó, y se la pasamos al componente padre para que haga la consulta
    const handleCitySelected = (city: string)=> {
        setCitySelected(city);
        
    }
    
    //Función para ir al detalle de la opción que el usuario seleccionó
    const handleBackHome = (id: string) =>{
        navigate(`/Detail/${id}`)
    }
    
  return (
    <div className="Box_detail_Container">
        <div className='title_filter_container'>
            <p className='title_detail'>{title}</p>
            {/* Ocultamos el botón de filtro para que se muestre solo en el carrousel de filtro por ciudad */}
            {cities?.cities.length !== 0 ? 
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                     Buscar por ciudad
                </MenuButton>
                <MenuList maxHeight="300px" overflowY="auto">
                    {/* Mostramos las opciones de las ciudades */}
                    {cities && cities.cities.map((city, index) =>(

                        <MenuItem key={city} onClick={() =>{handleCitySelected(city)}}>
                            {city}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            :
            ''
            }
        </div>
        <Box 
            ref={scrollRef}
            className='boxDetail'
            >
            <HStack spacing={4}> 
                {refreshing ? 
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                />
                : 
                <>
                    {dataAPI.length !== 0 ?
                        <>
                        {dataAPI.map((brewery, index) => (
                            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(328px, 1fr))' key={index}>
                                <Card background={"#13132D"} key={brewery.id}>
                                    <CardHeader padding={'16px'}>
                                        <Heading size='md' textAlign="left" color={'#EEEEEE'}>{brewery.name}</Heading>
                                    </CardHeader>
                                    <CardBody paddingTop={'0px'} paddingBottom={'0px'}>
                                        <HStack spacing={5}>
                                            <Image
                                                objectFit='cover'
                                                maxW={{ base: '30%', sm: '30%', md: '114px', lg: '114px' }}
                                                maxH={{ base: '30%', sm: '30%', md: '76px', lg: '76px' }}
                                                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                                alt='Caffe Latte'
                                                borderRadius="50%"
                                            />
                                            <VStack align="start" spacing={1}>
                                                <Text 
                                                    color={'#FFFFFF'} 
                                                    isTruncated 
                                                    noOfLines={1} 
                                                    maxWidth="150px"
                                                > 
                                                    <IconLocation className='iconLocation'/>
                                                    {/* Condicional para que muestre cada dirección, en caso de que haya algún null */}
                                                    {brewery.address_1 ? brewery.address_1 : brewery.address_2 ? brewery.address_2 : brewery.address_3}
                                                </Text>
                                                <Text color={'#FFFFFF'}> <PhoneIcon/> {brewery.phone}</Text>
                                            </VStack>
                                        </HStack>

                                    </CardBody>
                                    <CardFooter>
                                        <Flex justify="center" width="100%"> {/* Centrar el botón */}
                                            <Button 
                                                sx={{
                                                    width: '85%',
                                                    bgGradient: 'linear(to-r, #3540E8, #E41AD6)', // Color en degradé
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                }}
                                                _hover={{
                                                    bgGradient: "linear(to-r, #6674F4, #FF69E2)",  // Degradado más claro en hover
                                                }}
                                                onClick={() => handleBackHome(brewery.id)}
                                            >
                                                Ver más
                                            </Button>
                                        </Flex>
                                    </CardFooter>
                                </Card>
                        </SimpleGrid>
                        ))}
                        </>
                        :
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    }
                </>
            }
                
            </HStack>
        </Box>
    </div>
  );
}

export default BoxDetail;
