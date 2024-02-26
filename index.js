const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.json());

// Read the key and certificate files
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// Endpoints
app.get('/', (req, res) => {
    res.send('Hello SFBU!');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log('New user:', newUser);
    res.json({ message: 'User created successfully', user: newUser });
});

// Create HTTPS server with Express app
const server = https.createServer(options, app);

// HTTPS default port
const port = 8080;

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
})
