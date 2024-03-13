// validation.js
// Validation functions

// Function to check if we can place all the provided shapes in the given area
// checkTetrisShapesInArea(boxArea,[domino, domino]); // returns true
function checkTetrisShapesInArea(area, shapes) {

    console.log('area');
    console.log(area);
    console.log('shapes');
    console.log(shapes);

    //Speedhack_1: check #of shape squares and #of area squares match
    const totalShapeSquares = shapes.reduce((acc, shape) => acc + shape.length, 0);
    //console.log('shape_squares: ' +totalShapeSquares);
    //console.log('area_squares: ' area.length);
    if (totalShapeSquares !== area.length) {
        return false; // Quick exit
    }

    //Speedhack_2_TODO: skip testing base square of shapes and remove that square from all shapes. Then ensure it is 'consumed' properly when all other shape squares fit.
    

    // Ensure that the shapes parameter is an array.
    if (!Array.isArray(shapes)) {
        throw new Error("The shapes parameter must be an array.");
    }

    // Helper function to attempt placing a single shape into the area.
    function canPlaceSingleShape(area, shape, xOffset, yOffset) {
        for (let block of shape) {
            let absoluteX = block.x + xOffset;
            let absoluteY = block.y + yOffset;

            // Check if this block's position exists in the area.
            if (!area.some(pos => pos.x === absoluteX && pos.y === absoluteY)) {
                return false; // The shape can't fit here.
            }
        }
        return true; // The shape fits at this position.
    }

    // Recursive function to attempt placing all shapes in the area.
    function recursiveFit(area, remainingShapes) {
        if (remainingShapes.length === 0) {
            return area.length === 0; // If no remaining shapes, ensure the area is also empty.
        }

        let currentShape = remainingShapes[0];
        for (let position of area) {
            if (canPlaceSingleShape(area, currentShape, position.x, position.y)) {
                // Construct a new area without the blocks of the placed shape.
                const newArea = area.filter(block => {
                    return !currentShape.some(shapeBlock => 
                        shapeBlock.x + position.x === block.x && shapeBlock.y + position.y === block.y
                    );
                });

                // Recursively attempt to fit the rest of the shapes in the new area.
                if (recursiveFit(newArea, remainingShapes.slice(1))) {
                    return true;
                }
            }
        }
        return false; // Couldn't fit the shapes into the area.
    }

    return recursiveFit(area, shapes);
}

function tetrisString2Shape(string) {

    const shapeArrays = {
      monomino,
      domino,
      domino_R90,
      tromino_Right,
      tromino_Right_R90,
      tromino_Right_R180,
      tromino_Right_R270,
      tromino_Straight,
      tromino_Straight_R90,
      tetromino_Square,
      tetromino_L,
      tetromino_L_R90,
      tetromino_L_R180,
      tetromino_L_R270,
      tetromino_L_FH,
      tetromino_L_FH_R90,
      tetromino_L_FH_R180,
      tetromino_L_FH_R270,
      tetromino_Skew,
      tetromino_Skew_R90,
      tetromino_Skew_FH,
      tetromino_Skew_FH_R90,
      tetromino_T,
      tetromino_T_R90,
      tetromino_T_R180,
      tetromino_T_R270,
      tetromino_Straight,
      tetromino_Straight_R90,
      //BS marsh ones
      octomino_Skewed,
      domino_Skewed,
      domino_Skewed_R90,
      tromino_Skewed,
      tetromino_Skewed,
      pentomino_Skewed
    };

    return shapeArrays[string];
}


function checkTetris(puzzlesInAreas) {
  
  const length = puzzlesInAreas.length;

  // Loop through each sub-array (area)
  for (let i = 0; i < puzzlesInAreas.length; i++) {


        // Use filter and includes to filter the secondary array
        const filteredpuzzlesInAreas = puzzlesInAreas[i].filter(item => tetrisShapes.includes(item));


        const shapesInArea = [];

        // Loop through the allowed shapes and map them to their arrays
        for (const shapeString of filteredpuzzlesInAreas) {
            shapesInArea.push(tetrisString2Shape(shapeString));
        }

        if (shapesInArea.length === 0){continue;}

        if (checkTetrisShapesInArea(findAreas()[i], shapesInArea) === false){
            return false;
        }

  }
  return true;
}


function checkSquares(puzzlesInAreas) {
  
  const length = puzzlesInAreas.length;
  //const FailedAreas  = new Array(length).fill(undefined);

  // Loop through each sub-array
  for (let i = 0; i < puzzlesInAreas.length; i++) {
 
        const colours = ['blacksquare', 'whitesquare'];
        const matchedWords = colours.filter(word => puzzlesInAreas[i].includes(word));
    
        if (matchedWords.length > 1){
          return false;
        }
  }
  return true;
}

