import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, Text, Spinner } from '@chakra-ui/react';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const Login: React.FC = () => {

  const { token, login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate(); 


  //Antes que nada, verifica si el usuario ya está registrado:

  useEffect(() => {
    if (token) {
      navigate('/'); // Redirige si ya está autenticado
    }
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  //Envío de datos
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false); 
    setLoading(true) 
    try {
      // Hacemos la solicitud POST con los datos del formulario
      const response = await axios.post('http://localhost:5056/login', formData);

      // Si la respuesta es exitosa
      if (response.status === 201 || response.status === 200) {
        
        const { token, user } = response.data
        const emailFromUser = user.email
        
        //Pasamos el token de manera global
        login({ token, email: emailFromUser });
        setSuccess(true);  // Marcamos éxito
        
        // Después de 5 segundos, redirigimos al usuario al login
        setTimeout(() => {
          navigate("/"); // Redirigimos a la ruta de login
          setLoading(false)
        }, 3000);

      }else {
            console.log("Hubo un error:", response);
            // Si el servidor responde con un status que no es éxito
            throw new Error(`Error: ${response.status}`);
          }
    } catch (error: any) {
      // Manejamos los posibles errores
      console.error("Error en el registro:", error.response || error.data.error);
      console.log(error.response.data.error);
      const messageError = error.response.data.error
      
      
      setError(error.response?.data?.message || error.message);
      setTimeout(() => {
        setLoading(false)
        toast({
          title: "Hubo un problema",
          description: messageError,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }, 1000);    }
    // Aquí iría la lógica para enviar los datos
    
  };

  const handleBackHome = () =>{
    navigate('/signin')
  }
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">

            <FormControl isRequired>
              <FormLabel color="white">Correo Electrónico</FormLabel>
              <Input name="email" type="email" onChange={handleChange} placeholder="Ingresa tu email" variant="outline"  color={"#fff"} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Contraseña</FormLabel>
              <Input name="password" type="password" onChange={handleChange} placeholder="Ingresa tu contraseña" variant="outline"  color={"#fff"} />
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              
              {
                loading ?
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='md'
                />
                :
                'Ingresar'
              }
            </Button>
            <Text color={"#fff"} fontSize={"15px"} _hover={{cursor: 'pointer'}}>No tienes cuenta? Registrate haciendo <b onClick={handleBackHome}>click aquí</b></Text>
          </VStack>
        </form>
      </Box>
    </main>
  );
};

export default Login;
