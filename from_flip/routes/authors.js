var db = require('../database/db-connector')

function getAuthors(req, res) {
    let display_authors = "SELECT Authors.author_id, Authors.first_name AS First_Name, Authors.last_name AS Last_Name, \
    GROUP_CONCAT(Books.title SEPARATOR ', ') AS Books \
    FROM Authors \
    LEFT JOIN Books_Authors ON Authors.author_id = Books_Authors.author_id \
    LEFT JOIN Books ON Books_Authors.book_id = Books.book_id \
    GROUP BY Authors.author_id;"

    db.pool.query(display_authors, function(error, rows, fields) { 
        res.render('authors', {data: rows});  
    }) 
};         


function getAddAuthors(req, res) {
    res.render('add_authors');
};


function postAddAuthors(req, res) {
    let data = req.body;
    console.log(data);

    if(!data.first_name || !data.last_name){
        res.status(400).send("Error adding author to the database");
        return;
    }

    const first_name = data.first_name;
    const last_name = data.last_name;

    let insert_author = `INSERT INTO Authors (first_name, last_name) VALUES (?, ?)`;

    db.pool.query(insert_author, [first_name, last_name], function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    })
};


function getEditAuthors(req, res) {
    let author_id = req.query.author_id;
    console.log("author id = ", author_id);

    let curr_author = `SELECT Authors.first_name AS first_name, Authors.last_name AS last_name FROM Authors\
                    WHERE Authors.author_id = ?`

    db.pool.query(curr_author, [author_id], function(error, rows, fields){
        if(error) {
            console.log(error);
        }
        console.log(rows[0]);
        let curr_first_name = rows[0].first_name;
        let curr_last_name = rows[0].last_name;        
        res.render('edit_authors', {curr_first_name: curr_first_name, curr_last_name: curr_last_name});
    })
};


function postEditAuthors(req, res) {
    let data = req.body;
    console.log("data = ", data);

    if(!data.first_name || !data.last_name){
        res.status(400).send("Error adding author to the database");
        return;
    }

    const first_name = data.first_name;
    const last_name = data.last_name;
    const author_id = parseInt(data.author_id);

    // Query to update Author
    let update_author = `UPDATE Authors SET first_name = ?, last_name = ?
            WHERE Authors.author_id = ?`;

    // Update Authors
    db.pool.query(update_author, [first_name, last_name, author_id], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(500).send("Error updating author in database");
        } else {
            res.sendStatus(200);
        }
    })      
};


function deleteAuthors(req, res) {
    let data = req.body;
    let author_id = parseInt(data.id);

    //Query to delete from Authors
    let delete_author = `DELETE FROM Authors WHERE author_id = ?`;

    // Delete from Authors
    db.pool.query(delete_author, [author_id], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
};


module.exports = {
    getAuthors: getAuthors,
    getAddAuthors: getAddAuthors,
    postAddAuthors: postAddAuthors,
    getEditAuthors: getEditAuthors,
    postEditAuthors: postEditAuthors,
    deleteAuthors: deleteAuthors
};