"use strict";
export const toGrayscale = (imageData) => {

    let rgb_val = imageData.data;
    let new_imgdata = new ImageData(imageData.width, imageData.height);
    let new_rgb_val = new_imgdata.data;

    for (let i = 0; i < rgb_val.length; i += 4) 
    {
        let r = rgb_val[i];
        let g = rgb_val[i + 1];
        let b = rgb_val[i + 2];

        let gray = (r + g + b) / 3;
        new_rgb_val[i] = gray;
        new_rgb_val[i + 1] = gray;
        new_rgb_val[i + 2] = gray;
        new_rgb_val[i + 3] = 255;
    }

    return new_imgdata;
}