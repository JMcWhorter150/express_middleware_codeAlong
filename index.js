const http = require('http');
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const app = express();
const PORT = 3000;
// there was also helmet to hide header information from h4x0rz
const morgan = require('morgan');
// morgan provides a better logging function than just console logging stuff
const logger = morgan('tiny');
// morgan('tiny') is just the important parts of Morgan rather than the total thing
const server = http.createServer(app);

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`)
//     next();
// })
// stuff copied from lecture
// used to setup the template renderer
app.engine('html', es6Renderer);
// set views to templates sets where the folder where the html is held
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(logger);

app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            pageTitle: "Home",
            pageHeader: "This is the home page"
        },
        partials: {
            nav: 'partials/nav',
            footer: 'partials/footer',
            header: 'partials/header'
        }
    });
});

server.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});