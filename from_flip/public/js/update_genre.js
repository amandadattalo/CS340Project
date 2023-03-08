// get the form and add a submit event listener
const form = document.querySelector('#update_genre');
form.addEventListener('submit', updateGenre);

function updateGenre(event) {
    event.preventDefault(); // prevent the default form submission

    // extract genre_id from the query parameter (in the URL)
    const urlParams = new URLSearchParams(window.location.search); 
    
    let genre_id = urlParams.get('genre_id');
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;

    // create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // set the request method and URL
    xhr.open('PUT', `/edit_genres`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');

    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Genre was edited successfully!");
        window.location.href = '/genres'; // redirect to /genres
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the genre data as JSON
    let data = JSON.stringify({genre_id, name, description});
    xhr.send(data);
}
