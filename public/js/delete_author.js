// Citation 
// scope (module, function or line): entire code 
// date: 03/07/23
// originality (copied, adapted, or based): based
// source: CS340 starter code

function deleteAuthor(author_id) {
	// Put our data we want to send in a javascript object
	let data = {
		id: author_id
	};

	// Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete_author", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete row
            deleteRow(author_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(author_id){

    let table = document.getElementById("authors_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data_value") == author_id) {
            table.deleteRow(i);
            break;
       }
    }
}