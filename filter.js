"use strict";
export const toGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        let red = RGBVal[index];
        let green = RGBVal[index + 1];
        let blue = RGBVal[index + 2];

        let gray_value = (red + green + blue) / 3;
        newRGBVal[index] = gray_value;
        newRGBVal[index + 1] = gray_value;
        newRGBVal[index + 2] = gray_value;
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const toWarm = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] + value);
        newRGBVal[index + 1] = RGBVal[index + 1];
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] - value);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const toCool = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] - value);
        newRGBVal[index + 1] = RGBVal[index + 1];
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] + value);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const brightness = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] + value);
        newRGBVal[index + 1] = trucate(RGBVal[index + 1] + value);
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] + value);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const toWeightedGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        let red = RGBVal[index];
        let green = RGBVal[index + 1];
        let blue = RGBVal[index + 2];

        let gray = 0.3 * red + 0.59 * green + 0.11 * blue;
        newRGBVal[index] = gray;
        newRGBVal[index + 1] = gray;
        newRGBVal[index + 2] = gray;
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

// Black and white filter
export const toBlackWhite = (imageData) => {
    return "contrast(175%) saturate(0%) brightness(100%)";
}

//soft image filter
export const toSoft = (imageData) => { 
    return "blur(0.6px) saturate(101%) contrast(113%) brightness(105%)";
}

//to fade filter
export const toFade = (imageData) => {
    return "blur(0.2px) saturate(80%) contrast(100%) brightness(110%) grayscale(30%)";
}

//blossom filter
export const toBlossom = (imageData) => {
    return "saturate(180%) contrast(95%) brightness(130%)";
}

//ivory filter
export const toIvory = (imageData) => {
    return "contrast(75%) saturate(105%) brightness(100%) sepia(15%)";
}

//classic filter
export const toClassic = (imageData) => {
    return "contrast(125%) saturate(105%) brightness(80%) sepia(35%)";
}







export const toSharpen = (imageData) => {

    let originalMat = new cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let sharpenMat = new cv.Mat();

    originalMat.convertTo(sharpenMat, cv.CV_8UC4, 1, 0);

    let M = new cv.matFromArray(3, 3, cv.CV_32FC1, [-1, -1, -1, -1, 7, 1, -1, -1, -1]);
    let anchor = new cv.Point(-1, -1);

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

function saturate(imageData, value) {
    value = value / 100;
    var RGBVal = imageData.data;
    for (var index = 0; index < RGBVal.length; index += 4) {
        var red = RGBVal[index];
        var green = RGBVal[index + 1];
        var blue = RGBVal[index + 2];
        var gray = 0.2989 * red + 0.5870 * green + 0.1140 * blue; //weights from CCIR 601 spec
        RGBVal[index] = trucate(-gray * value + RGBVal[index] * (1 + value));
        RGBVal[index + 1] = trucate(-gray * value + RGBVal[index + 1] * (1 + value));
        RGBVal[index + 2] = trucate(-gray * value + RGBVal[index + 2] * (1 + value));
    }
    return imageData;
};



export const toFrost = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] - 25);
        newRGBVal[index + 1] = RGBVal[index + 1];
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] + 25);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }


    newImageData = saturate(newImageData, 100);
    // newImageData = contrastImage(newImageData, 50);

    return newImageData;
}


//vignette image filter
export const toVignette = (imageData) => {
    let width = imageData.width;
    let height = imageData.height;
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;
    let centerX = width / 2;
    let centerY = height / 2;
    let radius = Math.max(centerX, centerY);
    let maxDistance = radius * radius;
    for (let index = 0; index < RGBVal.length; index += 4) {
        let x = (index / 4) % width;
        let y = Math.floor((index / 4) / width);
        let distance = (x - centerX) * (x - centerX) + (y - centerY) * (y - centerY);
        let factor = 1 - distance / maxDistance;
        if (factor < 0) {
            factor = 0;
        }
        newRGBVal[index] = RGBVal[index] * factor;
        newRGBVal[index + 1] = RGBVal[index + 1] * factor;
        newRGBVal[index + 2] = RGBVal[index + 2] * factor;
        newRGBVal[index + 3] = RGBVal[index + 3];
    }
    return newImageData;
};


// Importing functions from usingopencv

export const toEdge = (imageData) => {

    // Making cv.Mat from image data
    let originalMat = new cv.matFromImageData(imageData);

    // Making an empty cv.Mat to store the result
    let edgeMat = new cv.Mat();

    originalMat.convertTo(edgeMat, cv.CV_8UC4, 1, 0);

    // converting the image to grayscale
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(edgeMat, edgeMat, 100, 120, 5, false);
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_GRAY2RGBA);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(edgeMat.data);

    return filteredImageData;
}

export const toCartoon = (imageData) => {

    let edgeData = toBlur(imageData, 8);
    // console.log(edgeData);
    edgeData = toEdge(edgeData);
    
    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data

    for (let i = 0; i < imageData.data.length; i += 4) {
        filteredImageData.data[i] = imageData.data[i] | edgeData.data[i];
        filteredImageData.data[i + 1] = imageData.data[i+1] | edgeData.data[i + 1];
        filteredImageData.data[i + 2] = imageData.data[i+2] | edgeData.data[i + 2];
        filteredImageData.data[i + 3] = imageData.data[i+3];
    }

    return filteredImageData;
}


// export const toKissMe = (imageData) => {

//     let originalMat = new cv.matFromImageData(imageData);
//     let anotherImageData = cv.imread('red-lips');

//     cv.resize(anotherImageData, anotherImageData, new cv.Size(imageData.width/2, imageData.height/2), cv.INTER_AREA);

//     let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data

//     for (let i = 0; i < imageData.data.length; i += 4) {
//         filteredImageData.data[i] = imageData.data[i];
//         filteredImageData.data[i+1] = imageData.data[i+1];
//         filteredImageData.data[i+2] = imageData.data[i+2];
//         filteredImageData.data[i+3] = imageData.data[i+3];
//     }

//     for (let i = 0; i < imageData.data.length; i += 4) {
//         let x = i / (4 * imageData.width);
//         x += (imageData.height / 2) - (anotherImageData.rows / 2);
//         x = x * 4 * imageData.width;
//         x = parseInt(x);

//         if (anotherImageData.data[i] > 0) filteredImageData.data[x] = anotherImageData.data[i] & 255;
//         if (anotherImageData.data[i+1] > 0) filteredImageData.data[x+1] = anotherImageData.data[i+1] & 255;
//         if (anotherImageData.data[i+2] > 0) filteredImageData.data[x+2] = anotherImageData.data[i+2] & 255;
//         if (anotherImageData.data[i+3] > 0) filteredImageData.data[x+3] = anotherImageData.data[i+3] & 255;
//     }

//     return filteredImageData;
// }


export const vickySaidThis = (imageData) => {

    let filteredImageData = new ImageData(imageData.width, imageData.height);
    let filteredData = filteredImageData.data;

    let windowSize = 5;

    for (let i = 0; i < imageData.data.length; i += 4*windowSize) {
        filteredData[i] = imageData.data[i];
        filteredData[i + 1] = imageData.data[i + 1];
        filteredData[i + 2] = imageData.data[i + 2];
        filteredData[i + 3] = imageData.data[i + 3];
    }
}

//=============================== Utility functions ========================================


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
