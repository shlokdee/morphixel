const inpimg=new Image();
inpimg.src='/input.jpg';
const otptimg=new Image();
otptimg.src='/output.jpg';
const inputcanvas=document.getElementById('inputcanvas');
const intercanvas2=document.getElementById('intercanvas2');
const outputcanvas=document.getElementById('outputcanvas');
const ctx=inputcanvas.getContext('2d');
const ctx3=intercanvas2.getContext('2d');
const ctx5=outputcanvas.getContext('2d');
var brightnessinpt=[]
var brightnessoutpt=[]

var sorted=[]

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


sorted=brightnessinpt.sort((a,b)=>b.bri-a.bri);


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
        brightnessoutpt.push({r:r,g:g,b:b,a:a, bri:(0.2176*r+0.7152*g+0.0722*b), loc:(i)});
  
}

brightnessoutpt.sort((a,b)=>b.bri-a.bri);

const final=ctx5.createImageData(outputcanvas.width,outputcanvas.height);
const finalpixels=final.data;
for (let i=0;i<finalpixels.length;i+=4){
    const location=brightnessoutpt[i/4].loc;
    finalpixels[location]=sorted[i/4].r*255;
    finalpixels[location+1]=sorted[i/4].g*255;
    finalpixels[location+2]=sorted[i/4].b*255;
    finalpixels[location+3]=sorted[i/4].a*255;



}
ctx5.putImageData(final,0,0);
}

