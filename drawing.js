const htmlColorNames = {
AliceBlue: '#F0F8FF',
AntiqueWhite: '#FAEBD7',
Aqua: '#00FFFF',
Aquamarine: '#7FFFD4',
Azure: '#F0FFFF',
Beige: '#F5F5DC',
Bisque: '#FFE4C4',
Black: '#000000',
BlanchedAlmond: '#FFEBCD',
Blue: '#0000FF',
BlueViolet: '#8A2BE2',
Brown: '#A52A2A',
BurlyWood: '#DEB887',
CadetBlue: '#5F9EA0',
Chartreuse: '#7FFF00',
Chocolate: '#D2691E',
Coral: '#FF7F50',
CornflowerBlue: '#6495ED',
Cornsilk: '#FFF8DC',
Crimson: '#DC143C',
Cyan: '#00FFFF',
DarkBlue: '#00008B',
DarkCyan: '#008B8B',
DarkGoldenRod: '#B8860B',
DarkGray: '#A9A9A9',
DarkGrey: '#A9A9A9',
DarkGreen: '#006400',
DarkKhaki: '#BDB76B',
DarkMagenta: '#8B008B',
DarkOliveGreen: '#556B2F',
DarkOrange: '#FF8C00',
DarkOrchid: '#9932CC',
DarkRed: '#8B0000',
DarkSalmon: '#E9967A',
DarkSeaGreen: '#8FBC8F',
DarkSlateBlue: '#483D8B',
DarkSlateGray: '#2F4F4F',
DarkSlateGrey: '#2F4F4F',
DarkTurquoise: '#00CED1',
DarkViolet: '#9400D3',
DeepPink: '#FF1493',
DeepSkyBlue: '#00BFFF',
DimGray: '#696969',
DimGrey: '#696969',
DodgerBlue: '#1E90FF',
FireBrick: '#B22222',
FloralWhite: '#FFFAF0',
ForestGreen: '#228B22',
Fuchsia: '#FF00FF',
Gainsboro: '#DCDCDC',
GhostWhite: '#F8F8FF',
Gold: '#FFD700',
GoldenRod: '#DAA520',
Gray: '#808080',
Grey: '#808080',
Green: '#008000',
GreenYellow: '#ADFF2F',
HoneyDew: '#F0FFF0',
HotPink: '#FF69B4',
IndianRed: '#CD5C5C',
Indigo: '#4B0082',
Ivory: '#FFFFF0',
Khaki: '#F0E68C',
Lavender: '#E6E6FA',
LavenderBlush: '#FFF0F5',
LawnGreen: '#7CFC00',
LemonChiffon: '#FFFACD',
LightBlue: '#ADD8E6',
LightCoral: '#F08080',
LightCyan: '#E0FFFF',
LightGoldenRodYellow: '#FAFAD2',
LightGray: '#D3D3D3',
LightGrey: '#D3D3D3',
LightGreen: '#90EE90',
LightPink: '#FFB6C1',
LightSalmon: '#FFA07A',
LightSeaGreen: '#20B2AA',
LightSkyBlue: '#87CEFA',
LightSlateGray: '#778899',
LightSlateGrey: '#778899',
LightSteelBlue: '#B0C4DE',
LightYellow: '#FFFFE0',
Lime: '#00FF00',
LimeGreen: '#32CD32',
Linen: '#FAF0E6',
Magenta: '#FF00FF',
Maroon: '#800000',
MediumAquaMarine: '#66CDAA',
MediumBlue: '#0000CD',
MediumOrchid: '#BA55D3',
MediumPurple: '#9370DB',
MediumSeaGreen: '#3CB371',
MediumSlateBlue: '#7B68EE',
MediumSpringGreen: '#00FA9A',
MediumTurquoise: '#48D1CC',
MediumVioletRed: '#C71585',
MidnightBlue: '#191970',
MintCream: '#F5FFFA',
MistyRose: '#FFE4E1',
Moccasin: '#FFE4B5',
NavajoWhite: '#FFDEAD',
Navy: '#000080',
OldLace: '#FDF5E6',
Olive: '#808000',
OliveDrab: '#6B8E23',
Orange: '#FFA500',
OrangeRed: '#FF4500',
Orchid: '#DA70D6',
PaleGoldenRod: '#EEE8AA',
PaleGreen: '#98FB98',
PaleTurquoise: '#AFEEEE',
PaleVioletRed: '#DB7093',
PapayaWhip: '#FFEFD5',
PeachPuff: '#FFDAB9',
Peru: '#CD853F',
Pink: '#FFC0CB',
Plum: '#DDA0DD',
PowderBlue: '#B0E0E6',
Purple: '#800080',
RebeccaPurple: '#663399',
Red: '#FF0000',
RosyBrown: '#BC8F8F',
RoyalBlue: '#4169E1',
SaddleBrown: '#8B4513',
Salmon: '#FA8072',
SandyBrown: '#F4A460',
SeaGreen: '#2E8B57',
SeaShell: '#FFF5EE',
Sienna: '#A0522D',
Silver: '#C0C0C0',
SkyBlue: '#87CEEB',
SlateBlue: '#6A5ACD',
SlateGray: '#708090',
SlateGrey: '#708090',
Snow: '#FFFAFA',
SpringGreen: '#00FF7F',
SteelBlue: '#4682B4',
Tan: '#D2B48C',
Teal: '#008080',
Thistle: '#D8BFD8',
Tomato: '#FF6347',
Turquoise: '#40E0D0',
Violet: '#EE82EE',
Wheat: '#F5DEB3',
White: '#FFFFFF',
WhiteSmoke: '#F5F5F5',
Yellow: '#FFFF00',
YellowGreen: '#9ACD32'
};

