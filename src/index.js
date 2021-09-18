//---------------------------------------


//comando para iniciar: npm run dev


//--------------------------------------




//framework web 
const express = require('express');
//plantilla  para  simular html en js 
//no hace falta requerirlo pero por las dudas
const ejs = require('ejs');
//Este módulo para trabajar con rutas de fichero
const path = require('path');
//creador de nombres unico
const { v4: uuidv4 } = require('uuid');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename: (req, file, cb) => {
        //       concateno en creador de nombres con la extencion
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }

});
//procesado de imagen con multer (condiciones de subida)
const upload = multer({
    storage: storage,
    dest: path.join(__dirname, '../public/upload'),
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        //                /expresion regular/
        const Filetype = /jpeg|png|jpg|gif/;
        const minetype = Filetype.test(file.mimetype);
        const extname = Filetype.test(path.extname(file.originalname));
        if (minetype && extname) {
            return cb(null, true);
        }
        cb("Error: el archivo no es una imagen ")
    }

    //single('nombre del input en index.ejs')
}).single('imagen');


//--------------------------------------------------------------------------

//inicializacion
const app = express();


//configuracion
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//midleware(orden antes de accion)


//llamon a la constante upload

app.use(upload);



//routes (modulo de rutas)
app.use(require('./routes/index.routes'));

//statics files (imagenes publicas)
app.use(express.static(path.join(__dirname, 'public')));

//start server 
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});