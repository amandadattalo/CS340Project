var db = require('../database/db-connector')

function getSeries(req, res) {
    let display_series = "SELECT Series.series_id, Series.title AS Title, Genres.name AS Genre, Series.series_length AS `Series_Length` \
    FROM Series \
    JOIN Genres ON Series.genre_id = Genres.genre_id;";

    db.pool.query(display_series, function(error, rows, fields) { 
        res.render('series', {data: rows});  
    })
};       


function getAddSeries(req, res) {
    let query1 = "SELECT * FROM Authors;";
    let query2 = "SELECT * FROM Genres;";

    db.pool.query(query1, function(error, rows, fields){    
        let authors = rows

        db.pool.query(query2, function(error, rows, fields){  
            let genres = rows

            res.render('add_series', {authors: authors, genres: genres});
        })
    })
};


function postAddSeries(req, res) {
    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.title || !data.authors || !data.genre) {
        res.status(400).send("Error adding series to the database");
        return;
    }
   
    // Constants 
    const title = data.title;
    const authors = data.authors;
    const genre_id = parseInt(data.genre);
    const series_length = parseInt(data.series_length);

    // Query to insert into Series
    let insert_series = `INSERT INTO Series (title, genre_id, series_length) VALUES (?, ?, ?)`;

    // Get the ID of the newly inserted series
    let series_id_query = `SELECT series_id FROM Series WHERE Series.title = ?`;
    let series_id;

    // Query to insert into Series_Authors
    let insert_series_authors = `INSERT INTO Series_Authors (series_id, author_id) VALUES (?, ?)`;

    // Insert into Series
    db.pool.query(insert_series, [title, genre_id, series_length], function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {

            // Get series_id
            db.pool.query(series_id_query, [title], function(error, rows, fields){
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                } else {
                    
                    series_id = rows[0].series_id;
                    // Insert into Series_Authors and iterate through authors, if needed
                    for (const author_id of authors) {
                        db.pool.query(insert_series_authors, [series_id, author_id], function(error, rows, fields){
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


function getEditSeries(req, res) {
    let series_id = req.query.series_id;

    let curr = "SELECT Series.title AS series_title, Authors.author_id AS author_id, Genres.name AS genre_name, Series.series_length AS series_length \
    FROM Series \
    JOIN Series_Authors ON Series.series_id = Series_Authors.series_id \
    JOIN Authors ON Series_Authors.author_id = Authors.author_id \
    JOIN Genres ON Series.genre_id = Genres.genre_id \
    WHERE Series.series_id = ?";
    
    let query1 = "SELECT * FROM Series;";
    let query2 = "SELECT * FROM Authors;";
    let query3 = "SELECT * FROM Genres;";

    db.pool.query(query1, function(error, rows, fields){    
        let series = rows;

        db.pool.query(query2, function(error, rows, fields){  
            let authors = rows;

            db.pool.query(query3, function(error, rows, fields){  
                let genres = rows;    

                db.pool.query(curr, [series_id], function(error, rows, fields){  
                    console.log(rows)
                    let curr_series_title = rows[0].series_title; 
                    let curr_authors = rows.map(row => row.author_id);
                    let curr_genre = rows[0].genre_name
                    let curr_series_length = rows[0].series_length

                    res.render('edit_series', {curr_series_title: curr_series_title, curr_authors: curr_authors, curr_genre: curr_genre, curr_series_length: curr_series_length, series: series, authors: authors, genres: genres});
                })
            })
        })
    })
};


function postEditSeries(req, res) {
    let data = req.body;
    console.log("1")
    console.log(data)
    console.log("2")

    // Display error if user does not enter all necessary data
    if (!data.title || !data.authors || !data.genre) {
        res.status(400).send("Error updating series in database");
        return;
    }

    // Constants 
    const title = data.title;
    const authors = data.authors
    const genre_id = parseInt(data.genre);
    const series_length = parseInt(data.series_length);
    const series_id = parseInt(data.series_id);

    // Query to update Series
    let update_series = `UPDATE Series 
    SET title = ?, genre_id = ?, series_length = ?
    WHERE Series.series_id = ?`;

    // Query to delete and insert into Series_Authors
    let delete_series_authors = `DELETE FROM Series_Authors WHERE series_id = ?`;
    let insert_series_authors = `INSERT INTO Series_Authors (series_id, author_id) VALUES (?, ?)`;

    // Update Series
    db.pool.query(update_series, [title, genre_id, series_length, series_id], function(err) {
        if (err) {
        console.log(err.message);
        res.status(500).send("Error updating series in database");
        } else {

            // Delete from Series_Authors
            db.pool.query(delete_series_authors, [series_id], function(err) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send("Error updating series in database");
                } else {  
        
                    // Insert into Series_Authors and iterate through authors, if needed
                    for (const author_id of authors) {
                        console.log(author_id)
                        db.pool.query(insert_series_authors, [series_id, author_id], function(err) {
                            if (err) {
                                console.log(err.message);
                                res.status(500).send("Error updating series authors in database");
                            }   
                        })
                    }
                }
                res.sendStatus(200);
            })
        }
    }) 
};

function deleteSeries(req, res) {
    let data = req.body;
    let series_id = parseInt(data.id);

    // Query to delete from Series
    let delete_series = `DELETE FROM Series WHERE series_id = ?`;

    // Query to delete from Series_Authors
    let delete_series_authors = `DELETE FROM Series_Authors WHERE series_id = ?`;

    // Delete from Series
    db.pool.query(delete_series, [series_id], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {

            // Delete from Series_Authors
            db.pool.query(delete_series_authors, [series_id], function(error, rows, fields) {
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
    getSeries: getSeries,
    getAddSeries: getAddSeries,
    postAddSeries: postAddSeries,
    getEditSeries: getEditSeries,
    postEditSeries: postEditSeries,
    deleteSeries: deleteSeries  
};
