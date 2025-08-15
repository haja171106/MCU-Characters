// GET /characters ==> Get all characters
// POST /characters ==> Create a new character
// GET /characters/:id ==> Get a character by ID
// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by IDconst express = require('express');

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors'); 

const app = express();
app.use(express.json());
app.use(cors());

const charactersPath = path.join(__dirname, 'characters.json');

app.get('/characters', async (req, res) => {
    try {
        const data = await fs.readFile(charactersPath, 'utf8');
        res.json(JSON.parse(data).characters);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
});

app.post('/characters', async (req, res) => {
    try {
        const { name, realName, universe } = req.body;
        if (!name || !realName || !universe) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        const data = await fs.readFile(charactersPath, 'utf8');
        const jsonData = JSON.parse(data);
        const newCharacter = {
            id: jsonData.characters.length + 1,
            name,
            realName,
            universe,
        };
        jsonData.characters.push(newCharacter);
        await fs.writeFile(charactersPath, JSON.stringify(jsonData, null, 2));
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création' });
    }
});

app.get('/characters/:id', async (req, res) => {
    try {
        const data = await fs.readFile(charactersPath, 'utf8');
        const characters = JSON.parse(data).characters;
        const character = characters.find(c => c.id === parseInt(req.params.id));
        if (!character) return res.status(404).json({ error: 'Personnage non trouvé' });
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/characters/:id', async (req, res) => {
    try {
        const { name, realName, universe } = req.body;
        if (!name || !realName || !universe) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        const data = await fs.readFile(charactersPath, 'utf8');
        const jsonData = JSON.parse(data);
        const index = jsonData.characters.findIndex(c => c.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Personnage non trouvé' });

        jsonData.characters[index] = { ...jsonData.characters[index], ...req.body };
        await fs.writeFile(charactersPath, JSON.stringify(jsonData, null, 2));
        res.json(jsonData.characters[index]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
});

app.delete('/characters/:id', async (req, res) => {
    try {
        const data = await fs.readFile(charactersPath, 'utf8');
        const jsonData = JSON.parse(data);
        jsonData.characters = jsonData.characters.filter(c => c.id !== parseInt(req.params.id));
        await fs.writeFile(charactersPath, JSON.stringify(jsonData, null, 2));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});