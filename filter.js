"use strict";

export const toGrayScale = (imageData) => {

    console.log(imageData.data);
    
    let originalMat = cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let grayScaleMat = new cv.Mat(); // Creating a new mat to store the grayscale image

    originalMat.convertTo(grayScaleMat, cv.CV_8UC4, 1, 0);

    cv.cvtColor(grayScaleMat, grayScaleMat, cv.COLOR_RGBA2GRAY); // Converting the image to grayscale
    cv.cvtColor(grayScaleMat, grayScaleMat, cv.COLOR_GRAY2RGBA); // Converting the image to rgba

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the grayscale image to image data
    filteredImageData.data.set(grayScaleMat.data);

    return filteredImageData;
}