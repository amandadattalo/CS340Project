// get the form and add a submit event listener
const form = document.querySelector('#update_book');
form.addEventListener('submit', updateBook);

function updateBook(event) {
    event.preventDefault(); // prevent the default form submission

    // extract book)id from the query parameter (in the URL)
    const urlParams = new URLSearchParams(window.location.search); 
    
    let book_id = urlParams.get('book_id');
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
    xhr.open('PUT', `/edit_books`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');

    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Book was edited successfully!");
        window.location.href = '/books'; // redirect to /books
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the book data as JSON
    let data = JSON.stringify({book_id, title, authors, in_series, series, genre});
    xhr.send(data);
}
