var db = require('../database/db-connector')

function getAuthors(req, res) {
    res.render('authors');
};         


function getAddAuthors(req, res) {
    res.render('add_authors');
};


function postAddAuthors(req, res) {

};


function getEditAuthors(req, res) {
    res.render('edit_authors');
};


function postEditAuthors(req, res) {

};


function deleteAuthors(req, res) {

};


module.exports = {
    getAuthors: getAuthors,
    getAddAuthors: getAddAuthors,
    postAddAuthors: postAddAuthors,
    getEditAuthors: getEditAuthors,
    postEditAuthors: postEditAuthors,
    deleteAuthors: deleteAuthors
};