// Converts a hex color to its RGB components
function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return {r, g, b};
}

// Calculates the Euclidean distance between two colors. hypot is as old as canvas, no point polyfilling.
function colorDistance(color1, color2) {
    return Math.hypot(color1.r - color2.r, color1.g - color2.g, color1.b - color2.b);
}

// Finds the closest HTML color name to the given hex color
function closestHtmlColorName(hex) {
    let minDistance = Infinity;
    let closestColor = '';

    const rgb = hexToRgb(hex);

    for (const [name, hexValue] of Object.entries(htmlColorNames)) {
        const rgbValue = hexToRgb(hexValue);
        const distance = colorDistance(rgb, rgbValue);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = name;
        }
    }
    return closestColor;
}

function makeRotatable(shape){

    const magic = {x:null,y:null};
    
    return [magic].concat(shape);

}

function makeAntipoly(shape){

    const magic = {x:Infinity,y:Infinity};
    
    return [magic].concat(shape);

}

//All this so i can change the shape of the SVG and i can still dynamically recolor it
function updateFavicon(newColor) {
    // Get the current favicon element
    var link = document.querySelector('link[rel*="icon"]');
    if (!link) return; // No favicon found

    // Decode the SVG from the favicon's href
    var svgData = link.href;
    var prefix = 'data:image/svg+xml;base64,';
    var base64Content = svgData.includes(prefix) ? svgData.split(prefix)[1] : '';
    var svgText = base64Content ? atob(base64Content) : '';

    // Convert the SVG text to a DOM element
    var parser = new DOMParser();
    var svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    var circle = svgDoc.getElementById('faviconCircle');
    if (!circle) return; // No circle found in the SVG

    // Change the circle's fill color
    circle.setAttribute('fill', newColor);

    // Convert the updated SVG back to a Data URL
    var serializer = new XMLSerializer();
    var newSvgText = serializer.serializeToString(svgDoc.documentElement);
    var newDataUrl = 'data:image/svg+xml;base64,' + btoa(newSvgText);

    // Update the favicon
    link.href = newDataUrl;
}

function color2Hex(color){

    switch (color) {
        case 'white':
            return '#FFFFFF';
        case 'black':
            return '#000000';
        case 'yellow':
            return '#ecbd06';
        case 'orange':
            return '#e37608';
        case 'pink':
            return '#c837d1';
        case 'lime':
            return '#99ff1d';
        default:
            console.log('Unknown color.');
        return;
    }
}

// Function to draw a Y shape or 'elimination mark' (used as a puzzle element)
const drawYShape = (x, y, length) => {
    ctx.strokeStyle = "white"; // Set the color of the Y shape
    ctx.lineWidth = length / 2; // Set the width of the lines

    ctx.beginPath();
    
    // Draw the North (N) arm
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - length); // Line goes up (North)

    // Draw the South-East (SE) arm
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(Math.PI / 15), y + length * Math.sin(Math.PI / 3)); // 60 degrees to the horizontal (South-East)

    // Draw the South-West (SW) arm
    ctx.moveTo(x, y);
    ctx.lineTo(x - length * Math.cos(Math.PI / 15), y + length * Math.sin(Math.PI / 3)); // 120 degrees to the horizontal (South-West)
    
    // Execute the drawing
    ctx.stroke();
    ctx.lineWidth = squareSize / 5;
};

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

