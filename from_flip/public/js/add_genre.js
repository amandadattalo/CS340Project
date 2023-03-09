// get the form and add a submit event listenerlistener
const form = document.querySelector('#add_genres');
form.addEventListener('submit', addGenre);

function addGenre(event) {
    console.log("working")
    event.preventDefault(); // prevent the default form submission

    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;

    // create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // set the request method and URL
    xhr.open('POST', `/add_genres`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.setRequestHeader)
    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Genre was added successfully!");
        window.location.href = '/genres'; // redirect to /genres
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the genre data as JSON
    let data = JSON.stringify({name, description});
    xhr.send(data);
}
