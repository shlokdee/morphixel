const inpimg=new Image();
inputfile=document.getElementById('inputfile');
inputfile.addEventListener('change',(e)=>{
    const file=e.target.files[0];
    inpimg.src=URL.createObjectURL(file);
})
const otptimg=new Image();
otptimg.src='output.jpg';
const inputcanvas=document.getElementById('inputcanvas');
const intercanvas2=document.getElementById('intercanvas2');
const outputcanvas=document.getElementById('outputcanvas');
const ctx=inputcanvas.getContext('2d');
const ctx3=intercanvas2.getContext('2d');
const ctx5=outputcanvas.getContext('2d');


const ctx6=document.getElementById('animated').getContext('2d');

var brightnessinpt=[]
var brightnessoutpt=[]

var sorted=[]

inpimg.onload=()=>{
    ctx.clearRect(0, 0, outputcanvas.width, outputcanvas.height);

    brightnessinpt = [];
    ctx.drawImage(inpimg,0,0,inputcanvas.width,inputcanvas.height);
    const uarray=ctx.getImageData(0,0,inputcanvas.width,inputcanvas.height).data;
    const array=Array.from(uarray);
    
    for (let i=0;i<array.length;i+=4){
        const r=array[i]/255;
        const g=array[i+1]/255;
        const b=array[i+2]/255;
        const a=array[i+3]/255;
        brightnessinpt.push({r:r,g:g,b:b,a:a, bri:(0.2126*r+0.7152*g+0.0722*b), loc:i});
        //calculating the brightness of each pixel using the formula for its sensitifity to our eyes
  
}


sorted=brightnessinpt.sort((a,b)=>b.bri-a.bri);
//sorting it in order of brightest to darkest


}


otptimg.onload=()=>{
    brightnessoutpt = [];
    ctx3.drawImage(otptimg,0,0,intercanvas2.width,intercanvas2.height);
    const uarray=ctx3.getImageData(0,0,intercanvas2.width,intercanvas2.height).data;
    const array=Array.from(uarray);
    
    for (let i=0;i<array.length;i+=4){
        const r=array[i]/255;
        const g=array[i+1]/255;
        const b=array[i+2]/255;
        const a=array[i+3]/255;
        brightnessoutpt.push({r:r,g:g,b:b,a:a, bri:(0.2126*r+0.7152*g+0.0722*b), loc:(i)});
        //same as input img
  
}

brightnessoutpt.sort((a,b)=>b.bri-a.bri);
//same as input img

}

const submit=document.getElementById("submit")
submit.addEventListener("click", ()=>{
    
    const final=ctx5.createImageData(outputcanvas.width,outputcanvas.height);
const finalpixels=final.data;
for (let i=0;i<finalpixels.length;i+=4){
    const location=brightnessoutpt[i/4].loc;
    //matches the two ascending arrays
    finalpixels[location]=sorted[i/4].r*255;
    finalpixels[location+1]=sorted[i/4].g*255;
    finalpixels[location+2]=sorted[i/4].b*255;
    finalpixels[location+3]=sorted[i/4].a*255;
    //assigns the input pixel corresponding to the output pixel brightness wise to the location of the output pixel




}
ctx5.clearRect(0, 0, outputcanvas.width, outputcanvas.height);
ctx5.putImageData(final,0,0);   
//output made invisible, still kept




const totaltime=2000;
//total time the animation runs


let starttime
animate(0) //to show the input image for some time, then start with the animation
setTimeout(()=>{
    starttime=performance.now();
    requestAnimationFrame(tick);
},1000)

function tick(now){
    const t=Math.min((now-starttime)/totaltime,1);
    //Min used to stop animation when its complete, i.e. at t=1 (basically 100%), or else it would keep going
    animate(t);
    if (t<1){
        requestAnimationFrame(tick);  //only runs the animation if t<1 (animation not complete)
    }

}


})

function animate(t){
    const test=ctx6.createImageData(outputcanvas.width,outputcanvas.height);
const tdata=test.data;
//new image data for the animated stuff


for (let k=0;k<sorted.length;k++){

const startx=(sorted[k].loc/4)%480
const starty=Math.floor(sorted[k].loc/4/480)

const endx=(brightnessoutpt[k].loc/4)%480
const endy=Math.floor(brightnessoutpt[k].loc/4/480)
//calculate the start and end x y coordinates


const xcurr=Math.floor(startx+(endx-startx)*t)
const ycurr=Math.floor(starty+(endy-starty)*t)


//t is progress from 0 to 1
//xcurr and ycurr are current pixel coords, calculated by setting progress between start and end coord as 1, and then calculating based on what progress it is at now

const ptr=(ycurr*480+xcurr)*4;
//reconstructing the pixel array index from the coords
tdata[ptr]=sorted[k].r*255
tdata[ptr+1]=sorted[k].g*255
tdata[ptr+2]=sorted[k].b*255
tdata[ptr+3]=sorted[k].a*255
//actually assigning the intermediate values to the pixel array
}

ctx6.putImageData(test,0,0)
}

