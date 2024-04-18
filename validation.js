// validation.js
// Validation functions

/**
function generatePuzzleCombinations(array) {

    // Filter out empty strings
    const filteredArray = array.filter(element => element !== "");

    const nonYElements = filteredArray.filter(item => item !== 'Y');
    const yCount = filteredArray.length - nonYElements.length;
    const results = new Set(); // Use a set to avoid duplicate arrays

    // This function generates all combinations removing exactly 'removeCount' elements
    function getCombinations(arr, removeCount) {
        const combinations = [];
        const n = arr.length;

        function generate(index, current, remainingRemove) {
            if (current.length === n - removeCount) {
                // Sort before adding to ensure unique combinations regardless of order
                combinations.push(current.slice().sort());
                return;
            }
            if (index >= n) return;

            // Select the current item
            generate(index + 1, current.concat(arr[index]), remainingRemove);

            // Or omit it, if we still have removals left
            if (remainingRemove > 0) {
                generate(index + 1, current, remainingRemove - 1);
            }
        }

        generate(0, [], removeCount);
        return combinations;
    }

    // Generate all combinations based on the number of 'Y's
    // Each pair of 'Y' cancels each other out first
    const maxPairs = Math.floor(yCount / 2);
    for (let pairs = 0; pairs <= maxPairs; pairs++) {
        const remainingYs = yCount - 2 * pairs; // Remaining Y's after pairs cancel each other out
        if (remainingYs <= nonYElements.length) {
            getCombinations(nonYElements, remainingYs).forEach(combination => {
                results.add(combination.join('|'));
            });
        }
    }

    // Convert each string back to an array and return the unique arrays
    return Array.from(results).map(item => item.split('|'));
}
**/

function generatePuzzleCombinations(arr) {
    // Extract indices of 'Y' and other elements
    const yIndices = [];
    const otherElements = [];
    arr.forEach((item, index) => {
        if (item === 'Y') {
            yIndices.push(index);
        } else {
            otherElements.push(item);
        }
    });

    // If there are no 'Y' at all, return the original array as is
    if (yIndices.length === 0) {
        return [otherElements];
    }

    // Calculate the number of 'Y' that can effectively remove non-'Y' elements
    const effectiveYCount = Math.min(yIndices.length, otherElements.length);

    // If there are 'Y' but no non-'Y' items exist, return only the remaining 'Y's
    if (effectiveYCount === 0) {
        const result = [];
        for (let i = 0; i < yIndices.length; i++) {
            result.push('Y');
        }
        return [result];
    }

    // Generate all combinations by removing each unique set of non-Y items
    const combinations = new Set(); // Use set to avoid duplicates

    // Helper function to get combinations
    const getCombinations = (source, comboLength) => {
        const combos = [];
        const combiner = (prefix, items, length) => {
            if (length === 0) {
                combos.push(prefix);
                return;
            }
            for (let i = 0; i < items.length; i++) {
                combiner(prefix.concat(items[i]), items.slice(i + 1), length - 1);
            }
        };
        combiner([], source, comboLength);
        return combos;
    };

    // Generate combinations by choosing effectiveYCount items from otherElements
    const selectedCombos = getCombinations(otherElements, otherElements.length - effectiveYCount);

    // Convert each combination to the desired format, filling with remaining 'Y's if necessary
    selectedCombos.forEach(combo => {
        const result = [...combo];
        for (let i = 0; i < yIndices.length - effectiveYCount; i++) {
            result.push('Y'); // Add remaining Y's that couldn't remove anything
        }
        combinations.add(result.join(',')); // Join to string to store as unique set
    });

    // Convert Set back to array of arrays
    return Array.from(combinations, combo => combo.split(','));
}