function drawTetrisShape(x, y, shape, shapeColour = '#ecbd06') {
    // Determine if the shape is rotatable
    const isShapeRotatable = isRotatable(shape);

    if (isShapeRotatable) {
        shape = removeRotationMarker(shape);
    }

    // Determine if the shape is an anti-polyomino
    const isShapeAntipolyomino = isAntipoly(shape);

    if (isShapeAntipolyomino) {
        shape = removeAntipolyMarker(shape);
    }


    // Set the line width for anti-polyomino
    const antipolyLineWidth = shapeSize / 5;

    // Calculate dimensions
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
        ctx.rotate((-15 * Math.PI) / 180);

        // Move the canvas origin back
        ctx.translate(-centerX, -centerY);
    }

    if (isShapeAntipolyomino) {
        // Save current state
        ctx.save();
        ctx.strokeStyle = '#4a5cbb'; // Blue for Antipolyominoes
        ctx.lineWidth = antipolyLineWidth;

        // Adjust the square size to accommodate the line width
        const adjustedShapeSize = shapeSize - antipolyLineWidth;
        const offset = antipolyLineWidth / 2;

        // Draw the shape blocks with a thick blue outline
        shape.forEach((square) => {
            const xPos = startX + square.x * (shapeSize + shapeGapSize) + offset;
            const yPos = startY + square.y * (shapeSize + shapeGapSize) + offset;

            ctx.strokeRect(xPos, yPos, adjustedShapeSize, adjustedShapeSize);
        });

        // Restore previous state
        ctx.restore();
    } else {
        // Set the fill style
        ctx.fillStyle = shapeColour;

        // Draw the shape blocks as usual
        shape.forEach((square) => {
            const xPos = startX + square.x * (shapeSize + shapeGapSize);
            const yPos = startY + square.y * (shapeSize + shapeGapSize);

            ctx.fillRect(xPos, yPos, shapeSize, shapeSize);
        });
    }

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

const tromino_Straight_Rotatable = makeRotatable(tromino_Straight);

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

const pentomino_L = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 0, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 3},
];

const pentomino_V = [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 0, y: 2},
    {x: 1, y: 2},
    {x: 2, y: 2},
];

const pentomino_V_R270 = normalizeShape(transformShape(pentomino_V, false, false, 270));
const pentomino_V_R270_Rotatable = makeRotatable(pentomino_V_R270);

const pentomino_T = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 1, y: 1},
    {x: 1, y: 2}
];

const pentomino_T_R180 = normalizeShape(transformShape(pentomino_T, false, false, 180));
const pentomino_T_R180_Rotatable = makeRotatable(pentomino_T_R180);


const hexomino_Rectangle = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 0, y: 2},
    {x: 1, y: 2},
];

const decomino_Skewed = [
    {x: 0, y: 0},
    {x: 2, y: 0},
    {x: 0, y: 1},
    {x: 2, y: 1},

    {x: 0, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 2},
    {x: 1, y: 3},
    {x: 2, y: 2},
    {x: 2, y: 3},
];

const tromino_T = [
    {x: 0, y: 0},
    {x: 1, y: -1},
    {x: 2, y: 0},
];

const tromino_T_R90 = normalizeShape(transformShape(tromino_T, false, false, 90));
const tromino_T_R270 = normalizeShape(transformShape(tromino_T, false, false, 270));
const tromino_T_R90_Rotatable = makeRotatable(tromino_T_R90);
const tromino_T_R270_Rotatable = makeRotatable(tromino_T_R270);
const decomino_Skewed_Rotatable = makeRotatable(decomino_Skewed);

//ROTATABLES

//Castle & Marsh
const tetromino_L_FH_R90_Rotatable = makeRotatable(tetromino_L_FH_R90);

//Bunker
const tetromino_T_R270_Rotatable = makeRotatable(tetromino_T_R270);

//Marsh
const tetromino_Straight_R90_Rotatable = makeRotatable(tetromino_Straight_R90);
const tetromino_L_FH_R180_Rotatable = makeRotatable(tetromino_L_FH_R180);
const tetromino_L_FH_R270_Rotatable = makeRotatable(tetromino_L_FH_R270);
const tetromino_Straight_Rotatable = makeRotatable(tetromino_Straight);
const tetromino_L_Rotatable = makeRotatable(tetromino_L);
const tromino_Right_R270_Rotatable = makeRotatable(tromino_Right_R270);
const domino_Skewed_Rotatable = makeRotatable(domino_Skewed);
const tetromino_T_R180_Rotatable = makeRotatable(tetromino_T_R180);
const pentomino_L_Rotatable = makeRotatable(pentomino_L);
const tetromino_L_R90_Rotatable = makeRotatable(tetromino_L_R90);

const monomino_Anti = makeAntipoly(monomino);

