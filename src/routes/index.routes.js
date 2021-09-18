//Router para crear manejadores de rutas montables y modulares
const { Router } = require('express');
const router = Router();
const path = require('path');



//renderizo el index.ejs( osea la pagina principal)
router.get('/', (req, res) => {
    res.render('index');
});
//cuando cargo una imagen ,proceso la imagen  
router.post('/upload', (req, res) => {
    //muestro los datos de la imagen por consola
    console.log(req.file);
    //muestro en pantalla el mensaje "subido"
    res.send('subido');
});
//exporto el codigo (modulo)
module.exports = router;