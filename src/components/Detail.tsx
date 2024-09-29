import { PhoneIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { ReactComponent as IconLocation } from '../icon/location-pin-svgrepo-com.svg';
import '../styles/Detail.css'

interface DetailProps {
    title: string;
  }

const Detail: React.FC<DetailProps> = (props) => {
    const {title} = props

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
    

  return (
    <div className="Detail_Container">
      <p className='title_detail'>{title}</p>
        <Box 
            ref={scrollRef}
            className='boxDetail'
            >
            <HStack spacing={4}> 
                {[...Array(10)].map((_, index) => (
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(328px, 1fr))'>
                    <Card background={"#13132D"}>
                        <CardHeader padding={'16px'}>
                        <Heading size='md' textAlign="left" color={'#EEEEEE'}> Customer dashboard</Heading>
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
                                    <Text color={'#FFFFFF'}> <IconLocation className='iconLocation'/> Text 1.</Text>
                                    <Text color={'#FFFFFF'}> <PhoneIcon/> Text 2.</Text>
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
                                >
                                    Ver más
                                </Button>
                            </Flex>
                    </CardFooter>
                    </Card>
                </SimpleGrid>
                ))}
                
            </HStack>
        </Box>
    </div>
  );
}

export default Detail;
