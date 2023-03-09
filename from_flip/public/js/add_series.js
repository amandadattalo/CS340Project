// get the form and add a submit event listener
const form = document.querySelector('#add_series');
form.addEventListener('submit', addSeries);

function addSeries(event) {
    event.preventDefault(); // prevent the default form submission

    let title = document.querySelector('#title').value;
    let authors = [...document.querySelector('#author').options]
        .filter(option => option.selected)
        .map(option => option.value);
    let genre = document.querySelector('#genre').value;
    let series_length = document.querySelector('#numOfBooks').value;
    

    // create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // set the request method and URL
    xhr.open('POST', `/add_series`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.setRequestHeader)
    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Series was added successfully!");
        window.location.href = '/series'; // redirect to /series
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the series data as JSON
    let data = JSON.stringify({title, authors, genre, series_length});
    xhr.send(data);
}