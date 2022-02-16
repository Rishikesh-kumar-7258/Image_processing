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

export const toBlackWhite = (imageData, threshold) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let index = 0; index < RGBVal.length; index += 4) {
        let average = (RGBVal[index] + RGBVal[index + 1] + RGBVal[index + 2]) / 3;

        if (average > threshold) {
            newRGBVal[index] = 255;
            newRGBVal[index + 1] = 255;
            newRGBVal[index + 2] = 255;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else {
            newRGBVal[index] = 0;
            newRGBVal[index + 1] = 0;
            newRGBVal[index + 2] = 0;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
    }
    return newImageData;
}


export const toOil_painting = (imageData) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let index = 0; index < RGBVal.length; index += 4) {
        let avg = (RGBVal[index] + RGBVal[index + 1] + RGBVal[index + 2]) / 3;
        if (avg > 200) {
            newRGBVal[index] = 255;
            newRGBVal[index + 1] = 255;
            newRGBVal[index + 2] = 255;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else if (avg > 150) {
            newRGBVal[index] = 200;
            newRGBVal[index + 1] = 200;
            newRGBVal[index + 2] = 200;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else if (avg > 100) {
            newRGBVal[index] = 155;
            newRGBVal[index + 1] = 155;
            newRGBVal[index + 2] = 155;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else if (avg > 50) {
            newRGBVal[index] = 100;
            newRGBVal[index + 1] = 100;
            newRGBVal[index + 2] = 100;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else {
            newRGBVal[index] = 0;
            newRGBVal[index + 1] = 0;
            newRGBVal[index + 2] = 0;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
    }
    return newImageData;
}

// const trucate = (value) => Math.min(255, Math.max(0, value));

// const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const letiance = (arr) => {
    let m = mean(arr);
    let s = arr.reduce((a, b) => a + (b - m) * (b - m)) / arr.length;

    let newRGBVal = newImageData.data;
    for (let i = 0; i < RGBVal.length; i += 4) {
        let avg = (RGBVal[i] + RGBVal[i + 1] + RGBVal[i + 2]) / 3;
        if (avg > 200) {
            newRGBVal[i] = 255;
            newRGBVal[i + 1] = 255;
            newRGBVal[i + 2] = 255;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 150) {
            newRGBVal[i] = 200;
            newRGBVal[i + 1] = 200;
            newRGBVal[i + 2] = 200;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 100) {
            newRGBVal[i] = 155;
            newRGBVal[i + 1] = 155;
            newRGBVal[i + 2] = 155;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 50) {
            newRGBVal[i] = 100;
            newRGBVal[i + 1] = 100;
            newRGBVal[i + 2] = 100;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else {
            newRGBVal[i] = 0;
            newRGBVal[i + 1] = 0;
            newRGBVal[i + 2] = 0;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
    }
    return newImageData;
}


const RGBtoHSL = (RGBArray) => {

    let HSLArray = [];

    let n = RGBArray.length;
    for (let i = 0; i < i; i += 4) {
        r = RGBArray[i] / 255;
        g = RGBArray[i + 1] / 255;
        b = RGBArray[i + 2] / 255;
        a = RGBArray[i + 3] / 255;

        max_ = max(r, g, b);
        min_ = min(r, g, b);

        let h, s, l;
        l = Math.round((max_ + min_) / 2);

        if (l < 0.5) s = (max_ - min_) / (max_ + min_);
        else s = (max_ - min_) / (2 - max_ - min_);

        if (max_ == r) h = (g - b) / (max_ - min_);
        else if (max_ == g) h = 2 - (b - r) / (max_ - min_);
        else h = 4 - (r - g) / (max_ - min_);

        HSLArray.push(h);
        HSLArray.push(s);
        HSLArray.push(l);
    }

    return HSLArray;
}


export const toSharpen = (imageData) => {
    let width = imageData.width;
    let height = imageData.height;
    let mix_value = 0.1;
    var x, sx, sy, red, green, blue, alpha, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = new Image(),
        dstData = imageData,
        dstBuff = dstData.data,
        srcBuff = imageData.data,
        y = height;

    while (y--) {
        x = width;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * width + x) * 4;
            red = 0;
            green = 0;
            blue = 0;
            alpha = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < height && scx >= 0 && scx < width) {
                        srcOff = (scy * width + scx) * 4;
                        wt = weights[cy * katet + cx];

                        red += srcBuff[srcOff] * wt;
                        green += srcBuff[srcOff + 1] * wt;
                        blue += srcBuff[srcOff + 2] * wt;
                        alpha += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = red * mix_value + srcBuff[dstOff] * (1 - mix_value);
            dstBuff[dstOff + 1] = green * mix_value + srcBuff[dstOff + 1] * (1 - mix_value);
            dstBuff[dstOff + 2] = blue * mix_value + srcBuff[dstOff + 2] * (1 - mix_value);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    // ctx.putImageData(dstData, 0, 0);
    console.log("Sharpen filter");
    return dstData;
}


  // Mean blur filter
export const toMeanBlur = (imageData, windowSize) => {

    // todo have to improve the algorithm for large windowSize

    windowSize = windowSize < 1 ? 1 : windowSize;

    let RGBVal = imageData.data;
    let width = imageData.width;
    let height = imageData.height;

    let newImageData = new ImageData(width, height);
    let newRGBval = newImageData.data;

    for (let i = 0; i < height - windowSize - 1; i++) {
        for (let j = 0; j < width - windowSize - 1; j++) {
            let currSum = getSum(RGBVal, i, j, windowSize, width, height);

            for (let i = 0; i < currSum.length; i++) 
            {
                currSum[i] /= windowSize * windowSize;
                Math.round(currSum[i]);
            }

            let p = ((i + Math.floor(windowSize/2)) * width * 4) + ((j + Math.floor(windowSize/2)) * 4);

            newRGBval[p] = currSum[0];
            newRGBval[p + 1] = currSum[1];
            newRGBval[p + 2] = currSum[2];
            newRGBval[p + 3] = RGBVal[p+3];
        }


    }

    return newImageData;

}

// // Frost image filter (currently on hold first, implement mean and gaussian blur which will give idea about frost filter)
// export const toFrost = (imageData, d = 1, wSize = 7) => {
//     let RGBVal = imageData.data;
//     let newImageData = new ImageData(imageData.width, imageData.height);
//     let newRGBVal = newImageData.data;

//     let s = distanceFromCenter(wSize);

//     for (let i = 0; i < imageData.height; i += 4) {
//         for (let j = 0; j < imageData.width; j += 4) {

//             let tempWindow = [];
//             for (let tempWindowIndex = 0; tempWindowIndex < wSize; tempWindowIndex++) {
//                 let tempwindow2 = []
//                 for (let tempWindowIndex2 = 0; tempWindowIndex2 < wSize; tempWindowIndex2++) {
//                     tempwindow2.push(RGBVal[(i + tempWindowIndex) * imageData.width + j + tempWindowIndex2]);
//                 }
//                 tempWindow.push(tempwindow2);
//             }

//             let windowMean = mean(tempWindow, wSize);
//             let wVariance = variance(tempWindow, wSize);
//             let windowB = d * (wVariance / (windowMean * windowMean));
//             let sumOfWeight = 0, sumOfPixelWeight = 0;

//             for (let sRowIndex = 0; sRowIndex < s.length; sRowIndex++) {
//                 for (let sColIndex = 0; sColIndex < s.length; sColIndex++) {
//                     s[sRowIndex][sColIndex] = Math.exp(-1 * windowB * s[sRowIndex][sColIndex]);
//                     sumOfWeight += s[sRowIndex][sColIndex];
//                     sumOfPixelWeight += s[sRowIndex][sColIndex] * tempWindow[sRowIndex][sColIndex];
//                 }
//             }

//             tempWindow[Math.floor(wSize / 2)][Math.floor(wSize / 2)] = sumOfPixelWeight / sumOfWeight;
//             for (let tempWindowIndex = 0; tempWindowIndex < wSize; tempWindowIndex++) {
//                 for (let tempWindowIndex2 = 0; tempWindowIndex2 < wSize; tempWindowIndex2++) {
//                     newRGBVal[(i + tempWindowIndex) * 4 * imageData.width + j + temp] = tempWindow[tempWindowIndex][tempWindowIndex2];
//                 }
//             }
//         }
//     }

//     return newImageData;
// }
//             tempWindow[Math.floor(wSize/2)][Math.floor(wSize/2)] = sumOfPixelWeight / sumOfWeight;
//             for (let tempWindowIndex = 0; tempWindowIndex < wSize; tempWindowIndex++) {
//                 for (let tempWindowIndex2 = 0; tempWindowIndex2 < wSize; tempWindowIndex2++) {
//                     newRGBVal[(i+tempWindowIndex) * 4 * imageData.width + j + temp] = tempWindow[tempWindowIndex][tempWindowIndex2];
//                 }
//             }
//         }
//     }

//     return newImageData;
// }

//=============================== Utility functions ========================================

// function to trucate the value between 0 and 255
const trucate = (value) => Math.min(255, Math.max(0, value));

// Function to find the mean of a matrix
const mean = (arr, size) => 
{
    let sum = 0;
    for (let i = 0; i < size; i++)
    {
        for (let j = 0; j < size; j++)
        {
            sum += arr[i][j];
        }
    }

    return sum / (size * size);
}

// function to find the variance of a matrix
const variance = (arr, size) => {

    let m = mean(arr, size);

    let sum = 0;
    for (let i = 0; i < size; i++) 
    {
        for (let j = 0; j < size; j++)
        {
            sum += Math.pow(arr[i][j] - m, 2);
        }
    }

    return sum/(size*size);
}

// function to find weight of a pixel
const weight = (b, s) => Math.exp(-b * s);

// function to find the distance of each pixel from center of the array
const distanceFromCenter = (size) => {

    let center = Math.floor(size / 2) - 1;
    let arr = [];

    for (let i = 0; i < size; i++) {
        let temp = [];
        for (let j = 0; j < size; j++) {
            temp.push(Math.sqrt(Math.pow(i - center, 2), Math.pow(j - center, 2)));
        }

        arr.push(temp);
    }

    print(arr);
}

const getPixel = (arr, x, y, width, height) => {
    let p = (x * 4 * width) + (y * 4);

    return [arr[p], arr[p + 1], arr[p + 2], arr[p + 3]];
}

const getSum = (arr, i, j, size, width, height) => {
    let sum = [0, 0, 0, 0];
    for (let k = i; k < i + size; k++) {
        for (let l = j; l < j + size; l++) {

            let pixel = getPixel(arr, k, l, width, height);
            sum[0] += pixel[0];
            sum[1] += pixel[1];
            sum[2] += pixel[2];
            sum[3] += pixel[3];

        }
    }

    return sum;
}


function saturate(imageData, value) {
    value = value / 100;
    var RGBVal = imageData.data;
    for (var i = 0; i < RGBVal.length; i += 4) {
        var r = RGBVal[i];
        var g = RGBVal[i + 1];
        var b = RGBVal[i + 2];
        var gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; //weights from CCIR 601 spec
        RGBVal[i] = trucate(-gray * value + RGBVal[i] * (1 + value));
        RGBVal[i + 1] = trucate(-gray * value + RGBVal[i + 1] * (1 + value));
        RGBVal[i + 2] = trucate(-gray * value + RGBVal[i + 2] * (1 + value));
    }
    return imageData;
};



export const toFrost = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] - 25);
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] + 25);
        newRGBVal[i + 3] = RGBVal[i + 3];
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

// //cartoonify an image in javascript
// export const toCartoon = (imageData) => {
//     let width = imageData.width;
//     let height = imageData.height;
//     let RGBVal = imageData.data;
//     let newImageData = new ImageData(imageData.width, imageData.height);
//     let newRGBVal = newImageData.data;

//     for (let index = 0; index < RGBVal.length; index += 4) {
//         newRGBVal[index] = RGBVal[index]*1.5;
//         newRGBVal[index + 1] = RGBVal[index + 1]*1.5;
//         newRGBVal[index + 2] = RGBVal[index + 2]*1.5;
//         newRGBVal[index + 3] = RGBVal[index + 3];
//     }
//     return newImageData;
// };