function rotateShape(shape, angle) {
    //console.log('testing with degree' , angle);
    // Ensure the angle is one of 0, 90, 180, 270
    angle = angle % 360;
    if (angle < 0) angle += 360;

    return shape.map(block => {
        switch (angle) {
            case 90:
                return { x: block.y, y: -block.x };
            case 180:
                return { x: -block.x, y: -block.y };
            case 270:
                return { x: -block.y, y: block.x };
            default: // includes case 0:
                return { x: block.x, y: block.y };
        }
    });
}

function isRotatable(shape) {
    //console.log('shape can rotate');
    // Check if the shape contains the special object marking it as rotatable.
    return shape.some(block => block.x === null && block.y === null);

}

function removeRotationMarker(shape) {
    //console.log('removing marker');
    // Filter out the special object used to mark the shape as rotatable.
    return shape.filter(block => block.x !== null || block.y !== null);
}

// Function to check if we can place all the provided shapes in the given area
// checkTetrisShapesInArea(boxArea,[domino, domino]); // returns true
function checkTetrisShapesInArea(area, shapes) {

    //console.log('area');
    //console.log(area);
    //console.log('shapes');
    //console.log(shapes);


    //Speedhack_1: check #of shape squares and #of area squares match
    //const totalShapeSquares = shapes.reduce((acc, shape) => acc + shape.length, 0);
    const totalShapeSquares = shapes.reduce((acc, shape) => {
        // Filter out the rotatable markers before counting the shape's squares.
        const actualBlocks = shape.filter(block => block.x !== null || block.y !== null);
        return acc + actualBlocks.length;
    }, 0);

    if (totalShapeSquares !== area.length) {
        return false; // Quick exit
    }


    //TODO: speedhack to skip testing base/origin square of shapes and remove that square from all shapes. Then ensure it is 'consumed' properly when all other shape squares fit.
    
    // Ensure that the shapes parameter is an array.
    if (!Array.isArray(shapes)) {
        throw new Error("The shapes parameter must be an array.");
    }

    // Helper function to attempt placing a single shape into the area.
    function canPlaceSingleShape(area, shape, xOffset, yOffset) {

        //console.log('shape:');
        //console.log(shape);
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


        let canRotate = isRotatable(currentShape);

        // Remove the marker before processing.
        currentShape = removeRotationMarker(currentShape);

        // Now iterate over possible angles, but only one angle if not rotatable.
        let angles = canRotate ? [0, 90, 180, 270] : [0];
        for (let angle of angles) { // Now this considers rotatability
        
        let rotatedShape = rotateShape(currentShape, angle); // Rotate the shape accordingly
            

        for (let position of area) {
            if (canPlaceSingleShape(area, rotatedShape, position.x, position.y)) {
                // Construct a new area without the blocks of the placed shape.
                const newArea = area.filter(block => {
                    return !rotatedShape.some(shapeBlock => 
                        shapeBlock.x + position.x === block.x && shapeBlock.y + position.y === block.y
                    );
                });

                // Recursively attempt to fit the rest of the shapes in the new area.
                if (recursiveFit(newArea, remainingShapes.slice(1))) {
                    return true;
                }
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
      pentomino_Skewed,
      //ROTATABLES
      //Bunker
      tetromino_T_R270_Rotatable,
      //Castle
      tetromino_L_FH_R90_Rotatable,
      //Marsh
      tetromino_Straight_R90_Rotatable,
      tetromino_L_FH_R180_Rotatable,
      tetromino_L_FH_R270_Rotatable,
      tetromino_Straight_Rotatable,
      tetromino_L_Rotatable,
      tromino_Right_R270_Rotatable,
      domino_Skewed_Rotatable,
      tetromino_T_R180_Rotatable,
      pentomino_L_Rotatable,
      tetromino_L_R90_Rotatable,
      hexomino_Rectangle,
      tromino_T_R90,
      tromino_T_R270,
      tromino_T_R90_Rotatable,
      tromino_T_R270_Rotatable,
      pentomino_V_R270,
      pentomino_V_R270_Rotatable,
      pentomino_T,
      pentomino_T_R180,
      pentomino_T_R180_Rotatable,
      tromino_Straight_Rotatable,
      decomino_Skewed,
      decomino_Skewed_Rotatable
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

function checkTetrisInArea(Area, puzzlesInArea) {
  

    // Use filter and includes to filter the secondary array
    const filteredpuzzlesInArea = puzzlesInArea.filter(item => tetrisShapes.includes(item));


    const shapesInArea = [];

    // Loop through the allowed shapes and map them to their arrays
    for (const shapeString of filteredpuzzlesInArea) {
        shapesInArea.push(tetrisString2Shape(shapeString));
    }

    if (shapesInArea.length === 0){
        return true;
    }

    if (checkTetrisShapesInArea(Area, shapesInArea) === false){
        return false;
    }
    else {
        return true;
    }
  
}


function checkSquares(puzzlesInAreas) {
  
  const length = puzzlesInAreas.length;
  //const FailedAreas  = new Array(length).fill(undefined);

  // Loop through each sub-array
  for (let i = 0; i < puzzlesInAreas.length; i++) {
 
        const colours = ['blacksquare', 'whitesquare', 'limesquare', 'magentasquare'];
        const matchedWords = colours.filter(word => puzzlesInAreas[i].includes(word));
    
        if (matchedWords.length > 1){
          return false;
        }
  }
  return true;
}

function checkSquaresInArea(puzzlesInArea) {
  
    const colours = ['blacksquare', 'whitesquare', 'limesquare', 'magentasquare'];
    const matchedWords = colours.filter(word => puzzlesInArea.includes(word));

    if (matchedWords.length > 1){
      return false;
    }
    else{
        return true;
    }
}

function checkSuns(puzzlesInAreas) {
    const validShapes = ['sun', 'square'];
    const results = [];

    for(const puzzlesInArea of puzzlesInAreas) {
        const colorCount = {};
        
        for(const item of puzzlesInArea) {
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
        for (const color in colorCount) {
            const { sun, square } = colorCount[color];
            
            // Check if the total shapes for colors with a sun are exactly two
            if (sun > 0) {
                if (sun + square !== 2) {
                    isValid = false;
                    break;
                }
            }
        }
        
        results.push(isValid);
    }
    
    return results;
}

function checkSunsInArea(puzzlesInArea) {
    const validShapes = ['sun', 'square'];
    const results = [];

        const colorCount = {};
        
        for(const item of puzzlesInArea) {
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

        for (const color in colorCount) {
            const { sun, square } = colorCount[color];
            
            // Check if the total shapes for colors with a sun are exactly two
            if (sun > 0) {
                if (sun + square !== 2) {
                    return false;
                }
            }
        }
        
        return true;
}

function checkHexagonsInArea(area){

    return (area.includes('hexagon')) ? false : true;

}

function checkYsInArea(area){

    return (area.includes('Y')) ? false : true;

}

function filterHexagonsFromPlayerLine(hexagons){

let filteredHexagons = hexagons;

    for (let i = 1; i < drawnPoints.length; i++) {
        let lineSegment = { x1: drawnPoints[i - 1].x, y1: drawnPoints[i - 1].y, x2: drawnPoints[i].x, y2: drawnPoints[i].y };

        lineSegment = {x1: (lineSegment.x1 /squareSize) * 2, y1: (lineSegment.y1 /squareSize) * 2, x2: (lineSegment.x2 /squareSize) * 2, y2: (lineSegment.y2 /squareSize) * 2};
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

function filterHexagonsWithinArea(area, hexagons) {
    // Calculate the bounding corners for each square in the finer scale
    const validPoints = new Set();
    area.forEach(square => {
        // Define the bounds of the square in the finer scale
        const baseX = square.x * 2;
        const baseY = square.y * 2;
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                validPoints.add(`${baseX + i},${baseY + j}`);
            }
        }
    });

    // Filter hexagons to include only those that fit within the defined area
    return hexagons.filter(shape => {
        const key = `${shape.x},${shape.y}`;
        return validPoints.has(key);
    });
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