function checkSuns(arrays) {
    const validShapes = ['sun', 'square'];
    const results = [];

    for(const arr of arrays) {
        const colorCount = {};
        
        for(const item of arr) {
            if (item === undefined || typeof item !== 'string') continue;
            let color, shape;

            // Find the shape in the item first, and then determine the color
            for(const s of validShapes) {
                if (item.endsWith(s)) {
                    shape = s;
                    color = item.replace(s, '');
                    break;
                }
            }

            // If no valid shape is found, skip this item
            if (!shape) continue;

            colorCount[color] = colorCount[color] || { sun: 0, square: 0 };
            colorCount[color][shape]++;
        }

        let isValid = true;
        for(const color in colorCount) {
            const { sun, square } = colorCount[color];

            if (sun !== 0) { 
                if (sun % 2 !== 0) {
                    if (square !== 1) {
                        isValid = false;
                        break;
                    }
                } else if (square % 2 !== 0) {
                    isValid = false;
                    break;
                }
            }
        }
        
        results.push(isValid);
    }
    
    return results;
}

function checkHexagons(hexagons){

let filteredHexagons = hexagons;

    for (let i = 1; i < drawnPoints.length; i++) {
        let lineSegment = { x1: drawnPoints[i - 1].x, y1: drawnPoints[i - 1].y, x2: drawnPoints[i].x, y2: drawnPoints[i].y };

        lineSegment = {x1: (lineSegment.x1 / 100) * 2, y1: (lineSegment.y1 / 100) * 2, x2: (lineSegment.x2 / 100) * 2, y2: (lineSegment.y2 / 100) * 2};
        //console.log (lineSegment);

        for (const hexagon of hexagons) {
            if (((lineSegment.x1 === hexagon.x) && (lineSegment.y1 === hexagon.y)) || ((lineSegment.x2 === hexagon.x) && (lineSegment.y2 === hexagon.y))) {
                
                filteredHexagons = filteredHexagons.filter(h => !(h.x === hexagon.x && h.y === hexagon.y));
            }
            
            if ((((lineSegment.x1 + lineSegment.x2) / 2) === hexagon.x) && (((lineSegment.y1 + lineSegment.y2) / 2) === hexagon.y)){

                filteredHexagons = filteredHexagons.filter(h => !(h.x === hexagon.x && h.y === hexagon.y));

            }
            
        }

    }
    return filteredHexagons;
}

function checkTriangles(){
    let pass = true;
    failed.triangles = [];
    failed.doubletriangles = [];
    failed.tripletriangles = [];

    for (let row = 0; row < gridSizeY; row++) {
        for (let col = 0; col < gridSizeX; col++) {
            const element = grid[row][col];
            if ((element === 'triangle') || (element === 'doubletriangle') || (element === 'tripletriangle')) {
                let sharedEdges = 0;
                const squareEdges = [
                    { x1: col * squareSize, y1: row * squareSize, x2: (col + 1) * squareSize, y2: row * squareSize },
                    { x1: (col + 1) * squareSize, y1: row * squareSize, x2: (col + 1) * squareSize, y2: (row + 1) * squareSize },
                    { x1: (col + 1) * squareSize, y1: (row + 1) * squareSize, x2: col * squareSize, y2: (row + 1) * squareSize },
                    { x1: col * squareSize, y1: (row + 1) * squareSize, x2: col * squareSize, y2: row * squareSize },
                ];

                for (let i = 1; i < drawnPoints.length; i++) {
                    const lineSegment = { x1: drawnPoints[i - 1].x, y1: drawnPoints[i - 1].y, x2: drawnPoints[i].x, y2: drawnPoints[i].y };
                    for (const edge of squareEdges) {
                        if (isSharedEdge(lineSegment, edge)) {
                            sharedEdges++;
                        }
                    }
                }
                
                if (element === 'triangle') {
                    if (sharedEdges !== 1){
                        pass = false;
                        failed.triangles.push({ row: row, col: col });

                    }
                }
                
                else if (element === 'doubletriangle') {
                    if (sharedEdges !== 2) {
                        pass = false;
                        failed.doubletriangles.push({ row: row, col: col });
                    }
                }
                else if (element === 'tripletriangle') {
                    if (sharedEdges !== 3) {
                        pass = false;
                        failed.tripletriangles.push({ row: row, col: col });
                    }
                }

                
            }
        }
    }
    return pass;
}