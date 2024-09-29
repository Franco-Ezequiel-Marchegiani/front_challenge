import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, Text } from '@chakra-ui/react';
import '../styles/Registro.css'

const Registro: React.FC = () => {
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos
    toast({
      title: "Registro exitoso.",
      description: "Te has registrado correctamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <main className='registro_form_container'>
        <Box
        maxW="lg"
        mx="auto"
        p={5}
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        backgroundColor="#010316"
        width="sm"
      >
        <Heading mb={4} color="white">
          Registro
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel color="white">Nombre</FormLabel>
              <Input placeholder="Ingresa tu nombre" variant="outline" color={"#fff"} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Correo Electrónico</FormLabel>
              <Input type="email" placeholder="Ingresa tu email" variant="outline"  color={"#fff"} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Contraseña</FormLabel>
              <Input type="password" placeholder="Ingresa tu contraseña" variant="outline"  color={"#fff"} />
              <Text color={"#fff"} textAlign="start" fontSize={"14px"} paddingTop={'6px'}>(Debe contener entre 6 y 8 caracteres, alfanumérico y con una mayuscula y minúscula)</Text>
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              Registrarse
            </Button>
          </VStack>
        </form>
      </Box>
    </main>
  );
};

export default Registro;
