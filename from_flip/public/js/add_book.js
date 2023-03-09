// get the form and add a submit event listener
const form = document.querySelector('#add_books');
form.addEventListener('submit', addBook);

function addBook(event) {
    console.log("working")
    event.preventDefault(); // prevent the default form submission

    let title = document.querySelector('#title').value;
    let authors = [...document.querySelector('#author').options]
        .filter(option => option.selected)
        .map(option => option.value);
    let in_series = document.querySelector('#in_series').value;
    let series = document.querySelector('#series').value;
    let genre = document.querySelector('#genre').value;

    // create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // set the request method and URL
    xhr.open('POST', `/add_books`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.setRequestHeader)
    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Book was added successfully!");
        window.location.href = '/books'; // redirect to /books
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the book data as JSON
    let data = JSON.stringify({title, authors, in_series, series, genre});
    xhr.send(data);
}