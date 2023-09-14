const gridContainer = document.querySelector('.grid-container');
const gridSizeInput = document.getElementById('grid-slider');
const gridSizeValue = document.getElementById('grid-size-value');

function updateGrid() {
    const gridSize = gridSizeInput.value;
    gridSizeValue.textContent = `${gridSize} x ${gridSize}`;
  
    gridContainer.innerHTML = '';
  
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  
    for (let i = 1; i <= gridSize ** 2; i++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      
      gridItem.classList.add('grid-element');
      gridItem.textContent = " ";
  
      gridItem.setAttribute('data-opacity', '0');
      gridContainer.appendChild(gridItem);
    }
  }

  updateGrid();

  gridSizeInput.addEventListener('input', updateGrid);
