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