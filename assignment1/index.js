// 1. Create a container to hold the grid
const gridContainer = document.createElement('div');
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = 'repeat(10, 50px)'; 
gridContainer.style.gap = '5px';                            
document.body.appendChild(gridContainer);


for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 10; c++) {
        const box = document.createElement('div');
        box.style.width = '50px';
        box.style.height = '50px';
        box.style.backgroundColor = 'yellow';
        box.style.border = '1px solid gold';
        gridContainer.appendChild(box);
    }
}
