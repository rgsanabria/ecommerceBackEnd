const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/home', (req, res) => {
    
    const products = JSON.parse(fs.readFileSync('productos.json', 'utf8'));

    res.render('home', { products });
});


app.get('/realtimeproducts', (req, res) => {
    
    res.render('realTimeProducts');
});


io.on('connection', (socket) => {
    console.log('Usuario conectado');

    
    socket.on('newProduct', (newProduct) => {
        
        io.emit('updateProducts', newProduct);
    });

    socket.on('deleteProduct', (deletedProductId) => {
        
        io.emit('updateProducts', { deletedProductId });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
