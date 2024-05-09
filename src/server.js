const express = require('express');
const app = express();
const imageProcessor = require('./imageProcessor');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/processed', express.static(path.join(__dirname, '..', 'processed')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/process-image', (req, res) => {
    let imageUrl = req.body.imageUrl;
    imageProcessor.processImage(imageUrl)
        .then(newImageUrl => {
            res.redirect(newImageUrl);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al procesar la imagen');
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
