const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

   
    fs.readFile('usuarios.json', (err, data) => {
        if (err) throw err;

        const usuarios = JSON.parse(data);

        if (usuarios.username === username && usuarios.password === password) {
            res.redirect('welcome.html');
        } else {
            res.send('Credenciales incorrectas'); 
        }
    });
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});