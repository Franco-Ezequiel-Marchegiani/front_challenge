import { useState, useEffect } from 'react';
import axios from 'axios';

/* A REVISAR */

//Esperamos que envíen la url en un string
const useAxios = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("URL llamada:", url);
  useEffect(() => {
    const response_test = axios.get(url); // Se realiza la llamada a la API
    console.log(response_test);
    
    const fetchData = async () => {
        try {
          setLoading(true); // Activamos estado de carga
          const response = await axios.get(url);
          
          // Verificamos el status
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          console.log("Respuesta completa de la API:", response);
          setData(response.data); // Guardamos la info en el estado
        } catch (err: any) {
          console.log(err);
          setError(err.message); // Guardamos mensaje de error
        } finally {
          setLoading(false); // Desactivamos estado de carga
        }
      };

    fetchData();
  }, [url]); // Se ejecuta cada vez que cambie la URL
  console.log(error);
  
  return { data, error, loading }; // Devolvemos la data, error y loading
};

export default useAxios;