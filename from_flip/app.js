/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 8051;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

const path = require("path")


app.use(express.static('public')); 

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
    res.render('index');
    });

app.get('/authors', function(req, res)
    {
    res.render('authors');
    });

app.get('/books', function(req, res)
    {
    res.render('books');
    });

app.get('/genres', function(req, res)
    {
    res.render('genres');
    });

app.get('/series', function(req, res)
    {
    res.render('series');
    });

app.get('/intersection_tables', function(req, res)
    {
    res.render('intersection_tables');
    });

// Edit    

app.get('/edit_authors', function(req, res)
    {
    res.render('edit_authors');
    });

app.get('/edit_books', function(req, res)
    {
    res.render('edit_books');
    });

app.get('/edit_genres', function(req, res)
    {
    res.render('edit_genres');
    });

app.get('/edit_series', function(req, res)
    {
    res.render('edit_series');
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});