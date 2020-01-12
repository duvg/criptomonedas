import React from 'react';

function Formulario () {
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
                ></select>
            </div>
        </form>
    );
}

export default Formulario;