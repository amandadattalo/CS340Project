// Citation 
// scope (module, function or line): entire code 
// date: 03/09/23
// originality (copied, adapted, or based): based
// source: CS340 starter code, stackoverflow, w3schools and chatgpt

var db = require('../database/db-connector')

function getBooks(req, res) {
    let display_books = "SELECT Books.book_id, Books.title AS Title, \
    GROUP_CONCAT(CONCAT(Authors.first_name, ' ', Authors.last_name) SEPARATOR ', ') AS Author, \
    CASE WHEN Books.in_series then 'Yes' else 'No' end AS InSeries, Series.title AS Series, \
    Genres.name AS Genre \
    FROM Books \
    LEFT JOIN Books_Authors ON Books.book_id = Books_Authors.book_id \
    LEFT JOIN Authors ON Books_Authors.author_id = Authors.author_id \
    JOIN Genres ON Books.genre_id = Genres.genre_id \
    LEFT JOIN Series ON Books.series_id = Series.series_id \
    GROUP BY Books.book_id;"

    db.pool.query(display_books, function(error, rows, fields) { 
        res.render('books', {data: rows});  
    })
};         


function getAddBooks(req, res) {
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
};

function postAddBooks(req, res) {
    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.title || data.authors.length === 0 || !data.in_series || !data.genre) {
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
};

function getEditBooks(req, res) {
    let book_id = req.query.book_id;
    console.log(book_id);

    let curr = "SELECT Books.title AS book_title, Authors.author_id AS author_id, \
    IF(Series.title IS NOT NULL, 'Yes', '') AS in_series, IF(Series.title IS NOT NULL, Series.title, '') AS series_title, Genres.name AS genre_name \
    FROM Books \
    LEFT JOIN Books_Authors ON Books.book_id = Books_Authors.book_id \
    LEFT JOIN Authors ON Books_Authors.author_id = Authors.author_id \
    LEFT JOIN Series ON Books.series_id = Series.series_id \
    LEFT JOIN Series_Authors ON Series.series_id = Series_Authors.series_id \
    LEFT JOIN Authors AS SeriesAuthors ON Series_Authors.author_id = SeriesAuthors.author_id \
    LEFT JOIN Series AS BookSeries ON Books.series_id = BookSeries.series_id \
    LEFT JOIN Genres ON Books.genre_id = Genres.genre_id \
    WHERE Books.book_id = ?;";
    
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

                    db.pool.query(curr, [book_id], function(error, rows, fields){  
                        let curr_book_title = rows[0].book_title; 
                        let curr_series_title = rows[0].series_title 
                        let curr_authors = rows.map(row => row.author_id);
                        let curr_in_series = rows[0].in_series
                        let curr_genre = rows[0].genre_name

                        res.render('edit_books', {curr_book_title: curr_book_title, curr_series_title: curr_series_title, curr_authors: curr_authors, curr_in_series: curr_in_series, curr_genre: curr_genre, books: books, authors: authors, series: series, genres: genres});
                    })
                })
            })
        })
    })
};


function postEditBooks(req, res) {
    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.title || data.authors.length === 0 || !data.in_series || !data.genre) {
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
};

function deleteBooks(req, res) {
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
};

module.exports = {
    getBooks: getBooks,
    getAddBooks: getAddBooks,
    postAddBooks: postAddBooks,
    getEditBooks: getEditBooks,
    postEditBooks: postEditBooks,
    deleteBooks: deleteBooks
};