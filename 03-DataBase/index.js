//Configuracion
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const api = express();
const PORT = process.env.PORT || 3000;

//Conexion a Base de Datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database conencted!`))
    .catch(() => console.log(`error connecting to database...`));

//ODM -> Objetc Document Mapping
//ORM -> Object Relational Mapping

/*
---------------------------VUELOS-------------------------
Ejercicio de diseño de base de datos (por votacion xd)
Un aeropuerto busca controlar los vuelos que llegan al lugar, desea conocer los vuelos que existen, a qué aerolínea pertenecen, las características del avión y el lugar de procedencia. Ayuda al aeropuerto a solucionar su problema.
*/

//Generar un Esquema -> Definicion de ls reglas de una coleccion
const vuelosSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    aircraft_name: {
        type: String,
        required: true,
    },
    aircraft_model: String,
    flight_from: {
        type: String,
        required: true,
    },
});

//Generar un modelo a partir del esquema -> Objeto que nos permite interactuar con la coleccion
const Vuelos = mongoose.model('Vuelos', vuelosSchema);

//Middleware
api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));

//Endpoints
//api    URL             C    A   L   L   B   A   C   K 
api.get('/', (req, res) => res.status(200).json({ message: `it's alive!!` }));

//Create
api.post('/api/vuelos', (req, res) => {
    //1) Recibir la informacion de vuelo que se queire crear desde el cliente
    const { body } = req;

    //2) Pedirle a la base de datos que cree un nuevo documento a partir del body del cliente
    const newFlight = new Vuelos(body);
    newFlight.save()

        //3) Con la respuesta que recibamos de la base de datos, le respondamos al cliente
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err));

});
//Read ONE
api.get('/api/vuelos/:id', (req, res) => {
    Vuelos.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Read ALL
api.get('/api/vuelos', (req, res) => {
    Vuelos.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Update
api.patch('/api/vuelos/:id', (req, res) => {
    Vuelos.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Delete
api.delete('/api/vuelos/:id', (req, res) => {
    Vuelos.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

// ------------------------PELICULAS-------------------------
// Un coleccionista de películas necesita organizar su colección, por lo que decide tener una app para hacerlo, necesita guardar la información básica de las películas como, nombre, género, actores y descripción. Tu eres el encargado de diseñar la base de datos para esta app

//Generar un Esquema -> Definicion de las reglas de una coleccion
const peliculasSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
    },
    gender_name: {
        type: String,
        required: true,
    },
    actor_name: {
        type: String,
        required: true,
    },
    movie_description: {
        type: String,
        required: true,
    },
});

const Peliculas = mongoose.model('Peliculas', peliculasSchema);

api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));
api.get('/', (req, res) => res.status(200).json({ message: `it's alive!!` }));

//Create
api.post('/api/peliculas', (req, res) => {
    const { body } = req;
    const newMovie = new Peliculas(body);
    newMovie.save()
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err));

});
//Read ONE
api.get('/api/peliculas/:id', (req, res) => {
    Peliculas.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Read ALL
api.get('/api/peliculas', (req, res) => {
    Peliculas.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Update
api.patch('/api/peliculas/:id', (req, res) => {
    Peliculas.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Delete
api.delete('/api/peliculas/:id', (req, res) => {
    Peliculas.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

// ------------------------REGISTROS-------------------------
// Una universidad requiere llevar un registro de todos los exalumnos que estuvieron en la universidad, para ello requieren conocer el empleo con el que cuentan los egresados, lugar donde trabajan los egresados, así como su información básica como estudiantes (facultad y carrera donde estuvieron).

//Generar un Esquema -> Definicion de las reglas de una coleccion
const registrosSchema = new mongoose.Schema({
    name: String,
    work: {
        type: String,
        required: true,
    },
    place_work: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    career: {
        type: String,
        required: true,
    },
});

const Registros = mongoose.model('Registros', registrosSchema);

api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));
api.get('/', (req, res) => res.status(200).json({ message: `it's alive!!` }));

//Create
api.post('/api/registros', (req, res) => {
    const { body } = req;
    const newRegistros = new Registros(body);
    newRegistros.save()
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err));

});
//Read ONE
api.get('/api/registros/:id', (req, res) => {
    Registros.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Read ALL
api.get('/api/registros', (req, res) => {
    Registros.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Update
api.patch('/api/registros/:id', (req, res) => {
    Registros.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Delete
api.delete('/api/registros/:id', (req, res) => {
    Registros.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

// ------------------------VETERINARIA-------------------------
// Una veterinaria, requiere un sistema que le ayude a controlar la entrada de las mascotas a la veterinaria. La veterinaria requiere almacenar el nombre de la mascota, el tipo de mascota, y el dueño de la mascota.

//Generar un Esquema -> Definicion de las reglas de una coleccion
const mascotasSchema = new mongoose.Schema({
    name_pet: {
        type: String,
        required: true,
    },
    type_pet: {
        type: String,
        required: true,
    },
    owner_pet: {
        type: String,
        required: true,
    },
});

const Mascotas = mongoose.model('Mascotas', mascotasSchema);

api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));
api.get('/', (req, res) => res.status(200).json({ message: `it's alive!!` }));

//Create
api.post('/api/mascotas', (req, res) => {
    const { body } = req;
    const newPet = new Mascotas(body);
    newPet.save()
        .then((resMongo) => res.status(201).json(resMongo))
        .catch((err) => res.status(400).json(err));

});
//Read ONE
api.get('/api/mascotas/:id', (req, res) => {
    Mascotas.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Read ALL
api.get('/api/mascotas', (req, res) => {
    Mascotas.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Update
api.patch('/api/mascotas/:id', (req, res) => {
    Mascotas.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Delete
api.delete('/api/mascotas/:id', (req, res) => {
    Mascotas.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Encender el servidor
api.listen(PORT, () => console.log(`Listening on ${PORT}`));