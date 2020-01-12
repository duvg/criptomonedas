import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';

function Formulario () {
    const [ criptomonedas, setCriptomonedas ] = useState([]);
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

    return (
        <form>
            <div className="row">
                <label htmlFor="moneda">Elije tu Moneda</label>
                <select 
                    id="moneda"
                    className="u-full-width"
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
        </form>
    );
}

export default Formulario;