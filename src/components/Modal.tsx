import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text, ToastId, useToast } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalMessage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logout, email } = useAuth();
    const toast = useToast();

    const [counter, setCounter] = useState<number>(5)

    
    const toastIdRef = useRef<ToastId | null>(null); // Solo permitimos tipos compatibles con ToastId, no 'string'

    const navigate = useNavigate(); //Hook para navegar entre las rutas

    const handleDeleteUser = async () =>{
        try {
            console.log({email: email});
            
            const response = await axios.post('http://localhost:5056/remove_user', {email: email});
            console.log(response);
            
            // Si la respuesta es exitosa
            if (response.status === 201 || response.status === 200) {
                // Crear el toast y guardar el ID en la referencia
                if (!toastIdRef.current) {
                toastIdRef.current = toast({
                    title: "Cuenta eliminada exitosamente!",
                    description: `Serás redirigido al login en ${counter} segundos...`,
                    status: "success",
                    duration: null,
                    isClosable: true,
                });
                }

                // Iniciamos la cuenta regresiva
                const countdown = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
                }, 1000);

                // Después de 5 segundos, redirigimos al usuario al login, y reseteamos el token
                setTimeout(() => {
                clearInterval(countdown); // Limpiamos el intervalo
                // Aseguramos que no sea null antes de cerrarlo
                if (toastIdRef.current) {
                    toast.close(toastIdRef.current); // Cerramos el toast
                    toastIdRef.current = null; // Limpiamos la referencia
                }
                logout()
                navigate("/login"); // Redirigimos a la ruta de login
                }, 5000);
            }else{
                console.log("Hubo un error:", response);
                // Si el servidor responde con un status que no es éxito
                throw new Error(`Error: ${response.status}`);
            }

        } catch (error: any) {
            // Manejamos los posibles errores
            console.error("Error en el registro:", error.response || error.data.error);
            const messageError = error.response.data.error
            
            toast({
              title: "Hubo un problema",
              description: messageError,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
        }
    }

    //Usamos nuevamente useEffect para actualizar el toast para que haga la cuenta regresiva mientras esté activo
    useEffect(() => {
        if (counter > 0 && toastIdRef.current) {
        // Actualizar el contenido del toast existente usando el ID
        toast.update(toastIdRef.current, {
            description: `Serás redirigido al login en ${counter} segundos...`,
        });
        }
    }, [counter, toast]);


    return (
      <>
        <Text align={'start'} marginTop={'16px'} _hover={{cursor: 'pointer', color:"#1e1e1e", backgroundColor: '#fbfbfb'}} onClick={onOpen}>Borrar cuenta</Text>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Estás a punto de eliminar tu cuenta</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Una vez confirmada la acción no podrá ser reversible. Quieres avanzar?
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' onClick={handleDeleteUser}>
                Confirmar
              </Button>
              <Button variant='ghost' onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

export default ModalMessage