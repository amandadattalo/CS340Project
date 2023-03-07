var db = require('../database/db-connector')

function getSeries(req, res) {
    res.render('series');
};         


function getAddSeries(req, res) {
    res.render('add_series');
};


function postAddSeries(req, res) {

};


function getEditSeries(req, res) {
    res.render('edit_series');
};


function postEditSeries(req, res) {

};


function deleteSeries(req, res) {

};


module.exports = {
    getSeries: getSeries,
    getAddSeries: getAddSeries,
    postAddSeries: postAddSeries,
    getEditSeries: getEditSeries,
    postEditSeries: postEditSeries,
    deleteSeries: deleteSeries  
};