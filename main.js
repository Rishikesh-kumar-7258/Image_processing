import { toGrayscale } from "./filter.js";

// console.log("Image processing");

const file = document.getElementById("img");
let image_data;

file.addEventListener('change', (e) => {
    console.log(e.target.files[0]);

    const imgfile = e.target.files[0];

    const reader = new FileReader();
    let img_url = reader.readAsDataURL(imgfile);

    reader.onloadend = function(e){

        let myimg = new Image();
        myimg.src = e.target.result;

        myimg.onload = function(element){
            let canvas = document.querySelector('#canvas1');
            let ctx = canvas.getContext('2d');
            canvas.width = myimg.width;
            canvas.height = myimg.height;
            ctx.drawImage(myimg, 0, 0);
            image_data = ctx.getImageData(0, 0, myimg.width, myimg.height);
        }
    }
})

let button = document.querySelector('button');
button.addEventListener('click', function() {
    console.log(image_data);
    let new_imgdata = toGrayscale(image_data);
    console.log(new_imgdata);

    let canvas = document.querySelector('#canvas2');
    let ctx = canvas.getContext('2d');
    ctx.putImageData(new_imgdata, 0, 0);

})