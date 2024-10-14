// Tu clave de API para ExchangeRate-API
const API_KEY = 'a02844666334fd63f681087f';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

async function convertirMonedas() {
    const cantidad = document.getElementById('amount').value;
    const resultadosDiv = document.getElementById('resultados');
    
    if (!cantidad) {
        resultadosDiv.innerHTML = 'Por favor, ingrese una cantidad válida.';
        return;
    }

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data.result === "success") {
            const rates = data.conversion_rates;
            let resultados = `<h3>Resultados de la conversión para ${cantidad} USD:</h3>`;
            
            for (const [moneda, tasa] of Object.entries(rates)) {
                const convertido = (cantidad * tasa).toFixed(2);
                resultados += `<p><strong>${moneda}:</strong> ${convertido}</p>`;
            }

            resultadosDiv.innerHTML = resultados;
        } else {
            resultadosDiv.innerHTML = 'Error al obtener las tasas de cambio.';
        }
    } catch (error) {
        resultadosDiv.innerHTML = 'Error en la solicitud a la API.';
        console.error(error);
    }
}
