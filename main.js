// Importing functions from filter.js library
import { toGrayscale, toCool, toWarm, toWeightedGrayscale, toSharpen, toFrost, toVignette, toBlackWhite, toIvory, toFade, toClassic, toSoft, toBlossom, toCartoon, toBlur } from "./filter.js";

// console.log("Image processing");

const file = document.getElementById("img"); // File input
let originalImageData; // Variable to store the image data of the uploded file
let filteredImageData; // Variable to store the image data of the filtered image

// canvas element to draw the uploaded image
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

// Variable to store the uploaded image
let uploadedImg = new Image();
let filteredImg = new Image();

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


// Upload button function
let uploadBtn = document.querySelector("#upload");
uploadBtn.addEventListener("click", () => {
    //calculating image canvas width and height
    canvas.width = uploadedImg.width;
    canvas.height = uploadedImg.height;

    // ctx.drawImage(uploadedImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImg, 0, 0);

    // Getting image data from the image
    originalImageData = ctx.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
    filteredImageData = originalImageData;

})

// Coverting the image to grayscale when clicking on grayscale button
let grayscaleBtn = document.querySelector('#grayscale');
grayscaleBtn.addEventListener('click', function () {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toGrayscale(filteredImageData);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);
})


// To changed image into weightedGrayscale
let weightedGrayscale = document.querySelector("#weightedGrayscale");
weightedGrayscale.addEventListener('click', (e) => {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toWeightedGrayscale(filteredImageData);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);
})

// For changing the brightness
let brightnessBtn = document.querySelector('#brightness');
brightnessBtn.addEventListener('change', (e) => {

    // Getting the current brightness value
    let currentBrightness = parseInt(e.target.value);
    brightnessImage(currentBrightness);

})

// for changing cool
let coolBtn = document.querySelector('#cool');
coolBtn.addEventListener('change', (e) => {

    // warmBtn.value = 0;
    // Getting the current cool value
    let currentCoolValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toCool(filteredImageData, currentCoolValue);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);
})

// for changing cool
let warmBtn = document.querySelector('#warm');
warmBtn.addEventListener('change', (e) => {

    // Getting the current warm value
    let currentWarmValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toWarm(filteredImageData, currentWarmValue);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);

})



// removing all filters
let originalImageBtn = document.querySelector("#original");
originalImageBtn.addEventListener('click', (e) => {
    //assigning original image data to filtered image data
    filteredImageData = originalImageData;

    ctx.putImageData(originalImageData, 0, 0);
})

// Downloading filtered image
let downloadBtn = document.querySelector("#download");
downloadBtn.addEventListener("click", (e) => {
    e.target.href = canvas.toDataURL("image/png");
})

// blurring effect
let blurSlider = document.querySelector("#blur");
blurSlider.addEventListener("change", () => {
    let blurValue = parseInt(blurSlider.value);
    filteredImageData = toBlur(filteredImageData, blurValue);
    ctx.putImageData(filteredImageData, 0, 0);
})


let sharp = document.querySelector('#toSharpen');
sharp.addEventListener('click', function () {
    //Getting sharppened image data
    filteredImageData = toSharpen(filteredImageData);
    //drawing image to canvas
    ctx.putImageData(filteredImageData, 0, 0);
})


//contrast filter
let contrast = document.querySelector("#contrast");
contrast.addEventListener("change", (e) => {
    addContrast(parseInt(e.target.value));
})


const brightnessImage = (value) => {

    filteredImg.src = canvas.toDataURL("image/png");
    ctx.filter = `brightness(${value}%)`;
    ctx.drawImage(filteredImg, 0, 0);
}

const addContrast = (value) => {
    filteredImg.src = canvas.toDataURL("image/png");
    ctx.filter = `contrast(${value}%)`;
    ctx.drawImage(filteredImg, 0, 0);
}

//soft button filter
let softBtn = document.querySelector("#soft");
softBtn.addEventListener("click", (e) => {
    filteredImg.src = canvas.toDataURL('image/png');
    ctx.filter = toSoft(filteredImageData);
    ctx.drawImage(filteredImg, 0, 0);
})

//frost button filter
let fadedBtn = document.querySelector("#faded");
fadedBtn.addEventListener("click", (e) => {
    filteredImg.src = canvas.toDataURL("image/png");
    ctx.filter = toFade(filteredImageData);
    ctx.drawImage(filteredImg, 0, 0);
})

// Blossom filter
let blossomBtn = document.querySelector("#blossom");
blossomBtn.addEventListener("click", (e) => {
    filteredImg.src = canvas.toDataURL("image/png");
    ctx.filter = toBlossom(originalImageData);
    ctx.drawImage(filteredImg,0,0);
})

// Ivory filter
let ivoryBtn = document.querySelector("#ivory");
ivoryBtn.addEventListener("click", (e) => {
    filteredImg.src  = canvas.toDataURL("image/png");
    ctx.filter = toIvory(originalImageData);
    ctx.drawImage(filteredImg, 0, 0);
})

// Black and white filter
let blackwhiteBtn = document.querySelector("#blackwhite");
blackwhiteBtn.addEventListener("click", (e) => {
    filteredImg.src = canvas.toDataURL("image/png");
    ctx.filter = toBlackWhite(originalImageData);
    ctx.drawImage(filteredImg, 0, 0);
})

// Classic filter
let classicBtn = document.querySelector("#classic");
classicBtn.addEventListener("click", (e) => { 
    filteredImg.src = canvas.toDataURL("image/png");
    ctx.filter = toClassic(originalImageData);
    ctx.drawImage(filteredImg, 0, 0); 
})


// Vignette filter
let vignetteBtn = document.querySelector("#vignette");
vignetteBtn.addEventListener("click", (e) => {
    filteredImageData = toVignette(filteredImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})

// Frost filter
let frostBtn = document.querySelector("#frost");
frostBtn.addEventListener("click", (e) => {
    filteredImageData = toFrost(filteredImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})

// Applying cartoon filter
let cartoonBtn = document.querySelector("#cartoon");
cartoonBtn.addEventListener("click", () => {
    filteredImageData = toCartoon(filteredImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})

// Kiss me filter
let kissmeBtn = document.querySelector("#kissme");
kissmeBtn.addEventListener("click", () => {
    
    let lipImage =new Image();
    lipImage.src = "lips-png-transparent-2.png";

    let imageWidth = 100;
    let imageHeight = 70;

    let countI = 0, countJ = 0;
    for (let i = 0; i < canvas.width; i += imageWidth)
    {
        countI++;
        for (let j = 0; j < canvas.height; j += imageHeight)
        {
            if ((countI+countJ) & 1) ctx.drawImage(lipImage, i, j, imageWidth, imageHeight);
            countJ++;
        }
    }

    filteredImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
})
