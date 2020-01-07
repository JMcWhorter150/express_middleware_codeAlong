const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const logger = morgan('tiny');
const server = http.createServer(app);

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`)
//     next();
// })

app.use(logger);

app.get('/', (req, res) => {
    res.send('HomePage');
});

server.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});