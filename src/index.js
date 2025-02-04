// index.js

// Your base URL for your API will be: http://localhost:3000
// The endpoints you may need are:
//     GET /ramens
//     GET /ramens/:id
// Feel free to add any additional classes or ids to any elements in the HTML file as you see fit.

//see all ramen images in the div with id of ramen-menu
  // displayRames()
    // requests data from the server to get all ramen object
    // display the image for each of the ramen using an img tag inside the #ramen-menu div
  // Click on an image from the #ramen-menu div and fire a callback called handleClick to 
    // see all info about that ramen displayed inside the #ramen-detail div (where it says insert comment here and insert rating here)
  // Attach a submit event listener to the new-ramen form using a function called addSubmitListener
    // after the submission, create a new ramen and add it to the #ramen-menu div
    // the new ramen doesn't need to persist; in other words if you refresh the page it's okay that the new ramen isnt on the page anymore

// Callbacks
const div = document.getElementById("ramen-menu");
function displayRamens(data){
  
}

const handleClick = (ramen) => {
  // Add code
};

const addSubmitListener = () => {
  // Add code
}

const displayRamens = () => {
  fetch("http://localhost:3000")
  .then(resp => resp.json())
  .then(ramen => array.forEach(displayRamens(ramen)));
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
