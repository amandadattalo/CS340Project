// get the form and add a submit event listener
const form = document.querySelector('#add_authors');
form.addEventListener('submit', addAuthor);

function addAuthor(event){
    console.log("Is this getting called?");
    event.preventDefault(); // prevent the default form submission

    let first_name = document.querySelector('#first_name').value;
    let last_name = document.querySelector('#last_name').value;

    // create an XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // set the request method and URL
    xhr.open('POST', `/add_authors`);

    // set the request header to specify the content type
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(xhr.setRequestHeader)
    // set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
        alert("Author was added successfully!");
        window.location.href = '/authors'; // redirect to /authors
        } else {
        console.log('Error: ' + xhr.status);
        alert('Something went wrong. Please ensure that all the required fields are selected.');
        
        }
    };

    // set the request body to send the author data as JSON
    let data = JSON.stringify({first_name, last_name});
    xhr.send(data);
}