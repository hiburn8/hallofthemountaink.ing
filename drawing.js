function makeRotatable(shape){

    const magic = {x:null,y:null};
    
    return [magic].concat(shape);

}


// Function to draw a triangle (used as a puzzle element)
const drawTriangle = (x, y, size) => {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
};

// Function to draw the coloured squares (used as a puzzle element)
function drawRoundedSquare(x, y, fillColor) {
  size = squareSize / 3;
  x = x - (size / 2);
  y = y - (size / 2);
  const cornerRadius = size / 3;
  
  ctx.beginPath();
  ctx.moveTo(x + cornerRadius, y);
  ctx.lineTo(x + size - cornerRadius, y);
  ctx.arcTo(x + size, y, x + size, y + cornerRadius, cornerRadius);
  ctx.lineTo(x + size, y + size - cornerRadius);
  ctx.arcTo(x + size, y + size, x + size - cornerRadius, y + size, cornerRadius);
  ctx.lineTo(x + cornerRadius, y + size);
  ctx.arcTo(x, y + size, x, y + size - cornerRadius, cornerRadius);
  ctx.lineTo(x, y + cornerRadius);
  ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
  ctx.fillStyle = fillColor;
  ctx.fill();
}

// Function to draw black hexagons (the bestagons) (used as a puzzle element)
function drawHexagon(x, y, size) {
ctx.fillStyle = '#000000'
ctx.beginPath();
// Loop through each vertex of the hexagon
for (let i = 0; i < 6; i++) {
  // Calculate the x and y coordinates of each vertex
  let angle = Math.PI / 3 * i;
  let x_i = x + size * Math.cos(angle);
  let y_i = y + size * Math.sin(angle);
  // Draw a line to the vertex
  ctx.lineTo(x_i, y_i);
}
ctx.closePath();
ctx.fill();
}

function drawSun(cx, cy, color){

  // Define the center and size of the star
  const size = squareSize / 8;

  // Draw the first square using rect function
  ctx.beginPath();
  ctx.rect(cx - size, cy - size, size * 2, size * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Rotate and draw the second square
  ctx.save(); // Save the current state of the context
  ctx.translate(cx, cy); // Move the origin to the center of the canvas
  ctx.rotate(Math.PI / 4); // Rotate the context by 45 degrees
  ctx.beginPath();
  ctx.rect(-size, -size, size * 2, size * 2); // Draw the second square at the center
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore(); // Restore the context state to its original state

}

// Functions to draw Polyomineos.
function normalizeShape(shape) {
  // Find the minimum x and y values in the shape
  let minX = Infinity;
  let minY = Infinity;

  // Find the lowest x value, and then find the lowest y that matches that x. we need these two numbers to normalize the shape and reduce the coords to wrap around a single 0,0 origin
  // It makes no difference if we first looked for the lowest y etc.
  for (const block of shape) {
    if (block.x < minX) {
      minX = block.x;
    }
    
  }

  for (const block of shape) {
    if (block.x === minX) {
      if (block.y < minY) {
            minY = block.y;
        }
    }
    
  }

  // Shift all coordinates by the minimum values to normalize
  const normalizedShape = shape.map(block => ({
    x: block.x - minX,
    y: block.y - minY,
  }));

  return normalizedShape;
}

function getShapeHeightWidth(shape) {
  // Find the maximum x and y values in the shape
  let maxX = 0;
  let maxY = 0;

  // Find the lowest x value, and then find the lowest y that matches that x. we need these two numbers to normalize the shape and reduce the coords to wrap around a single 0,0 origin
  // It makes no difference if we first looked for the lowest y etc.
  for (const block of shape) {
    if (block.x > maxX) {
      maxX = block.x;
    }
    if (block.y > maxY) {
      maxY = block.y;
    }
    
  }
    return {x: maxX, y: maxY};
}

function drawTetrisShape(x, y, shape) { // Added isShapeRotatable as a parameter

    isShapeRotatable = isRotatable(shape);

    if (isShapeRotatable){
        shape = removeRotationMarker(shape);
    }

    const dimensions = getShapeHeightWidth(shape);
    const totalWidth = (dimensions.x + 1) * (shapeSize + shapeGapSize) - shapeGapSize;
    const totalHeight = (dimensions.y + 1) * (shapeSize + shapeGapSize) - shapeGapSize;

    const startX = x - totalWidth / 2;
    const startY = y - totalHeight / 2;

    // Move the rotation point to the center of the shape
    const centerX = startX + totalWidth / 2;
    const centerY = startY + totalHeight / 2;

    // Check if the shape is rotatable and should be rotated
    if (isShapeRotatable) {
        // Save the current state of the canvas
        ctx.save();

        // Move the canvas origin to the center of the shape for rotation
        ctx.translate(centerX, centerY);

        // Rotate the canvas by 15 degrees (converted to radians)
        ctx.rotate(-15 * Math.PI / 180);

        // Move the canvas origin back
        ctx.translate(-centerX, -centerY);
    }

    // Draw the shape blocks as usual but with potentially rotated context
    shape.forEach(square => {
        const xPos = startX + (square.x * (shapeSize + shapeGapSize));
        const yPos = startY + (square.y * (shapeSize + shapeGapSize));
        ctx.fillStyle = shapeColour;
        ctx.fillRect(xPos, yPos, shapeSize, shapeSize);
    });

    // If the shape was rotatable, restore the canvas to its original state
    if (isShapeRotatable) {
        ctx.restore();
    }
}


function transformShape(shape, flipHorizontal = false, flipVertical = false, rotation = 0) {
    // Get the maximum x and y values from the shape.
    const maxX = Math.max(...shape.map(s => s.x));
    const maxY = Math.max(...shape.map(s => s.y));

    return shape.map(s => {
        let newX = s.x;
        let newY = s.y;

        // Handle rotations
        switch (rotation % 360) {
            case 90:
                newX = s.y;
                newY = maxX - s.x;
                break;
            case 180:
                newX = maxX - s.x;
                newY = maxY - s.y;
                break;
            case 270:
                newX = maxY - s.y;
                newY = s.x;
                break;
        }

        // Handle flips
        if (flipHorizontal) newX = maxX - newX;
        if (flipVertical) newY = maxY - newY;

        return { x: newX, y: newY };
    });
}

//Generating all polyominoe shapes could have been a good algorithm. But i probably will need to remind myself of the shape data structure regularly.
const monomino = [
    {x: 0, y: 0}
];

const domino = [
    {x: 0, y: 0},
    {x: 0, y: 1}
];

const domino_R90 = normalizeShape(transformShape(domino, false, false, 90));

const tromino_Right = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1}
];
const tromino_Right_R90 = normalizeShape(transformShape(tromino_Right, false, false, 90));
const tromino_Right_R180 = normalizeShape(transformShape(tromino_Right, false, false, 180));
const tromino_Right_R270 = normalizeShape(transformShape(tromino_Right, false, false, 270));


