const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://marca.com";
const palabraClave = "Madrid" 
const noticias = [];

axios.get(url).then(getNoticias);



function getNoticias (response) {
    const $ = cheerio.load(response.data);
    const movil = $('.product.product1');
    movil.each((idx , element) => {
        const mov = $(element);


        let descripcion = mov.find('.product1Description span').text();
        descripcion = descripcion.split(",");
        let nombre = descripcion[0].replace("Móvil - ", "");
        descripcion.shift();
        const imagen = mov.find('.product1ImageProduct img').attr('data-original');
        const prices = mov.find('.media__price').text();
        console.log(prices);

        const objectMobile = {
            nombre,
            imagen, 
            descripcion,
            'precio': prices
        }
        

        moviles.push(objectMobile);
    })

    guardarMoviles('./data/moviles.json');
}


function guardarMoviles(route, content) {
    try {
        fs.writeFileSync(route, JSON.stringify(content));
        console.log('Guardado completado');
    } catch (err) {
        throw err;
    }
}