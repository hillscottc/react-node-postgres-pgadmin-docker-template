const express = require('express')
const app = express()

const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

const port = process.env.API_SERVER_PORT || 4000


app.use(express.json());
// app.use(express.static(__dirname + '/static'));


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);


console.log('For health check Send an HTTP GET request at /health');
// Keep the health check endpoint as it is used for monitoring and keeping the container alive
app.get('/health', (req, res) => {
    res.sendStatus(200)
})

db.init().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => { })
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
