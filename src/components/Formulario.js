import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Formulario () {
    const [ criptomonedas, setCriptomonedas ] = useState([]);
    const [ modenaCotizar, setMonedaCotizar ] = useState('');
    const [ criptoCotizar, setCriptoCotizar ] = useState('');
    const [ error, setError ] = useState(false);


    useEffect(
        () => {
            // Llamada a la api de criptomonedas
            const consultarApi = async () => {
                const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD';
                
                const resultado = await axios.get(url);

                // Asignar la respuesta en el state
                setCriptomonedas(resultado.data.Data);

            }
            consultarApi();
        }, [] 
    );

    // Validar los campos del formulario
    const cotizarMoneda = e => {
        e.preventDefault();
        
        if(modenaCotizar === '' || criptoCotizar === '') {
            setError(true);
            return;
        }


        // Pasar los datos al componente principal
        setError(false);
    }

    // Mostrar el error en caso de no pasar la validación
    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}

            <div className="row">
                <label htmlFor="moneda">Elije tu Moneda</label>
                <select 
                    id="moneda"
                    className="u-full-width"
                    onChange={ e => setMonedaCotizar(e.target.value) }
                >
                    <option value="">-- Elije tu moneda --</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="EUR">Euros</option>
                    <option value="COL">Peso Colombiano</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                </select>
            </div>

            <div className="row">
                <label htmlFor="criptomoneda">Elije tu criptomoneda</label>
                <select 
                    id="criptomoneda"
                    className="u-full-width"
                    onChange={ e => setCriptoCotizar(e.target.value) }
                >
                    <option value="">-- Selecciona la criptomoneda --</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Cotizar"/>
        </form>
    );
}

export default Formulario;