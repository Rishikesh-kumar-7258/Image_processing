"use strict";
export const toGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) 
    {
        let r = RGBVal[i];
        let g = RGBVal[i + 1];
        let b = RGBVal[i + 2];

        let gray = (r + g + b) / 3;
        newRGBVal[i] = gray;
        newRGBVal[i + 1] = gray;
        newRGBVal[i + 2] = gray;
        newRGBVal[i + 3] = 255;
    }

    return newImageData;
}

export const toWarm = (imageData) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    // Code for warm color

    return newImageData;
}

export const toCool = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    // Code for cool color

    return newImageData;
}