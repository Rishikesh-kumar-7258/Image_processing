import {toBilateral, toBlur, toCartoon, toCool, toEdge, toGrayScale, toSepia, toSharpen, toVignette, toWarm} from "./filter.js";

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

    canvas1.width = uploadedImg.width;
    canvas1.height = uploadedImg.height;

    // ctx1.drawImage(uploadedImg, 0, 0, canvas1.width, canvas1.height);
    ctx1.drawImage(uploadedImg, 0, 0);

    // Getting image data from the image
    originalImageData = ctx1.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
    filteredImageData = originalImageData;
})

// original image
let originalImageBtn = document.querySelector("#original");
originalImageBtn.addEventListener('click', (e) => {

    uploadBtn.click();
})

// converting image to grayscale
let grayScaleBtn = document.querySelector("#grayscale");
grayScaleBtn.addEventListener("click", () => {
    
        filteredImageData = toGrayScale(originalImageData); // Storing the image data in originalImageData variable
        ctx1.putImageData(filteredImageData, 0, 0); // Displaying the image data on canvas1
})

// converting image to warm
let warmSlider = document.querySelector("#warm");
warmSlider.addEventListener("change", () => {
    let value = parseInt(warmSlider.value);
    filteredImageData = toWarm(originalImageData, value);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// converting image to cool
let coolSlider = document.querySelector("#cool");
coolSlider.addEventListener("change", () => {
    let value = parseInt(coolSlider.value);
    filteredImageData = toCool(originalImageData, value);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// Blurring the image
let blurSlider = document.querySelector("#blur");
blurSlider.addEventListener("change", () => {
    let value = parseInt(blurSlider.value);
    filteredImageData = toBlur(originalImageData, value);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// Sharpening the image
let sharpBtn = document.querySelector("#sharp");
sharpBtn.addEventListener("click", () => {
    filteredImageData = toSharpen(originalImageData);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// Sepia Effect
let sepiaBtn = document.getElementById("sepia");
sepiaBtn.addEventListener("click", () => {
    filteredImageData = toSepia(originalImageData);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// Vignette filter
let vignetteBtn = document.getElementById("vignette");
vignetteBtn.addEventListener("click", () => {
    filteredImageData = toVignette(originalImageData);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// Edge detection in image
let edgeBtn = document.querySelector("#edge");
edgeBtn.addEventListener("click", () => {
    filteredImageData = toEdge(originalImageData);
    ctx1.putImageData(filteredImageData, 0, 0);
})

// Applyingn bilateral filter
// let bilateralBtn = document.querySelector("#bilateral");
// bilateralBtn.addEventListener("click", () => {
//     filteredImageData = toBilateral(originalImageData);
//     console.log(filteredImageData);
//     ctx1.putImageData(filteredImageData, 0, 0);
// })

// Applying cartoon filter
let cartoonBtn = document.querySelector("#cartoon");
cartoonBtn.addEventListener("click", () => {
    filteredImageData = toCartoon(originalImageData);
    ctx1.putImageData(filteredImageData, 0, 0);
})