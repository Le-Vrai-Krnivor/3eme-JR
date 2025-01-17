require('dotenv').config({ path: './login.env' });
const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route racine pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route test pour vérifier les variables d'environnement
app.get('/test-env', (req, res) => {
    res.json({
        message: 'Variables d\'environnement chargées',
        port: process.env.PORT
    });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).send('Page non trouvée');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
}); 