// index.js

// Your base URL for your API will be: http://localhost:3000
// The endpoints you may need are:
// 	GET /ramens
// 	GET /ramens/:id
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

let ramenMenu = document.getElementById("ramen-menu");
let detailImage = document.getElementsByClassName("detail-image")[0];
let detailName = document.getElementsByClassName("name")[0];
let detailRestaurant = document.getElementsByClassName("restaurant")[0];
let detailRating = document.getElementById("rating-display");
let detailComment = document.getElementById("comment-display");
let currImage;
let count = 0;
// Callbacks
const handleClick = (image, name, restaurant, rating, comment) => {
  ramenAssigner(image, name, restaurant, rating, comment);
};

function newRamen(newRamen){
  fetch("http://localhost:3000/ramens",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newRamen)
  })
  .then(resp => resp.json())
  .then(ramen => {
    ramenImages(ramen);
  })
  .catch(error => console.log(error));

}
function formEditor(e){
  e.preventDefault();
  let newName = document.getElementById("new-name");
  let newRest = document.getElementById("new-restaurant");
  let newImg = document.getElementById("new-image");
  let newRating = document.getElementById("new-rating");
  let newComment = document.getElementById("new-comment");

  let newRamenInfo = {
    name: newName.value,
    restaurant: newRest.value,
    image: newImg.value,
    rating: newRating.value,
    comment: newComment.value
  };
  newRamen(newRamenInfo);
  e.target.reset();
}

const addSubmitListener = () => {
  let form = document.getElementById("new-ramen");
  form.addEventListener("submit", e => formEditor(e))
}

function updateRamen(e){
  e.preventDefault();
  let editRating = document.getElementById("edit-rating");
  let editComment = document.getElementById("edit-comment");
  
  detailRating.textContent = editRating.value;
  detailComment.textContent = editComment.value;
  e.target.reset();
}

function updateRamenListener(){
  let form = document.getElementById("edit-ramen");
  form.addEventListener("submit", (e) => updateRamen(e))
}

function deleteRamen(detailImage, detailName, detailRestaurant, detailRating, detailComment){
  if(currImage){
    currImage.remove();
    currImage = null;
    detailImage.src = '';
    detailImage.alt = '';
    detailName.textContent = '';
    detailRestaurant.textContent = '';
    detailRating.textContent = '';
    detailComment.textContent = '';
  }
}

function deleteRamenListener(detailImage, detailName, detailRestaurant, detailRating, detailComment){
  let deleteButton = document.getElementById("delete-button");
  deleteButton.addEventListener("click", () => deleteRamen(detailImage, detailName, detailRestaurant, detailRating, detailComment))
}

function ramenImages(ramen){
  let image = document.createElement("img");
  image.src = ramen.image;
  image.alt = ramen.name;
  
  let name = ramen.name;
  let restaurant = ramen.restaurant;
  let rating = ramen.rating;
  let comment = ramen.comment;

  if (count === 0){
    ramenAssigner(image, name, restaurant, rating, comment);
    currImage = image;
    count++;
  }

  ramenMenu.append(image);
  image.addEventListener("click", () => {
    handleClick(image, name, restaurant, rating, comment)
    currImage = image;
  })
}

function ramenAssigner(image, name, restaurant, rating, comment){
  detailImage.src = image.src;
  detailImage.alt = image.alt;
  detailName.textContent = name;
  detailRestaurant.textContent = restaurant;
  detailRating.textContent = rating;
  detailComment.textContent = comment;

  deleteRamenListener(detailImage, detailName, detailRestaurant, detailRating, detailComment);
}
 
const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
  .then(resp => resp.json())
  .then(ramens => ramens.forEach(ramen => ramenImages(ramen)));
};

const main = () => {
  displayRamens();
  addSubmitListener();
  updateRamenListener();
}

main();
//some reason this threw an error, so commented it out

// Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };