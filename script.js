const inpimg=new Image();
inpimg.src='/input.jpg';
const otptimg=new Image();
otptimg.src='/output.jpg';
const inputcanvas=document.getElementById('inputcanvas');
const intercanvas=document.getElementById('intercanvas');
const intercanvas2=document.getElementById('intercanvas2');
const intercanvas3=document.getElementById('intercanvas3');
const outputcanvas=document.getElementById('outputcanvas');
const ctx=inputcanvas.getContext('2d');
const ctx2=intercanvas.getContext('2d');
const ctx3=intercanvas2.getContext('2d');
const ctx4=intercanvas3.getContext('2d');
const ctx5=outputcanvas.getContext('2d');
var brightnessinpt=[]
var brightnessoutpt=[]


inpimg.onload=()=>{
    ctx.drawImage(inpimg,0,0,inputcanvas.width,inputcanvas.height);
    const uarray=ctx.getImageData(0,0,inputcanvas.width,inputcanvas.height).data;
    const array=Array.from(uarray);
    
    for (let i=0;i<array.length;i+=4){
        const r=array[i]/255;
        const g=array[i+1]/255;
        const b=array[i+2]/255;
        const a=array[i+3]/255;
        brightnessinpt.push({r:r,g:g,b:b,a:a, bri:(0.2176*r+0.7152*g+0.0722*b)});
  
}


const sorted=brightnessinpt.sort((a,b)=>b.bri-a.bri);

const newimagedata=ctx2.createImageData(inputcanvas.width,inputcanvas.height);
const newpixels=newimagedata.data;
for (let i=0;i<newpixels.length;i+=4){
    newpixels[i]=sorted[i/4].r*255;
    newpixels[i+1]=sorted[i/4].g*255;
    newpixels[i+2]=sorted[i/4].b*255;
    newpixels[i+3]=sorted[i/4].a*255;
}
ctx2.putImageData(newimagedata,0,0);

}


otptimg.onload=()=>{
    ctx3.drawImage(otptimg,0,0,intercanvas2.width,intercanvas2.height);
    const uarray=ctx3.getImageData(0,0,intercanvas2.width,intercanvas2.height).data;
    const array=Array.from(uarray);
    
    for (let i=0;i<array.length;i+=4){
        const r=array[i]/255;
        const g=array[i+1]/255;
        const b=array[i+2]/255;
        const a=array[i+3]/255;
        brightnessoutpt.push({r:r,g:g,b:b,a:a, bri:(0.2176*r+0.7152*g+0.0722*b)});
  
}


const sorted=brightnessoutpt.sort((a,b)=>b.bri-a.bri);

const newimagedata=ctx4.createImageData(outputcanvas.width,outputcanvas.height);
const newpixels=newimagedata.data;
for (let i=0;i<newpixels.length;i+=4){
    newpixels[i]=sorted[i/4].r*255;
    newpixels[i+1]=sorted[i/4].g*255;
    newpixels[i+2]=sorted[i/4].b*255;
    newpixels[i+3]=sorted[i/4].a*255;
}
ctx4.putImageData(newimagedata,0,0);

}

