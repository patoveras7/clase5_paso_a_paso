const express = require('express');
const app = express();
const port = 3000;
const router = require('./ruoutes/router');
const libro = require('./models/modelos');

app.use(express.json());
app.use('/libros', router);
app.use(libro);



app.listen(port, () => { 
console.log(`Servidor Express.js en funcionamiento con puerto en ${port}`)
}); 
