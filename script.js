window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const text = "Anarchode";
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  ctx.font = "480px adrip1";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "#2e3a1a";
  ctx.lineWidth = 4;

  class Particle {
    constructor(efx, x, y, color) {
      this.efx = efx;
      this.defaultX = Math.floor(x);
      this.defaultY = Math.floor(y);
      this.color = color;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (this.defaultX - this.x) / 800;
      this.vy = (this.defaultY - this.y) / 800;
    }
    draw(context, res) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, res, res);
    }
    update(context) {
      if (Math.round(this.x) !== this.defaultX) {
        this.x += this.vx;
        this.y += this.vy;
      } else {
        this.x = this.defaultX;
        this.y = this.defaultY;
      }
    }
  }

  class Efx {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particlesArray = [];
      this.res = 4;
    }
    init(context, text) {
      context.fillText(text, textX, textY);
      context.strokeText(text, textX, textY);
      const pixels = context.getImageData(0, 0, this.width, this.height).data;

      for (let y = 0; y < this.height; y += this.res) {
        for (let x = 0; x < this.width; x += this.res) {
          const index = (y * this.width + x) * 4;

          const alpha = pixels[index + 3];

          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = "rgb(" + red + "," + green + "," + blue + ")";
            this.particlesArray.push(new Particle(this, x, y, color));
          }
        }
      }
    }
    draw(context) {
      this.particlesArray.forEach((particle) =>
        particle.draw(context, this.res)
      );
    }
    update(context) {
      this.particlesArray.forEach((particle) => particle.update(context));
    }
  }

  const efx = new Efx(canvas.width, canvas.height);
  efx.init(ctx, text);
  console.log(efx.particlesArray);
  animate();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    efx.draw(ctx);
    efx.update(ctx);
    requestAnimationFrame(animate);
  }
});
