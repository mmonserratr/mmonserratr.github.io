let fontRegular;
let stars = [];
let clicHecho = false;
let circleVisible = false;

function preload() {
  fontRegular = loadFont('Anton-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
    ellipse(0, 0, 225, 225);
    checkMouseOverLink("E2", -50, -40, "Experimentación", " https://mmonserratr.github.io/Encargo-2/");
    checkMouseOverLink("E3", -50, 30, "Timbre", " https://mmonserratr.github.io/Encargo-3/");
    checkMouseOverLink("E4", 50, -40, "Recursión", " https://mmonserratr.github.io/Encargo-4/");
    checkMouseOverLink("E5", 50, 30, "Ramificación", " https://mmonserratr.github.io/Encargo-5/");
    checkMouseOverLink("E6", 0, 50, "blendMode y Noise", " https://mmonserratr.github.io/Encargo-6/");

    fill(300);
    textSize(16);
    text("Éste portafolio tiene el objetivo de almacenar todos los experimentos con timbre, ramificación de", 0, -height / 2 + 55);
    text("objetos, recursión, entre otros, realizados por mí durante el curso de Imagen Escrita, en el cual", 0, -height / 2 + 75);
    text("se utilizaron herramientas como HTML, CSS, P5js, Visual Studio Code y Github. Éste fue mi primer", 0, -height / 2 + 95);
    text("acercamiento a la programación para la creación de un sitio web y diversos diseños interactivos.", 0, -height / 2 + 115);
    textSize(15)
      text("(Mueve el cursor sobre el círculo y haz clic para visualizar las tareas. Para volver al inicio, haz doble clic en éste.)", 0, 135);
  } else {
    fill(300);
    if (clicHecho) {
      textSize(30);
      text("Imagen Escrita 2023: Más sobre mí.", 0, 0);

      // Párrafo de texto adicional
      textSize(16);
      text("¡Hola! Mi nombre es Monserrat Romero y soy estudiante de segundo año de la carrera de", 0, 50);
      text("Diseño en la Pontificia Universidad Católica de Valparaíso, ingresé el primer semestre del", 0, 80);
      text("año 2022 y actualmente pertenezco al Taller del Habitar. Siempre he estado más ligada al", 0, 110);
      text("área gráfica, sin embargo, últimamente me he interesado por el área industrial.", 0, 140);
    } else {
      textSize(50);
      text("BIENVENIDO AL PORTAFOLIO DE MONSERRAT ROMERO", 0, 0);
      textSize(15)
      text("(Haz clic en el centro de la pantalla)", 0, 50);
    }
  }
}

function checkMouseOverLink(textContent, x, y, sideWord, url) {
  let d = dist(mouseX, mouseY, width / 2 + x, height / 2 + y);
  if (d < 30) {
    fill(255, 200); // Cambia 200 según la opacidad deseada
    ellipse(x, y, 60, 60);
    fill(0);
    textSize(30);
    
    // Crear un enlace sin cambiar la tipografía
    textAlign(CENTER, CENTER);
    text(textContent, x, y);

    // Muestra la palabra a un costado
    textSize(16);
    if (sideWord) {
      let sideX = x + 95;
      let sideY = y - 5;
      fill(300);
      text(sideWord, sideX, sideY);
    }

    // Verificar clic y abrir enlace
    if (mouseIsPressed) {
      window.open(url, '_blank');
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