// Importing functions from filter.js library
import { toGrayscale, brightness, toCool, toWarm, toWeightedGrayscale, toBlackWhite, toOil_painting, toMeanBlur, toSharpen, toFrost } from "./filter.js";

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

// Variable to store the uploaded image
let uploadedImg = new Image();

// Dictionary to hold different filtes and its values
let addedFilters = [];

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

    // Drawing image on canvas
    // let ratio = canvas1.width / uploadedImg.width;
    // canvas1.width = uploadedImg.width * ratio;
    // canvas1.height = uploadedImg.height * ratio + 10;

    canvas1.width = uploadedImg.width;
    canvas1.height = uploadedImg.height;

    // ctx1.drawImage(uploadedImg, 0, 0, canvas1.width, canvas1.height);
    ctx1.drawImage(uploadedImg, 0, 0);

    // Getting image data from the image
    originalImageData = ctx1.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
    filteredImageData = originalImageData;

    brightnessValue = 0;
    coolValue = 0;
    warmValue = 0;
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
grayscaleBtn.addEventListener('click', function () {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toGrayscale(originalImageData);

    // Drawing the image on canvas
    ctx1.putImageData(filteredImageData, 0, 0);
})

// To changed image into weightedGrayscale
let weightedGrayscale = document.querySelector("#weightedGrayscale");
weightedGrayscale.addEventListener('click', (e) => {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toWeightedGrayscale(originalImageData);

    // Drawing the image on canvas
    ctx1.putImageData(filteredImageData, 0, 0);
})

// For changing the brightness
let brightnessBtn = document.querySelector('#brightness');
brightnessBtn.addEventListener('change', (e) => {

    // Getting the current brightness value
    let currentBrightness = parseInt(e.target.value);

    // Getting the modified, according to brightness function, image data
    // filteredImageData = brightness(filteredImageData, currentBrightness - brightnessValue);
    // brightnessValue = currentBrightness;

    // // Drawing the image on canvas
    // ctx1.putImageData(filteredImageData, 0, 0);
    brightnessImage(currentBrightness);

})

// for changing cool
let warmBtn = document.querySelector('#warm');
let coolBtn = document.querySelector('#cool');
coolBtn.addEventListener('change', (e) => {

    // warmBtn.value = 0;
    // Getting the current cool value
    let currentCoolValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toCool(originalImageData, currentCoolValue);
    coolValue = currentCoolValue;

    // Drawing the image on canvas
    ctx1.putImageData(filteredImageData, 0, 0);
})

// for changing cool
warmBtn.addEventListener('change', (e) => {

    // coolBtn.value = 0;
    // Getting the current warm value
    let currentWarmValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toWarm(originalImageData, currentWarmValue);

    warmValue = currentWarmValue;

    // Drawing the image on canvas
    ctx1.putImageData(filteredImageData, 0, 0);

})

// //Black and White filter
// let blackWhiteBtn = document.querySelector('#blackWhite');
// blackWhiteBtn.addEventListener('click', function () {

//     // Getting the modified, according to grayscale function, image data
//     filteredImageData = toBlackWhite(originalImageData, 128);

//     // Drawing the image on canvas
//     ctx1.putImageData(filteredImageData, 0, 0);

// })



//Sketch filter
let oil_painting = document.querySelector('#oil_painting');
oil_painting.addEventListener('click', function () {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toOil_painting(originalImageData);

    // Drawing the image on canvas
    ctx1.putImageData(filteredImageData, 0, 0);

})

// removing all filters
let originalImageBtn = document.querySelector("#original");
originalImageBtn.addEventListener('click', (e) => {

    // filteredImageData = originalImageData;

    // ctx1.putImageData(filteredImageData, 0, 0);

    // brightnessValue = 0;
    // coolValue = 0;
    // warmValue = 0;
    uploadBtn.click();
})

// Downloading image
let downloadBtn = document.querySelector("#download");
downloadBtn.addEventListener("click", (e) => {
    e.target.href = canvas1.toDataURL("image/png");
})

// mean Blur filter
let meanBlurBtn = document.querySelector("#meanBlur");
meanBlurBtn.addEventListener("change", (e) => {

    blurImage(parseInt(e.target.value));
})

// let Sketch = document.querySelector('#toSketch');
// Sketch.addEventListener('click', function(){
//     filteredImageData = toSketch(imageData);

