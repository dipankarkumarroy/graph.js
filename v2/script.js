const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
let vari=20
// Constants for zoom and pan
let scaleX = vari; // Initial scale values
let scaleY = vari;
let offsetX = canvas.width / 2; // Initial origin at the center
let offsetY = canvas.height / 2;

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to plot the graph
function plotGraph(equation) {
    clearCanvas();
    drawGrid();
    drawAxes();
    drawGridValues();
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    for (let x = (-canvas.width / 2) / scaleX; x <= (canvas.width / 2) / scaleX; x += 0.0001) {
        const y = eval(equation);

        const plotX = x * scaleX + offsetX;
        const plotY = offsetY - y * scaleY;

        if (x === (-canvas.width / 2) / scaleX) {
            ctx.moveTo(plotX, plotY);
        } else {
            ctx.lineTo(plotX, plotY);
        }
    }

    ctx.stroke();
    ctx.closePath();
}

// Function to handle zooming
function zoom(scaleFactor) {
    scaleX *= scaleFactor;
    scaleY *= scaleFactor;
    plotGraph(document.getElementById('equation').value);
}

// Function to handle panning
function pan(dx, dy) {
    offsetX += dx;
    offsetY += dy;
    plotGraph(document.getElementById('equation').value);
}

document.getElementById('plot-button').addEventListener('click', () => {
    const equation = document.getElementById('equation').value;
    plotGraph(equation);
});

// Zoom in button
document.getElementById('zoom-in').addEventListener('click', () => {
    zoom(2);
});

// Zoom out button
document.getElementById('zoom-out').addEventListener('click', () => {
    zoom(1 / 2);
});

// Pan buttons
document.getElementById('pan-left').addEventListener('click', () => {
    pan(-20, 0);
});

document.getElementById('pan-right').addEventListener('click', () => {
    pan(20, 0);
});

document.getElementById('pan-up').addEventListener('click', () => {
    pan(0, 20);
});

document.getElementById('pan-down').addEventListener('click', () => {
    pan(0, -20);
});


// Reset button
document.getElementById('reset').addEventListener('click', () => {
    scaleX = 20;
    scaleY = 20;
    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
    document.getElementById('equation').value = '';
    clearCanvas();
    drawGrid();
    drawAxes();
    drawGridValues();
});

// Function to draw the grid as a background image
function drawGrid() {
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    for (let x = -10*(20/scaleX); x <= 10*(20/scaleX); x+=(20/scaleX)) {
        ctx.beginPath();
        ctx.moveTo(x * scaleX + offsetX, 0);
        ctx.lineTo(x * scaleX + offsetX, canvas.height);
        ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = -10*(20/scaleX); y <= 10*(20/scaleX); y+=(20/scaleX)) {
        ctx.beginPath();
        ctx.moveTo(0, y * scaleY + offsetY);
        ctx.lineTo(canvas.width, y * scaleY + offsetY);
        ctx.stroke();
    }
}

// Function to draw the X and Y axes
function drawAxes() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(canvas.width, offsetY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, canvas.height);
    ctx.stroke();
}

// Function to draw grid values
function drawGridValues() {
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    for (let x = -10*(20/scaleX); x <= 10*(20/scaleX); x+=(20/scaleX)) {
        const xPos = x * scaleX + offsetX;
        const yPos = offsetY;
        ctx.fillText(x, xPos, yPos + 15);
    }

    for (let y = -10*(20/scaleX); y <= 10*(20/scaleX); y+=(20/scaleX)) {
        const xPos = offsetX;
        const yPos = y * scaleY + offsetY;
        if (y !== 0) {
            ctx.fillText(-y, xPos - 15, yPos);
        }
    }
}

// Initially draw the grid, axes, and grid values
drawGrid();
drawAxes();
drawGridValues();
