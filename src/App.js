import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Spinner from'./components/Spinner';

function App() {

  // State
  const [ modena, setMondea ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');
  const [ spinner, setSpinner ] = useState(false);


  // Consulta a la api
  useEffect(
    () => {
      const cotizarCriptomoneda = async () => {

        // No realizar la llamada a la API si no hay moneda
        if(modena === '') return null;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${modena}`;

        const resultado = await axios.get(url);

        console.log(resultado);

        setSpinner(true);

        setTimeout(() => {
          setSpinner(false);
        }, 3000);
      }

      cotizarCriptomoneda();
    }, [modena, criptomoneda]
  );

  // Mostrar el spinner o el resultado
  const componente = (spinner) ? <Spinner /> : null;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="Imagen criptomonedas" className="logotipo" />

        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>
          <Formulario 
            setMondea={setMondea}
            setCriptomoneda={setCriptomoneda}
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
