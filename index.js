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
const partials = {
    nav: 'partials/nav',
    footer: 'partials/footer',
    header: 'partials/header'
};

const locals = [
    {
        pageTitle: "Home",
        pageHeader: "This is the home page"
    },
    {
        pageTitle: "Blog",
        pageHeader: "This is the blog page"
    },
    {
        pageTitle: "About",
        pageHeader: "This is the about page"
    }];

const blogData = [{
    title: "first blog post",
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam voluptatibus magnam quidem, perferendis adipisci fugiat modi temporibus laboriosam, obcaecati hic unde cumque, consequuntur accusantium repudiandae! Placeat delectus tenetur esse dolor.'
},
{
    title: 'second blog post',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam voluptatibus magnam quidem, perferendis adipisci fugiat modi temporibus laboriosam, obcaecati hic unde cumque, consequuntur accusantium repudiandae! Placeat delectus tenetur esse dolor.'
},
{
    title: 'third blog post',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam voluptatibus magnam quidem, perferendis adipisci fugiat modi temporibus laboriosam, obcaecati hic unde cumque, consequuntur accusantium repudiandae! Placeat delectus tenetur esse dolor.'
}];

app.get('/', (req, res) => {
    res.render('home', {
        locals: locals[0],
        partials
    });
});

app.get('/blog', (req, res) => {

    const blogHTML = blogData.map(post => `<h2>${post.title}</h2><p>${post.content}</p>`);
    res.render('blog', {
        locals: {
            pageTitle: "Blog",
            blogPosts: blogHTML.join('')
        },
        partials
    })
})

app.get('/about', (req, res) => {
    res.render('home', {
        locals: locals[2],
        partials
    })
})

server.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});