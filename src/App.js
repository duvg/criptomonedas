import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';

function App() {

  // State
  const [ modena, setMondea ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');


  // Consulta a la api
  useEffect(
    () => {
      const cotizarCriptomoneda = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${modena}`;

        const resultado = await axios.get(url);

        console.log(resultado);
      }

      cotizarCriptomoneda();
    }, [modena, criptomoneda]
  );

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
        </div>
      </div>
    </div>
  );
}

export default App;
