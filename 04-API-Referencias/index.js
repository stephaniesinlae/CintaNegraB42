require('dotenv').config();
require('./mongoClient/index.js');
const express = require('express');
const api = express();
const PORT = process.env.PORT || 3000;

api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));

//Importa el modelo Producto
const Products = require('./models/Products');
//Importa el modelo Ticket
const Tickets = require('./models/Tickets');

api.get('/', (req, res) => res.status(200).json({ message: `it's alive!!` }));

//CRUD Products
api.post('/api/products', (req, res) => {
    const { body } = req;
    const newProduct = new Products(body);
    newProduct.save()
        .then(resMongo => res.status(201).json(resMongo))
        .catch(err => res.status(400).json(err));
});

api.get('/api/products', (req, res) => {
    Products.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.get('/api/products/:id', (req, res) => {
    Products.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.get('/api/products', (req, res) => {
    Products.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.patch('/api/products/:id', (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.delete('/api/products/:id', (req, res) => {
    Products.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//CRUD Ticket
api.post('/api/tickets', (req, res) => {
    const { body } = req;
    const newTicket = new Tickets(body);
    newTicket.save()
        .then(resMongo => res.status(201).json(resMongo))
        .catch(err => res.status(400).json(err));
});

api.get('/api/tickets', (req, res) => {
    Tickets.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.get('/api/tickets/:id', (req, res) => {
    Tickets.findById(req.params.id)
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.get('/api/tickets', (req, res) => {
    Tickets.find()
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.patch('/api/tickets/:id', (req, res) => {
    Tickets.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((resMongo) => res.status(200).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

api.delete('/api/tickets/:id', (req, res) => {
    Tickets.findByIdAndDelete(req.params.id)
        .then((resMongo) => res.status(204).json(resMongo))
        .catch((err) => res.status(400).json(err));
});

//Encender el servidor
api.listen(PORT, () => console.log(`Listening on ${PORT}`));






