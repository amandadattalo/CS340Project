
let addMessagePopUp = document.getElementById('addMessage');

addMessagePopUp.addEventListener("click", removeAddMessage);

// Removes added successfully message from screen
function removeAddMessage(){
  this.style.display = "none"
}