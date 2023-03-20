// Citation 
// scope (module, function or line): entire code 
// date: 03/09/23
// originality (copied, adapted, or based): based
// source: CS340 starter code, stackoverflow and chatgpt

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT        = 8031;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


const Handlebars = require('handlebars');
Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
  });

Handlebars.registerHelper('inList', function(item, list, options) {
if (list.includes(item)) {
    return this;
}
});

app.use(express.static('public')); 

// Import Modules
const booksModule = require('./routes/books.js');
const authorsModule = require('./routes/authors.js');
const genresModule = require('./routes/genres.js');
const seriesModule = require('./routes/series.js');

/*
    ROUTES
*/

// Home
app.get('/', function(req, res) {
    res.render('index');
});

//Books
app.get('/books', function(req, res) {  
    booksModule.getBooks(req, res)
});

app.get('/add_books', function(req, res) {
    booksModule.getAddBooks(req, res)
});

app.post('/add_books', function(req, res){
    booksModule.postAddBooks(req, res)
});

app.get('/edit_books', function(req, res) {
    booksModule.getEditBooks(req, res)
});

app.put('/edit_books', function (req, res) {
    booksModule.postEditBooks(req, res)
});

app.delete('/delete_book', function(req, res) {
    booksModule.deleteBooks(req, res)
});


// Authors
app.get('/authors', function(req, res) {
    authorsModule.getAuthors(req, res)
});

app.get('/add_authors', function(req, res) {
    authorsModule.getAddAuthors(req, res)
});

app.post('/add_authors', function(req, res){
    authorsModule.postAddAuthors(req, res)
});

app.get('/edit_authors', function(req, res) {
    authorsModule.getEditAuthors(req, res)
});

app.put('/edit_authors', function (req, res) {
    authorsModule.postEditAuthors(req, res)
});

app.delete('/delete_author', function(req, res) {
    authorsModule.deleteAuthors(req, res)
});


// Genres
app.get('/genres', function(req, res) {
    genresModule.getGenres(req, res)
});

app.get('/add_genres', function(req, res) {
    genresModule.getAddGenres(req, res)
});

app.post('/add_genres', function(req, res){
    genresModule.postAddGenres(req, res)
});

app.get('/edit_genres', function(req, res) {
    genresModule.getEditGenres(req, res)
});

app.put('/edit_genres', function (req, res) {
    genresModule.postEditGenres(req, res)
});

app.delete('/delete_genre', function(req, res) {
    genresModule.deleteGenres(req, res)
});


// Series
app.get('/series', function(req, res) {
    seriesModule.getSeries(req, res)
});

app.get('/add_series', function(req, res) {
    seriesModule.getAddSeries(req, res)
});

app.post('/add_series', function(req, res){
    seriesModule.postAddSeries(req, res)
});

app.get('/edit_series', function(req, res) {
    seriesModule.getEditSeries(req, res)
});

app.put('/edit_series', function (req, res) {
    seriesModule.postEditSeries(req, res)
});

app.delete('/delete_series', function(req, res) {
    seriesModule.deleteSeries(req, res)
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});