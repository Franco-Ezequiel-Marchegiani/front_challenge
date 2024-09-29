import React from 'react';
import NavBar from './Navbar';
import AlertHome from './Alert_Home';
import BoxDetail from './BoxDetail';
import Footer from './Footer';

const Home: React.FC = () => {

    //Acá vendría la consulta a la API, pasando la info por props al BoxDetail, para que rellene cada campo
    //Osea, lo que se haría sería pasarle el state con el array de objetos, y luego en el componente BoxDetail, se mapea y repite la info, acorde sea enviada por props
    return (
    <div className="App">
        <NavBar/>
        <AlertHome/>
        <BoxDetail title={'Todas las opciones'}/>
        <BoxDetail title={'Opciones en California'}/>
        <Footer/>
    </div>
  );
}

export default Home;
