let input, slider, button, dropdown;
let bounce = false;
let offsets = [];
let directions = [];
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.value('><');
  
  slider = createSlider(28, 50, 32);
  slider.position(10, 40);
  
  button = createButton('跳動');
  button.position(slider.x + slider.width + 10, 40);
  button.mousePressed(toggleBounce);
  
  dropdown = createSelect();
  dropdown.position(input.x + input.width + 10, 10);
  dropdown.option('第一周');
  dropdown.option('第二周');
  dropdown.option('第三周');
  dropdown.changed(handleDropdownChange);
  
  // 初始化每個字的偏移量和方向
  for (let i = 0; i < (width / 40) * (height / 40); i++) {
    offsets.push(0);
    directions.push(1);
  }
}

function draw() {
  background(220);
  let txt = input.value();
  let textSizeValue = slider.value();
  textAlign(LEFT, CENTER);
  textSize(textSizeValue);
  
  let y = 0;
  let lineIndex = 0;
  while (y < height) {
    let x = 0;
    while (x < width) {
      if (bounce) {
        let charIndex = lineIndex * Math.floor(width / textWidth(txt)) + Math.floor(x / textWidth(txt));
        offsets[charIndex] += directions[charIndex] * random(1, 3);
        if (offsets[charIndex] > 20 || offsets[charIndex] < -20) {
          directions[charIndex] *= -1;
        }
        text(txt, x, y + offsets[charIndex]);
      } else {
        text(txt, x, y);
      }
      x += textWidth(txt);
    }
    y += textSizeValue + 10; // 增加行高
    lineIndex++;
  }
}

function toggleBounce() {
  bounce = !bounce;
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (iframe) {
    iframe.remove();
  }
  if (selected === '第一周') {
    iframe = createElement('iframe', '');
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '第二周') {
    iframe = createElement('iframe', '');
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '第三周') {
    iframe = createElement('iframe', '');
    iframe.attribute('src', 'https://hackmd.io/@y1n/ryecQYMiyg');
  }
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  offsets = [];
  directions = [];
  for (let i = 0; i < (width / 40) * (height / 40); i++) {
    offsets.push(0);
    directions.push(1);
  }
  if (iframe) {
    iframe.size(windowWidth - 200, windowHeight - 200);
  }
}