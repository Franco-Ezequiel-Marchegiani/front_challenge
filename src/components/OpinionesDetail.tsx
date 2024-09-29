import React from 'react';
import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import '../styles/OpinionesDetail.css'

const OpinionesDetail: React.FC = () => {

    //Acá vendría la consulta a la API, pasando la info por props al BoxDetail, para que rellene cada campo
    //Osea, lo que se haría sería pasarle el state con el array de objetos, y luego en el componente BoxDetail, se mapea y repite la info, acorde sea enviada por props
    return (
    <div className="opiniones_detail">
        <Card 
            maxW='100%' 
            marginRight={'20px'}
            backgroundColor={'#010316'}
            color={'#FFFFFF'}>
            <CardHeader>
                <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                        <Heading size='sm'>Cris</Heading>
                        </Box>
                    </Flex>
                    <Button 
                        color={'#E41AD6'} 
                        backgroundColor={'#010316'}
                        _hover={{
                            bgColor: "#151518",  // Degradado más claro en hover
                          }}>
                            Responder
                    </Button>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text align="start">
                With Chakra UI, I wanted to sync the speed of development with the speed
                of design. I wanted the developer to be just as excited as the designer to
                create a screen.
                </Text>
            </CardBody>
        </Card>
    </div>
  );
}

export default OpinionesDetail;
