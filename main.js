// Importing functions from filter.js library
import { toGrayscale, brightness, toCool, toWarm, toWeightedGrayscale, toBlackWhite } from "./filter.js";

// console.log("Image processing");

const file = document.getElementById("img"); // File input
let originalImageData; // Variable to store the image data of the uploded file
let filteredImageData; // Variable to store the image data of the filtered image
let brightnessValue = 0; // variable to store the currentBrightness value
let coolValue = 0; // variable to store the currentCool value
let warmValue = 0; // variable to store the current warm value

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

    canvas2.width = uploadedImg.width;
    canvas2.height = uploadedImg.height;

    // Drawing image on canvas
    ctx1.drawImage(uploadedImg, 0, 0);

    // Getting image data from the image
    originalImageData = ctx1.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
    filteredImageData = originalImageData;
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

//     originalImageData = ctx1.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
// })

// Coverting the image to grayscale when clicking on grayscale button
let grayscaleBtn = document.querySelector('#grayscale');
grayscaleBtn.addEventListener('click', function() {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toGrayscale(filteredImageData);

    // Drawing the image on canvas
    ctx2.putImageData(filteredImageData, 0, 0);

})

// To changed image into weightedGrayscale
let weightedGrayscale = document.querySelector("#weightedGrayscale");
weightedGrayscale.addEventListener('click', (e) => {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toWeightedGrayscale(filteredImageData);

    // Drawing the image on canvas
    ctx2.putImageData(filteredImageData, 0, 0);
})

// For changing the brightness
let brightnessBtn = document.querySelector('#brightness');
brightnessBtn.addEventListener('change', (e) => {

    // Getting the current brightness value
    let currentBrightness = parseInt(e.target.value);

    // Getting the modified, according to brightness function, image data
    filteredImageData = brightness(filteredImageData, currentBrightness - brightnessValue);
    brightnessValue = currentBrightness;

    // Drawing the image on canvas
    ctx2.putImageData(filteredImageData, 0, 0);

})

// for changing cool
let warmBtn = document.querySelector('#warm');
let coolBtn = document.querySelector('#cool');
coolBtn.addEventListener('change', (e) => {

    // warmBtn.value = 0;
    // Getting the current cool value
    let currentCoolValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toCool(filteredImageData, currentCoolValue - coolValue);
    coolValue = currentCoolValue;

    // Drawing the image on canvas
    ctx2.putImageData(filteredImageData, 0, 0);

})

// for changing cool
warmBtn.addEventListener('change', (e) => {

    // coolBtn.value = 0;
    // Getting the current warm value
    let currentWarmValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toWarm(filteredImageData, currentWarmValue - warmValue);

    warmValue = currentWarmValue;

    // Drawing the image on canvas
    ctx2.putImageData(filteredImageData, 0, 0);

})

//Black and White filter
let blackWhiteBtn = document.querySelector('#blackWhite');
blackWhiteBtn.addEventListener('click', function() {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toBlackWhite(filteredImageData, 100);

    // Drawing the image on canvas
    ctx2.putImageData(filteredImageData, 0, 0);

})