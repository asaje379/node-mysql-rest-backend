const express = require('express');
const cors = require('cors');
const createRoutes = require('./routes/routes');
const squelize = require('./config/connexion.config');
const rebuild = process.env.DB_RBD;

// Configuration du port et de l'adresse hote
const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

createRoutes(app);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
    if (rebuild === 'true') {
        squelize.sync({ force: 'true' }).then(() => {
            console.log('Réinitialisation de la base de donnée ...');
        });
    } else squelize.sync();

});

