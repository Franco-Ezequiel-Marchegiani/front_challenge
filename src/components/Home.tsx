import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import AlertHome from './Alert_Home';
import BoxDetail from './BoxDetail';
import Footer from './Footer';
import { HamburgerIcon  } from '@chakra-ui/icons'
import axios from 'axios';


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

interface Cities{
  cities: string[];
}

const Home: React.FC = () => {

  const [data, setData] = useState<Brewery[]>([]);
  const [dataPerCity, setDataPerCity] = useState<Brewery[]>([]);
  const [cities, setCities] = useState<Cities>({ cities: [] });
  const [citySelected, setCitySelected] = useState<String | null>('Norman')

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const urlBase = process.env.REACT_APP_URL_BASE || 'http://localhost:5056/breweries';
  
  //const urlBase = 'http://localhost:5056/breweries'
    useEffect(() => {
      //Extraemos todos los datos en esta llamada
        axios.get(urlBase).then((response) =>{
          
            setData(response.data)
        }).catch((error) => {
            console.error('Error al hacer la solicitud:', error);
          });

        //Extraemos el listado de cada ciudad para que el usuario pueda filtrar
        axios.get(`${urlBase}/cities/list`).then((response) =>{
          setCities(response.data)
        }).catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });

    }, [urlBase])

    useEffect(() =>{
      setRefreshing(true)
      //Extraemos la info por ciudad, tomando de referencia el estado (Trae por defecto info de Norman)
      axios.get(`${urlBase}/city/${citySelected}`).then((response) =>{
        
        setDataPerCity(response.data)
        setRefreshing(false)
      }).catch((error) => {
          console.error('Error al hacer la solicitud:', error);
      });
    }, [urlBase, citySelected])
    
    //Acá vendría la consulta a la API, pasando la info por props al BoxDetail, para que rellene cada campo
    //Osea, lo que se haría sería pasarle el state con el array de objetos, y luego en el componente BoxDetail, se mapea y repite la info, acorde sea enviada por props
    return (
    <div className="App">
        <NavBar icon={HamburgerIcon}/>
        <AlertHome/>
        <BoxDetail title={'Todas las opciones'} refreshing={false} dataAPI={data} setCitySelected={setCitySelected} cities={{ cities: [] }}/>
        <BoxDetail title={`Opciones en ${citySelected}`} refreshing={refreshing} dataAPI={dataPerCity} setCitySelected={setCitySelected} cities={cities}/>
        <Footer/>
    </div>
  );
}

export default Home;