//     // canvas1.width = imageData.width;
//     // canvas1.height = imageData.height;

//     ctx1.putImageData(filteredImageData, 0, 0);
// })


let sharp = document.querySelector('#toSharpen');
sharp.addEventListener('click', function () {
    filteredImageData = toSharpen(originalImageData);
    // canvas1.width = imageData.width;
    // canvas1.height = imageData.height;
    ctx1.putImageData(filteredImageData, 0, 0);
})

let contrast = document.querySelector("#contrast");
contrast.addEventListener("change", (e) => {
    addContrast(parseInt(e.target.value));
})



// *
// function to set change the blur of the image applicable only for this file
const blurImage = (value) => {

    ctx1.filter = `blur(${value}px)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const brightnessImage = (value) => {

    ctx1.filter = `brightness(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const addContrast = (value) => {
    ctx1.filter = `contrast(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const addGrayScale = (value) => {
    ctx1.filter = `grayscale(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const addRotateHue = (value) => {
    ctx1.filter = `hue-rotate(${value}deg)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const addOpacity = (value) => {
    ctx1.filter = `opacity(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const invertImage = (value) => {
    ctx1.filter = `invert(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const addSaturation = (value) => {
    ctx1.filter = `saturate(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const addSepia = (value) => {
    ctx1.filter = `sepia(${value}%)`;
    ctx1.drawImage(uploadedImg, 0, 0);
}

const drawImage = () => {
    let currFilters = ""
    for (let f in addedFilters) {
        currFilters += f + " ";
    }

    ctx1.drawImage(uploadedImg, 0, 0);
}

//  Soft filter Working perfectly
const soft = () => {
    ctx1.filter = 'blur(0.6px) saturate(101%) contrast(113%) brightness(105%)';
    ctx1.drawImage(uploadedImg, 0, 0);
}

let softBtn = document.querySelector("#soft");
softBtn.addEventListener("click", (e) => { soft(); })


// working good just need to add the threshold value
const faded = () => {
    ctx1.filter = 'blur(0.2px) saturate(80%) contrast(100%) brightness(110%) grayscale(30%)';
    ctx1.drawImage(uploadedImg, 0, 0);
}

let fadedBtn = document.querySelector("#faded");
fadedBtn.addEventListener("click", (e) => { faded(); })


// Blossom Filter
const blossom = () => {
    ctx1.filter = 'saturate(180%) contrast(95%) brightness(130%) ';
    ctx1.drawImage(uploadedImg, 0, 0);
}


let blossomBtn = document.querySelector("#blossom");
blossomBtn.addEventListener("click", (e) => { blossom(); })

const ivory = () => {
    ctx1.filter = 'contrast(75%) saturate(105%) brightness(100%) sepia(15%)';
    ctx1.drawImage(uploadedImg, 0, 0);
}


let ivoryBtn = document.querySelector("#ivory");
ivoryBtn.addEventListener("click", (e) => { ivory(); })

const blackwhite = () => {
    ctx1.filter = 'contrast(175%) saturate(0%) brightness(100%)';
    ctx1.drawImage(uploadedImg, 0, 0);
}

let blackwhiteBtn = document.querySelector("#blackwhite");
blackwhiteBtn.addEventListener("click", (e) => { blackwhite(); })

// 
const classic = () => {
    ctx1.filter = 'contrast(125%) saturate(105%) brightness(80%) sepia(35%)';
    ctx1.drawImage(uploadedImg, 0, 0);
}

let classicBtn = document.querySelector("#classic");
classicBtn.addEventListener("click", (e) => { classic(); })

const ivory2 = () => {
    ctx1.filter = 'contrast(100%) saturate(100%) brightness(100%) sepia(100%)';
    ctx1.drawImage(uploadedImg, 0, 0);


}

let ivory2Btn = document.querySelector("#ivory2");
ivory2Btn.addEventListener("click", (e) => {
    ivory2();
    // filteredImageData = toFrost(originalImageData);
    // ctx1.putImageData(filteredImageData, 0, 0);
})    




let frost = document.querySelector('#frost');
frost.addEventListener('click', function () {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toFrost(originalImageData);

    // Drawing the image on canvas
    ctx1.putImageData(filteredImageData, 0, 0);

})