/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))


PORT        = 8034;                 // Set a port number at the top so it's easy to change in the future

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
    // {
    // res.render('books');
    // });
    {  
        let query1 = "SELECT Books.title AS Title,  CONCAT('', Authors.first_name, ' ', Authors.last_name) AS Author,  \
        CASE WHEN Books.in_series then 'Yes' else 'No' end AS InSeries, Series.title AS Series, \
        Genres.name AS Genre \
        FROM Books \
        JOIN Books_Authors \
        ON Books.book_id = Books_Authors.book_id \
        JOIN Authors \
        ON Books_Authors.author_id = Authors.author_id \
        JOIN Genres \
        ON Books.genre_id = Genres.genre_id \
        LEFT JOIN Series \
        ON Books.series_id = Series.series_id;"

        let query2 = "SELECT * FROM Authors;";
        let query3 = "SELECT * FROM Series;";
        let query4 = "SELECT * FROM Genres;";

        db.pool.query(query2, function(error, rows, fields){    
            let authors = rows;

            db.pool.query(query3, function(error, rows, fields){  
                let series = rows;

                db.pool.query(query4, function(error, rows, fields){  
                    let genres = rows;

                    db.pool.query(query1, function(error, rows, fields){  
                        
                        res.render('books', {data: rows, authors: authors, series:series, genres:genres});  
                     
                    })
                })        
            })
            
        })                                                      
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

// Add 

app.get('/add_authors', function(req, res)
    {
    res.render('add_authors');
    });

app.get('/add_books', function(req, res)
    {
    res.render('add_books');
});

app.post('/add_books', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let series = parseInt(data['series']);
    if (isNaN(series))
    {
        series = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Books (title, in_series, series_id, genre_id) \
    VALUES ('${data['title']}', '${data['in_series']}', ${series}, '${data['genre']}')`;


    query2 = `INSERT INTO Books_Authors (book_id, author_id) \
    VALUES ((SELECT book_id FROM Books WHERE Books.title = '${data['title']}'), '${data['author']}')`;

    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back
        else {

            db.pool.query(query2, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, we redirect back
            else {
                res.redirect('books');
            }
            })
        }
    })
})



app.get('/add_genres', function(req, res)
    {
    res.render('add_genres');
    });

app.get('/add_series', function(req, res)
    {
    res.render('add_series');
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