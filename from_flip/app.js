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

app.get('/books', function(req, res) {  
    let display_books = "SELECT Books.book_id, Books.title AS Title, \
                  GROUP_CONCAT(CONCAT(Authors.first_name, ' ', Authors.last_name) SEPARATOR ', ') AS Author, \
                  CASE WHEN Books.in_series then 'Yes' else 'No' end AS InSeries, Series.title AS Series, \
                  Genres.name AS Genre \
                  FROM Books \
                  JOIN Books_Authors ON Books.book_id = Books_Authors.book_id \
                  JOIN Authors ON Books_Authors.author_id = Authors.author_id \
                  JOIN Genres ON Books.genre_id = Genres.genre_id \
                  LEFT JOIN Series ON Books.series_id = Series.series_id \
                  GROUP BY Books.book_id;"

    db.pool.query(display_books, function(error, rows, fields) { 
        res.render('books', {data: rows});  
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
    let query1 = "SELECT * FROM Authors;";
    let query2 = "SELECT * FROM Series;";
    let query3 = "SELECT * FROM Genres;";

    db.pool.query(query1, function(error, rows, fields){    
        let authors = rows

        db.pool.query(query2, function(error, rows, fields){  
            let series = rows

            db.pool.query(query3, function(error, rows, fields){  
                let genres = rows

                res.render('add_books', {authors: authors, series: series, genres: genres});
            })
        })
    })
});

app.post('/add_books', function(req, res){

    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.title || !data.authors || !data.in_series || !data.genre) {
        res.status(400).send("Error adding book to the database");
        return;
    }
    
    if (data.in_series == "1" && !data.series) {
        res.status(400).send("Error adding book to the database");
        return;
    }
   
    // Constants 
    const title = data.title;
    const authors = data.authors
    const in_series = data.in_series;
    const series_id = in_series == "1" ? parseInt(data.series) : null;
    const genre_id = parseInt(data.genre);

    // Query to insert into Books
    let insert_book = `INSERT INTO Books (title, in_series, series_id, genre_id) VALUES (?, ?, ?, ?)`;

    // Get the ID of the newly inserted book
    let book_id_query = `SELECT book_id FROM Books WHERE Books.title = ?`;
    let book_id;

    // Query to insert into Books_Authors
    let insert_books_authors = `INSERT INTO Books_Authors (book_id, author_id) VALUES (?, ?)`;

    // Insert into Books
    db.pool.query(insert_book, [title, in_series, series_id, genre_id], function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {

            // Get book_id
            db.pool.query(book_id_query, [title], function(error, rows, fields){
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                } else {
                    
                    book_id = rows[0].book_id;
                    // Insert into Book_Authors and iterate through authors, if needed
                    for (const author_id of authors) {
                        db.pool.query(insert_books_authors, [book_id, author_id], function(error, rows, fields){
                            if (error) {
                                console.log(error)
                                res.sendStatus(400);
                            } 
                        })
                    }
                    res.sendStatus(200);
                }
            })
        }
    })
});


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

app.get('/edit_books', function(req, res) {
    
        let query1 = "SELECT * FROM Books;";
        let query2 = "SELECT * FROM Authors;";
        let query3 = "SELECT * FROM Series;";
        let query4 = "SELECT * FROM Genres;";
    
        db.pool.query(query1, function(error, rows, fields){    
            let books = rows;
    
            db.pool.query(query2, function(error, rows, fields){  
                let authors = rows;
    
                db.pool.query(query3, function(error, rows, fields){  
                    let series = rows;

                    db.pool.query(query4, function(error, rows, fields){  
                        let genres = rows;    

                    res.render('edit_books', {books: books, authors: authors, series: series, genres: genres});
                })
            })
        })
    })
});

app.put('/edit_books', function (req, res) {

    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.title || !data.authors || !data.in_series || !data.genre) {
        res.status(400).send("Error updating book in database");
        return;
    }
    
    if (data.in_series == "1" && !data.series) {
        res.status(400).send("Error updating book in database");
        return;
    }
   
    // Constants 
    const title = data.title;
    const authors = data.authors
    const in_series = data.in_series;
    const series_id = in_series == "1" ? parseInt(data.series) : null;
    const genre_id = parseInt(data.genre);
    const book_id = parseInt(data.book_id);

    // Query to update Book
    let update_book = `UPDATE Books 
    SET title = ?, in_series = ?, series_id = ?, genre_id = ?
    WHERE Books.book_id = ?`;

    // Query to delete and insert into Books_Authors
    let delete_books_authors = `DELETE FROM Books_Authors WHERE book_id = ?`;
    let insert_books_authors = `INSERT INTO Books_Authors (book_id, author_id) VALUES (?, ?)`;

    // Update Books
    db.pool.query(update_book, [title, in_series, series_id, genre_id, book_id], function(err) {
        if (err) {
        console.log(err.message);
        res.status(500).send("Error updating book in database");
        } else {
    
            // Delete from Book_Authors
            db.pool.query(delete_books_authors, [book_id], function(err) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send("Error updating book in database");
                } else {  
          
                    // Insert into Book_Authors and iterate through authors, if needed
                    for (const author_id of authors) {
                        console.log(author_id)
                        db.pool.query(insert_books_authors, [book_id, author_id], function(err) {
                            if (err) {
                                console.log(err.message);
                                res.status(500).send("Error updating book authors in database");
                            }   
                        })
                    }
                }
                res.sendStatus(200);
            })
        }
    }) 
});

app.get('/edit_genres', function(req, res)
    {
    res.render('edit_genres');
    });

app.get('/edit_series', function(req, res)
    {
    res.render('edit_series');
    });

// Delete
app.delete('/delete_book', function(req, res){

    let data = req.body;
    let book_id = parseInt(data.id);

    // Query to delete from Books
    let delete_books = `DELETE FROM Books WHERE book_id = ?`;

    // Query to delete from Books_Authors
    let delete_books_authors = `DELETE FROM Books_Authors WHERE book_id = ?`;
  
    // Delete from Books
    db.pool.query(delete_books, [book_id], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {

            // Delete from Books_Authors
            db.pool.query(delete_books_authors, [book_id], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});