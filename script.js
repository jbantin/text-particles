
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// const myFont = new FontFace('myFont', 'url(./font/adrip1.ttf)');

console.log(ctx);
ctx.font = "30px adrip1";
ctx.fillText("huhuhi", 100, 100);