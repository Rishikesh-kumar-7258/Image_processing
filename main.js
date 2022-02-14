import {toGrayScale} from "./filter.js";

const file = document.getElementById("img"); // File input
let originalImageData; // Variable to store the image data of the uploded file
let filteredImageData; // Variable to store the image data of the filtered image

// canvas1 element to draw the uploaded image
let canvas1 = document.querySelector('#canvas1');
let ctx1 = canvas1.getContext('2d');

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

// Upload btn function
let uploadBtn = document.querySelector("#upload");
uploadBtn.addEventListener("click", () => {

    let mat = cv.imread(uploadedImg); // Reading the image using opencv
    cv.imshow('canvas1', mat); // Displaying the image on canvas1
    originalImageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height); // Getting the image data from canvas1
})

// converting image to grayscale
let grayScaleBtn = document.querySelector("#grayscale");
grayScaleBtn.addEventListener("click", () => {
    
        filteredImageData = toGrayScale(originalImageData); // Storing the image data in originalImageData variable
        ctx1.putImageData(filteredImageData, 0, 0); // Displaying the image data on canvas1
})