"use strict";

export const toGrayScale = (imageData) => {

    let originalMat = cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let grayScaleMat = new cv.Mat(); // Creating a new mat to store the grayscale image

    originalMat.convertTo(grayScaleMat, cv.CV_8UC4, 1, 0);

    cv.cvtColor(grayScaleMat, grayScaleMat, cv.COLOR_RGBA2GRAY); // Converting the image to grayscale
    cv.cvtColor(grayScaleMat, grayScaleMat, cv.COLOR_GRAY2RGBA); // Converting the image to rgba

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the grayscale image to image data
    filteredImageData.data.set(grayScaleMat.data);

    return filteredImageData;
}

export const toWarm = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] + value);
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] - value);
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toCool = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] - value);
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] + value);
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toSharpen = (imageData) => {

    let originalMat = new cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let sharpenMat = new cv.Mat();

    originalMat.convertTo(sharpenMat, cv.CV_8UC4, 1, 0);

    let M = new cv.matFromArray(3, 3, cv.CV_32FC1, [-1,-1,-1,-1,7,1,-1,-1,-1]);
    let anchor = new cv.Point(-1,-1);

    cv.filter2D(sharpenMat, sharpenMat, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);

    let filteredImageData = new ImageData(imageData.width, imageData.height);
    filteredImageData.data.set(sharpenMat.data);

    return filteredImageData;
}

export const toBlur = (imageData, value) => {

    // let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
    // console.log(M);

    let originalMat = cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let blurredMat = new cv.Mat();

    originalMat.convertTo(blurredMat, cv.CV_8UC4, 1, 0);

    let kSize = new cv.Size(value, value);
    let anchor = new cv.Point(-1, -1);

    cv.blur(blurredMat, blurredMat, kSize, anchor, cv.BORDER_DEFAULT); // Blurring the image

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(blurredMat.data);
    return filteredImageData;
}

// Utility functions
const trucate = (value) => Math.min(255, Math.max(0, value));

function imageDataToImage(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}