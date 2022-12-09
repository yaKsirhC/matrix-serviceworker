if('serviceWorker' in navigator){
  window.addEventListener('load', e => {
      navigator.serviceWorker
          .register('./sw.js')
          .then(reg => console.log('script'))
          .catch(err => console.error(`service worker error: ${err}`))
  })
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const initializerText = document.querySelector(".text");

canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;

    this.chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZΞΛΠΩΨΣΔΦΓΘ";
  }

  draw(context) {
    const char = this.chars.charAt(Math.round(Math.random() * this.chars.length));
    context.fillStyle = "#0aff0a";
    context.fillText(char, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.85) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Matrix {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 10;
    this.collumns = Math.floor(canvasWidth / this.fontSize);
    this.symbs = [];
    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.collumns; i++) {
      this.symbs[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
}

const MatrixEffect = new Matrix(canvas.width, canvas.height);

let lastTime = 0;
const fps = 40;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0,0,0,.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = MatrixEffect.fontSize + "px monospace";

    for (let i = 0; i < MatrixEffect.symbs.length; i++) {
        if(MatrixEffect.symbs[i].fontSize ==0){
            MatrixEffect.symbs.splice(i,1)
            return i--
        }
      MatrixEffect.symbs[i].draw(ctx);
    }
    timer = 0;
  } else {
    timer += dt;
  }

  requestAnimationFrame(animate);
}

animate(0);

setTimeout(() => {
  completeInit();
}, 10000);

function completeInit() {
    initializerText.style.color = 'red'
    initializerText.innerHTML = "Error could not be resolved.<br /> Open the console."
    initializerText.classList.remove('animate')
}
