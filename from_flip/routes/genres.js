var db = require('../database/db-connector')

function getGenres(req, res) {
    res.render('genres');
};         


function getAddGenres(req, res) {
    res.render('add_genres');
};


function postAddGenres(req, res) {
    
};


function getEditGenres(req, res) {
    res.render('edit_genres');    
};


function postEditGenres(req, res) {

};


function deleteGenres(req, res) {

};


module.exports = {
    getGenres: getGenres,
    getAddGenres: getAddGenres,
    postAddGenres: postAddGenres,
    getEditGenres: getEditGenres,
    postEditGenres: postEditGenres,
    deleteGenres: deleteGenres 
};