const tromino_Straight = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 0, y: 2}
];
const tromino_Straight_R90 = normalizeShape(transformShape(tromino_Straight, false, false, 90));

const tetromino_Square = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 1, y: 1}
];

const tetromino_L = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 0, y: 2},
    {x: 1, y: 2}
];
const tetromino_L_R90 = normalizeShape(transformShape(tetromino_L, false, false, 90));
const tetromino_L_R180 = normalizeShape(transformShape(tetromino_L, false, false, 180));
const tetromino_L_R270 = normalizeShape(transformShape(tetromino_L, false, false, 270));
// "R"
const tetromino_L_FH = normalizeShape(transformShape(tetromino_L, true, false));
const tetromino_L_FH_R90 = normalizeShape(transformShape(tetromino_L, true, false, 90));
const tetromino_L_FH_R180 = normalizeShape(transformShape(tetromino_L, true, false, 180));
const tetromino_L_FH_R270 = normalizeShape(transformShape(tetromino_L, true, false, 270));

//i hate that we had to use negatives. i'm lucky this worked at all.
const tetromino_Skew = [
{x: 1, y: -1},
{x: 2, y: -1},
{x: 0, y: 0},
{x: 1, y: 0}

];
const tetromino_Skew_R90 = normalizeShape(transformShape(tetromino_Skew, false, false, 90));
const tetromino_Skew_FH = normalizeShape(transformShape(tetromino_Skew, true, false));
const tetromino_Skew_FH_R90 = normalizeShape(transformShape(tetromino_Skew, true, false, 90));


const tetromino_T = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 1, y: 1}
];
const tetromino_T_R90 = normalizeShape(transformShape(tetromino_T, false, false, 90));
const tetromino_T_R180 = normalizeShape(transformShape(tetromino_T, false, false, 180));
const tetromino_T_R270 = normalizeShape(transformShape(tetromino_T, false, false, 270));

const tetromino_Straight = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 0, y: 2},
    {x: 0, y: 3}
];
const tetromino_Straight_R90 = normalizeShape(transformShape(tetromino_Straight, false, false, 90));


//The BS shapes in Marsh. I will give them lame names to make myself cope.
const octomino_Skewed = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 0, y: 1},
    {x: 2, y: 1},
    {x: 0, y: 2},
    {x: 1, y: 2},
    {x: 2, y: 2},
];

const domino_Skewed = [
    {x: 0, y: 0},
    {x: 1, y: -1}
];

const domino_Skewed_R90 = [
    {x: 0, y: 0},
    {x: 1, y: 1}
];

const tromino_Skewed = [
    {x: 0, y: 0},
    {x: 1, y: -1},
    {x: 0, y: 1},
];

const tetromino_Skewed = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 3, y: 0},
    {x: 3, y: 1},
];

const pentomino_Skewed = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 2, y: 1},
    {x: 2, y: 2},
];

//ROTATABLES

//Castle
const tetromino_L_FH_R90_Rotatable = makeRotatable(tetromino_L_FH_R90);

//Bunker
const tetromino_T_R270_Rotatable = makeRotatable(tetromino_T_R270);

//Marsh
const tetromino_Straight_R90_Rotatable = makeRotatable(tetromino_Straight_R90);






