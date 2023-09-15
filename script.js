const BORDERBUTTON = document.querySelector('.border-btn')
let toggleBorderButton = true;

let buttonStates = {
    eraser: false,
    rainbow: false,
    brush: false
};

const ALLSKETCHBUTTONS = document.querySelectorAll('.sketch-btn');
const CLEARGRIDBUTTON = document.querySelector('.clear-grid-btn');
const BRUSHBUTTON = document.querySelector('.brush-btn');

const CHANGECOLOR = document.querySelector('#color-changer');
let colorHex = '#000000';
let colorRGBA = 'rgba(0, 0, 0, 1)';
let opacity = '0.1';

let isMouseDown = false;

const GRIDCONTAINER = document.querySelector('.grid-container');
const GRIDSIZEINPUT = document.getElementById('grid-slider');
const GRIDSIZEVALUE = document.getElementById('grid-size-value');

function updateGrid() {
    const gridSize = GRIDSIZEINPUT.value;
    GRIDSIZEVALUE.textContent = `${gridSize} x ${gridSize}`;
  
    GRIDCONTAINER.innerHTML = '';
  
    GRIDCONTAINER.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    GRIDCONTAINER.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  
    for (let i = 1; i <= gridSize ** 2; i++) {
      const GRIDITEM = document.createElement('div');
      GRIDITEM.classList.add('grid-item');
      
      GRIDITEM.classList.add('grid-element');
      GRIDITEM.textContent = " ";
  
      GRIDITEM.setAttribute('data-opacity', '0');
      GRIDCONTAINER.appendChild(GRIDITEM);
    }
    boxesListener(toggleBorderButton);
};

function handleMouseDown() {
    isMouseDown = true;
    if (buttonStates['eraser']) {
      eraser(this);
    } else if (buttonStates['rainbow']) {
      colorHex = rainbowMode();
      CHANGECOLOR.value = colorHex;
      this.style.backgroundColor = colorHex;
      this.setAttribute('data-opacity', '1');
    } else {
      this.style.backgroundColor = colorHex;
      this.setAttribute('data-opacity', '1');
    }
};

function handleMouseUp(){
    isMouseDown = false;
};

function handleMouseEnter(event) {
    if (isMouseDown) {
      handleMouseDown.call(this, event);
    }
};

function hexToRgbA(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b})`;
};

function handleColorChange() { 
    colorHex = this.value;
};

function eraser(div) {
    div.removeAttribute('style');
    div.removeAttribute('data-color');
    div.setAttribute('data-opacity', '0');
};

function toggleBorders(){
    (!toggleBorderButton) ? toggleBorderButton = true :  toggleBorderButton = false;
    console.log(`Border Button: ${toggleBorderButton}`);
  
    boxesListener(toggleBorderButton);
};

function toggleButton(event) {
    console.clear();
    const CLICKEDBUTTONID = event.target.id;
    const ISALREADYACTIVE = event.target.classList.contains('active');
    ALLSKETCHBUTTONS.forEach(button => button.classList.remove('active'));
        for (const BUTTONID in buttonStates) {
            if (BUTTONID !== CLICKEDBUTTONID || ISALREADYACTIVE) {
                buttonStates[BUTTONID] = false;
  
                if (ISALREADYACTIVE) {
                    BRUSHBUTTON.classList.add('active');
                    buttonStates['brush'] = true;
                }

            } else {
                buttonStates[BUTTONID] = true;
                event.target.classList.add('active'); 
            }
        console.log(`${BUTTONID} :  ${ buttonStates[BUTTONID]}`);
    }
};

function clearArtBoard() {
    const BOXES = document.querySelectorAll('.grid-element');
    BOXES.forEach(box => {
      eraser(box);
    });
  
    CLEARGRIDBUTTON.classList.add('active');
  
    console.clear();
  
    setTimeout(() => {
        CLEARGRIDBUTTON.classList.remove('active'); 
        BRUSHBUTTON.classList.add('active');
        buttonStates['brush'] = true;
        console.log(`brush : ${buttonStates['brush']}`);
    }, 500);
};

function rainbowMode() {
    const LETTERS = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += LETTERS[Math.floor(Math.random() * 16)];
    }
    return color;
};

function boxesListener(grid) {
    const BOXES = document.querySelectorAll('.grid-element');
    BOXES.forEach(box => {
      box.addEventListener('mousedown', handleMouseDown);
      box.addEventListener('mouseup', handleMouseUp);
      box.addEventListener('mouseenter', handleMouseEnter);
      if (grid) {
        box.classList.add('grid-border');
        BORDERBUTTON.classList.add('active'); 
      }
  
      else {
        box.classList.remove('grid-border')
        BORDERBUTTON.classList.remove('active');
      }
  
    });
};

  updateGrid();

CHANGECOLOR.addEventListener('input', handleColorChange); //changed from "change" to "input".
ALLSKETCHBUTTONS.forEach(button => button.addEventListener('mousedown', toggleButton)); 
BORDERBUTTON.addEventListener('mousedown', toggleBorders);
CLEARGRIDBUTTON.addEventListener('mousedown', clearArtBoard);
GRIDSIZEINPUT.addEventListener('input', updateGrid);