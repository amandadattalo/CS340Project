var db = require('../database/db-connector')

function getGenres(req, res) {
    let display_genres = "SELECT Genres.genre_id, Genres.name AS Name, Genres.description AS Description FROM Genres;"

    db.pool.query(display_genres, function(error, rows, fields) { 
        res.render('genres', {data: rows});  
    })
};         


function getAddGenres(req, res) {
    res.render('add_genres');
};


function postAddGenres(req, res) {
    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.name) {
        res.status(400).send("Error adding genre to the database");
        return;
    }
   
    // Constants 
    const name = data.name;
    const description = data.description

    // Query to insert into Genres
    let insert_genre = `INSERT INTO Genres (name, description) VALUES (?, ?)`;

    // Insert into Genres
    db.pool.query(insert_genre, [name, description], function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    })
};


function getEditGenres(req, res) {
    let genre_id = req.query.genre_id;
    console.log(genre_id);

    let curr = "SELECT Genres.name AS genre_name, Genres.description AS genre_description \
    FROM Genres \
    WHERE Genres.genre_id = ?";
      
    db.pool.query(curr, [genre_id], function(error, rows, fields){  
        let curr_genre_name = rows[0].genre_name; 
        let curr_genre_description = rows[0].genre_description; 

        res.render('edit_genres', {curr_genre_name: curr_genre_name, curr_genre_description: curr_genre_description});
    })
};


function postEditGenres(req, res) {
    let data = req.body;
    console.log(data)

    // Display error if user does not enter all necessary data
    if (!data.name) {
        res.status(400).send("Error updating genre in database");
        return;
    }

    // Constants 
    const name = data.name;
    const description = data.description
    const genre_id = parseInt(data.genre_id);


    console.log(name)
    console.log(description)
    console.log(genre_id)
    // Query to update Genre
    let update_genre = `UPDATE Genres SET name = ?, description = ? WHERE Genres.genre_id = ?`;

    // Update Genres
    db.pool.query(update_genre, [name, description, genre_id], function(err) {
        if (err) {
        console.log(err.message);
        res.status(500).send("Error updating genre in database");
        } else {
            res.sendStatus(200);
        }
    }) 
};


function deleteGenres(req, res) {
    let data = req.body;
    let genre_id = parseInt(data.id);

    // Query to delete from Genres
    let delete_genres = `DELETE FROM Genres WHERE genre_id = ?`;

    // Delete from Genres
    db.pool.query(delete_genres, [genre_id], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
};


module.exports = {
    getGenres: getGenres,
    getAddGenres: getAddGenres,
    postAddGenres: postAddGenres,
    getEditGenres: getEditGenres,
    postEditGenres: postEditGenres,
    deleteGenres: deleteGenres 
};