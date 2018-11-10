var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var cellSize = 40; // MUST have a common factor with canvas width and height
var canvasWidth = c.width;
var canvasHeight = c.height;

var gridWidth = canvasWidth / cellSize;
var gridHeight = canvasHeight / cellSize;

function drawGrid(width, height) {

    for(var i = 0; i < width; i+=cellSize) {
            ctx.moveTo(i,0);
            ctx.lineTo(i, height)
            ctx.stroke();
        }

    for(var i = 0; i < height; i+=cellSize) {
        ctx.moveTo(0,i);
        ctx.lineTo(height, i)
        ctx.stroke();
    }    
}


function fillCell(x, y) {
    cellX = x * cellSize;
    cellY = y * cellSize;
    ctx.fillRect(cellX, cellY, cellSize, cellSize)
}

function createCellState() {
    var grid = [];

    for(var i = 0; i < gridHeight; i++) {
        grid[i] = [];
        for(var j = 0; j < gridWidth; j++) {
            grid[i][j] = Math.round(Math.random(2));
            // grid[i][j] = 0;
        }
    }

    return grid;
}

function fillGridsFromState(state) {
    for(var i = 0; i < gridHeight; i++) {
        for(var j = 0; j < gridWidth; j++) {
            if(state[i][j]) { //if grid position value is 1 (alive)
                fillCell(i,j);
            }
        }
    }
}

function countNeighboors(x, y, state) {
    var count = 0;

    for(var i = -1; i <= 1; i++) {
        for(var j = -1; j <= 1; j++) {
           if(state[(gridWidth + x + i) % gridWidth][(gridHeight + y + j) % gridHeight] == 1) {
            count++;
           } 
        }
    }
    if(state[x][y]) count--; // Do not count the middle cell as a neighboor if cell is active
    return count;
}

function determineNextState(currentState) {

    var newState = [];

    for (var i = 0; i < currentState.length; i++)
        newState[i] = [];
    

    for(var i = 0; i < gridHeight; i++) {
        for(var j = 0; j < gridWidth; j++) {
            if(currentState[i][j] == 1 && (countNeighboors(i, j, currentState) < 2)) {
                newState[i][j] = 0
            } else if(currentState[i][j] == 1 && (countNeighboors(i, j, currentState) >=2 && (countNeighboors(i, j, currentState) <=3))) {
                newState[i][j] = 1;
            }  else if(currentState[i][j] == 1 && ((countNeighboors(i, j, currentState) > 3))) {
                newState[i][j] = 0;
            }else if(currentState[i][j] == 0 && (countNeighboors(i, j, currentState) == 3)) {
                newState[i][j] = 1; 
            } else {
                newState[i][j] = 0; 
            }
            // if(i == 3 && j == 3) console.log("Cell[" + i + "][" + j + "] " + "Neighboors: " + countNeighboors(i, j, currentState))
        }
    }
    return newState;
}

drawGrid(canvasWidth, canvasHeight);




state = createCellState();
// ANIMATION
// state[5][5] = 1;
// state[4][6] = 1;
// state[5][6] = 1;
// state[6][6] = 1;
// state[3][7] = 1;
// state[4][7] = 1;
// state[5][7] = 1;
// state[6][7] = 1;
// state[7][7] = 1;



// END

// state[2][2] = 1;
// state[2][3] = 1;
// state[3][2] = 1;

// state[5][4] = 1;
// state[5][5] = 1;
// state[4][5] = 1;

// state[5][3] = 1
// state[5][4] = 1
// state[5][5] = 1
// state[4][5] = 1
// state[3][4] = 1


fillGridsFromState(state);




(function myLoop (i) {          
    setTimeout(function () {   
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid(canvasWidth, canvasHeight);
        state = determineNextState(state);
        fillGridsFromState(state); 

       if (--i) myLoop(i);      
    }, 300)
 })(100); 






