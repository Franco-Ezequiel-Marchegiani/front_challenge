import React from 'react';
import NavBar from './Navbar';
import AlertHome from './Alert_Home';
import Detail from './Detail';
import Footer from './Footer';

const Home: React.FC = () => {

    //Acá vendría la consulta a la API, pasando la info por props al Detail, para que rellene cada campo
    //Osea, lo que se haría sería pasarle el state con el array de objetos, y luego en el componente Detail, se mapea y repite la info, acorde sea enviada por props
    return (
    <div className="App">
        <NavBar/>
        <AlertHome/>
        <Detail title={'Todas las opciones'}/>
        <Detail title={'Opciones en California'}/>
        <Footer/>
    </div>
  );
}

export default Home;
