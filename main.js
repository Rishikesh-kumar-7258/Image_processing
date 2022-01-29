// Importing functions from filter.js library
import { toGrayscale, brightness, toCool, toWarm, toWeightedGrayscale, toBlackWhite, toSketch } from "./filter.js";

// console.log("Image processing");

const file = document.getElementById("img"); // File input
let imageData; // Variable to store the image data of the uploded file

// canvas1 element to draw the uploaded image
let canvas1 = document.querySelector('#canvas1');
let ctx1 = canvas1.getContext('2d');

// Cavas2 element to draw the processed image
let canvas2 = document.querySelector('#canvas2');
let ctx2 = canvas2.getContext('2d');

// Variable to store the uploaded image
let uploadedImg = new Image();

// On uploading the file on the file input
file.addEventListener('change', (e) => {
    // console.log(e.target.files[0]);

    const imgFile = e.target.files[0]; // Getting the firs uploaded file

    const reader = new FileReader(); // Filereader to read the file
    let imgUrl = reader.readAsDataURL(imgFile); // Reading file using file reader and getting image url

    // When the file reader is done reading the uploaded file
    reader.onloadend = function (e) {
        uploadedImg.src = e.target.result; // Setting src of image as the image url read by file reader 

        // When image is done loading
        uploadedImg.onload = function (element) {

            console.log("Image is loaded");
        }

    }
})

// populating the datalist
let brightnessList = document.querySelector("#brightnessList");
for (let i = -255; i <= 255; i += 10) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    brightnessList.appendChild(option);
}

// Upload btn function
let uploadBtn = document.querySelector("#upload");
uploadBtn.addEventListener("click", () => {

    // Setting the width and height of canvas according to the image size
    canvas1.width = uploadedImg.width;
    canvas1.height = uploadedImg.height;

    // Drawing image on canvas
    ctx1.drawImage(uploadedImg, 0, 0);

    // Getting image data from the image
    imageData = ctx1.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
})


// //upload button with size of the window
// let uploadBtn = document.querySelector("#upload");
// uploadBtn.addEventListener("click", () => {
//     let ratio = 1;
//     let h = uploadedImg.height;
//     let w = uploadedImg.width;
//     if (window.innerHeight / h < ratio) {
//         uploadedImg.height = (window.innerHeight / h) * h;
//     }
//     if (window.innerWidth / w < ratio) {
//         uploadedImg.width = (window.innerWidth / w) * w;
//     }
//     ctx1.drawImage(uploadedImg, 0, 0);

//     imageData = ctx1.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
// })

// Coverting the image to grayscale when clicking on grayscale button
let grayscaleBtn = document.querySelector('#grayscale');
grayscaleBtn.addEventListener('click', function() {

    // Getting the modified, according to grayscale function, image data
    let newImageData = toGrayscale(imageData);

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);

})

// To changed image into weightedGrayscale
let weightedGrayscale = document.querySelector("#weightedGrayscale");
weightedGrayscale.addEventListener('click', (e) => {

    // Getting the modified, according to grayscale function, image data
    let newImageData = toWeightedGrayscale(imageData);

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);
})

// For changing the brightness
let brightnessBtn = document.querySelector('#brightness');
brightnessBtn.addEventListener('change', (e) => {

    // Getting the modified, according to brightness function, image data
    let newImageData = brightness(imageData, parseInt(e.target.value));

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);

})

// for changing cool
let warmBtn = document.querySelector('#warm');
let coolBtn = document.querySelector('#cool');
coolBtn.addEventListener('change', (e) => {

    warmBtn.value = 0;

    // Getting the modified, according to cool function, image data
    let newImageData = toCool(imageData, parseInt(e.target.value));

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);

})

// for changing cool
warmBtn.addEventListener('change', (e) => {

    coolBtn.value = 0;

    // Getting the modified, according to cool function, image data
    let newImageData = toWarm(imageData, parseInt(e.target.value));

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);

})

//Black and White filter
let blackWhiteBtn = document.querySelector('#blackWhite');
blackWhiteBtn.addEventListener('click', function() {

    // Getting the modified, according to grayscale function, image data
    let newImageData = toBlackWhite(imageData);

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);

})



//Sketch filter
let sketch = document.querySelector('#sketch');
sketch.addEventListener('click', function() {

    // Getting the modified, according to grayscale function, image data
    let newImageData = toSketch(imageData);

    // Setting the width and height of canvas according to the image size
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;

    // Drawing the image on canvas
    ctx2.putImageData(newImageData, 0, 0);

})