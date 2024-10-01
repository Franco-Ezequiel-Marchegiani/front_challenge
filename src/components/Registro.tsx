import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, Text, Progress } from '@chakra-ui/react';
import '../styles/Registro.css'
import axios from 'axios';

const Registro: React.FC = () => {
  //Definimos los estados
  const [passwordProgress, setPasswordProgress] = useState(0)
  const [color, setColor] = useState<string>('red');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  //Manejo de errores
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const toast = useToast();

  console.log(formData);

  const validatePassword = (password: string) => {
    //Definimos las validaciones de la contraseña

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 6 && password.length <= 20;

    // Calculamos el porcentaje de fortaleza de la contraseña
    let strength = 0;
    if (hasUpperCase) strength += 25;
    if (hasLowerCase) strength += 25;
    if (hasNumber) strength += 25;
    if (isValidLength) strength += 25;

    return strength
  }
  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);
    
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'password') {
        
        const strength = validatePassword(value); // Obtenemos la fortaleza de la contraseña
        setPasswordProgress(strength); //Actualizamos el estado con lo que nos devuelve la funciuón validatePassword
        if(strength === 100){
          setColor('green')
        }
        else{
          setColor('red')

        }
    }
    //validatePassword()
  };

  //Envío de datos
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);  
    try {
      // Hacemos la solicitud POST con los datos del formulario
      const response = await axios.post('http://localhost:5056/register', formData);

      // Si la respuesta es exitosa
      if (response.status === 201 || response.status === 200) {
        console.log("Registro exitoso:", response.data);
        setSuccess(true);  // Marcamos éxito
        toast({
          title: "Registro exitoso.",
          description: "Te has registrado correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
      
      toast({
        title: "Hubo un problema",
        description: messageError,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setError(error.response?.data?.message || error.message);
    }
    // Aquí iría la lógica para enviar los datos
    
  };

  /* 
  
  */

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
              <Input name="username" value={formData.username} onChange={handleChange} placeholder="Ingresa tu nombre" variant="outline" color={"#fff"} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Correo Electrónico</FormLabel>
              <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Ingresa tu email" variant="outline"  color={"#fff"} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Contraseña</FormLabel>
              <Input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Ingresa tu contraseña" variant="outline"  color={"#fff"} />
              <Text color={"#fff"} textAlign="start" fontSize={"14px"} paddingTop={'6px'} paddingBottom={'6px'}>(Debe contener entre 6 y 20 caracteres, alfanumérico y con una mayuscula y minúscula)</Text>
              <Progress value={passwordProgress} min={0} max={100} isAnimated={true} size='xs' colorScheme={color} />
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
