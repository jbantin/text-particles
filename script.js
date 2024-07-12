window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const text = "Anarchodes";
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  ctx.font = "256px adrip1";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "#2e3a1a";
  ctx.fillStyle = "#770044";
  ctx.lineWidth = 6;

  const mouse = {
    x: null,
    y: null,
    radius: 5000,
  };

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  class Particle {
    constructor(x, y, color) {
      this.defaultX = Math.floor(x);
      this.defaultY = Math.floor(y);
      this.color = color;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = 0;
      this.vy = 0;
      this.dx = 0;
      this.dy = 0;
      this.distance = 0;
      this.force = 0;
      this.angle = 0;
      this.friction = 0.7;
      this.ease = 0.1;
    }
    draw(context, res) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, res, res);
    }
    update(context) {
      this.dx = mouse.x - this.x;
      this.dy = mouse.y - this.y;
      this.distance = this.dx * this.dx + this.dy * this.dy;

      if (this.distance < mouse.radius) {
        this.force = -mouse.radius / this.distance;
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);
      }

      this.x +=
        (this.vx *= this.friction) + (this.defaultX - this.x) * this.ease;
      this.y +=
        (this.vy *= this.friction) + (this.defaultY - this.y) * this.ease;
    }
  }

  class Efx {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particlesArray = [];
      this.res = 2;
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
            this.particlesArray.push(new Particle(x, y, color));
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
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    efx.draw(ctx);
    efx.update(ctx);
    requestAnimationFrame(animate);
  }

  const efx = new Efx(canvas.width, canvas.height);
  efx.init(ctx, text);

  animate();
});
