import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Spinner from'./components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {

  // State
  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');
  const [ spinner, setSpinner ] = useState(false);
  const [ resultado, setREsultado ] = useState({}); 


  // Consulta a la api
  useEffect(
    () => {
      const cotizarCriptomoneda = async () => {

        // No realizar la llamada a la API si no hay moneda
        if(moneda === '') return null;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        // Mostrar el spinner
        setSpinner(true);

        setTimeout(() => {
          // Ocultar el spinner
          setSpinner(false);
          
          // Guardar el resultado en el state
          setREsultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        }, 3000);
      }

      cotizarCriptomoneda();
    }, [moneda, criptomoneda]
  );

  // Mostrar el spinner o el resultado
  const componente = (spinner) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="Imagen criptomonedas" className="logotipo" />

        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>
          <Formulario 
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
