const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizevalue = document.getElementById("size-value");
const sizeslider = document.getElementById("size-slider");
const grid = document.getElementById('grid');

let currentColor = '#333333'
let currentMode = 'color'
let currentSize = 16

colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
sizeslider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeslider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setCurrentMode(newmode){
    activateButton(newmode);
    currentMode = newmode;
}

function activateButton(newmode){
    if(currentMode === 'rainbow'){
        rainbowBtn.classList.remove('active')
    } else if(currentMode === 'color'){
        colorBtn.classList.remove('active')
    } else if(currentMode === 'eraser'){
        eraserBtn.classList.remove('active')
    }

    if(newmode === 'rainbow'){
        rainbowBtn.classList.add('active')
    } else if(newmode === 'color'){
        colorBtn.classList.add('active')
    } else if(newmode === 'eraser'){
        eraserBtn.classList.add('active')
    }
}

function setCurrentColor(newColor){
    currentColor = newColor;
}

function setCurrentSize(newSize){
    currentSize = newSize;
}

function updateSizeValue(value){
    sizevalue.innerHTML = `${value} x ${value}`;
}

function changeSize(value){
    setCurrentSize(value);
    updateSizeValue(value)
    reloadGrid()
}

function reloadGrid(){
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid(){
    grid.innerHTML = ``;
}

function setupGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    grid.style.gridTemplateRows = `repeat(${size},1fr)`;

    for(let i=0;i<size*size;i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover',changeColor);
        gridElement.addEventListener('mousedown',changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return 
    if(currentMode === 'rainbow'){
        const randomR = Math.floor(Math.random()*256);
        const randomG = Math.floor(Math.random()*256);
        const randomB = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    }
    else if (currentMode == 'color'){
        e.target.style.backgroundColor = currentColor
    }
    else if (currentMode == 'eraser'){
        e.target.style.backgroundColor = '#fefefe'
    }
}

window.onload = () => {
    setupGrid(16)
    activateButton('color')
  }