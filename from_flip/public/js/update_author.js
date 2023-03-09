// get the form and add a submit event listener
const form = document.querySelector('#update_author');
form.addEventListener('submit', updateAuthor);

function updateAuthor(event) {
    event.preventDefault(); // prevent the default form submission
    console.log("edit author button pressed");

    // extract book)id from the query parameter (in the URL)
    const urlParams = new URLSearchParams(window.location.search); 
    
    let author_id = urlParams.get('author_id');
    let first_name = document.querySelector('#first_name').value;
    let last_name = document.querySelector('#last_name').value;

    // create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // set the request method and URL
    xhr.open('PUT', `/edit_authors`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');

    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Author was edited successfully!");
        window.location.href = '/authors'; // redirect to /authors
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the book data as JSON
    let data = JSON.stringify({author_id, first_name, last_name});
    xhr.send(data);
}
