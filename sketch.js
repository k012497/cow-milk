// mouse event
let over = false;
let move = false;

// spring simulation
let M = 0.8; // 질량
let K = 0.2; // 상수 (용수철)
let D = 0.92; // 감쇠 (Damping)
let R = 150; // 놓인 위치 from bottom

let ps = R; // 위치 
let vs = 0.0; // 속도
let as = 0; // 가속도
let f = 0; // 힘

let left, right; // 너비 시작점, 끝점
const springHeight = 32; 
const minHeight = 100;
const maxHeight = 200;

let cowImg; // 소 이미지

function setup() {
  // canvas
  createCanvas(innerWidth, innerHeight);

  // rect
  rectMode(CORNERS);

  // stroke
  strokeWeight(7);
  
  // position
  left = width / 2 - 70;
  right = width / 2 + 70;

  // image
  cowImg = loadImage('./assets/cow.png');
}

function mousePressed() {
  if (over) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}

function updateSpring() {
  // 용수철(spring) 위치 업데이트
  if (!move) {
    f = -K * (ps - R); // f=-ky
    as = f / M; // 가속도 설정, f=ma == a=f/m
    vs = D * (vs + as); // 속도 설정
    ps = ps + vs; // 업데이트된 위치
  }

  if (abs(vs) < 0.1) {
    vs = 0.0;
  }

  if (
    mouseX > left &&
    mouseX < right &&
    mouseY > height - ps &&
    mouseY < height - ps + springHeight
  ) {
    over = true;
  } else {
    over = false;
  }

  if (move) {
    ps = height - (mouseY - springHeight / 2);
    console.log(ps);

    ps = constrain(ps, minHeight, maxHeight);
  }
}

function drawSpring() {
  stroke(30);
  fill('#f5dce4');

  let baseWidth = 0.2 * ps;
  rect(width / 2 - baseWidth, 350, width / 2 + baseWidth, height - ps); // x1, y1, x2, y2

  if (over || move) {
    fill('#e68c8c');

    if(move){
      stroke('#fff9e8');
      rect(width / 2, height - ps, width / 2, height);
    }
  } else {
    fill(204);
  }

  // 끝 부분
  stroke(30);
  arc(width / 2 , height - ps, 2 * baseWidth, 80, 0, PI, OPEN);
}

function draw() {
  background('#83ab7e');
  updateSpring();
  drawSpring();
  image(cowImg, 0, 0);
}