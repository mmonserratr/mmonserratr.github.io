let fontRegular;
let stars = [];
let clicHecho = false;
let circleVisible = false;

function preload() {
  fontRegular = loadFont('Anton-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas size based on window size
  textFont(fontRegular);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let star of stars) {
    star.update();
    star.show();
  }

  if (circleVisible) {
    fill(255, 255, 0);
    noStroke();
    ellipse(0, 0, 250, 250);
  } else {
    fill(300);
    if (clicHecho) {
      textSize(20);
      text("Imagen Escrita 2023: Más sobre mí.", 0, 0);
    } else {
      textSize(30);
      text("BIENVENIDO AL PORTAFOLIO DE MONSERRAT ROMERO", 0, 0);
    }
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width / 2, height / 2);

  if (clicHecho && d < 125) {
    circleVisible = !circleVisible;
  }

  if (d < textWidth("Haz clic en este texto para ver algo nuevo") / 2) {
    clicHecho = !clicHecho;
  }
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.color = color(255, 255, 0);
  }

  update() {
    this.z -= 5;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }
  }

  show() {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 16, 0);
    fill(this.color);
    noStroke();
    drawStar(sx, sy, 5, r, r * 0.4);
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mouseWheel(event) {
  let zoom = map(event.delta, -1, 1, 0.95, 1.05);
  for (let star of stars) {
    star.x *= zoom;
    star.y *= zoom;
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}