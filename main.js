/**

Fixes:
    fix hexagons not working with (or scaling to) squareSize changes
    fix aggressive backtracking player line :line 1433
    fix playing fail sound when clicking directly on an endPoint
    fix drawing hexagon over start of playerline. presumably we draw hexagons after startpoints.
    support:
        remove the canvas bg colour, since sRGB colour profiles issues on old machines makes the canvas stand out.
        for some reason old browsers have issues with fill on drawCorner. i must have missed something.
    cleanup:
        -remove all the legacy fullscreen/scaling hacks.
    optimization:
        +draw and redraw grid calls
        +validation

Low effort features:
    create basic line sanity check function (pre-puzzle)
    localstorage score

Medium effort features:
    scale game to viewport for large/small levels.

High effort features: 
    support Y shapes
        the Speedhack/early-exit in checkTetrisShapesInArea() will need to go. as we'll need to know exactly how many shapes can be fit. or we can use it if there are no negations.
    support rotated tetris shapes
    support symmetry
    support inverted/negative tetris shapes

**/
    
        // Initialize canvas and context
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        //Scaling hacks
        /**
        var scaleFactor = 0.3;
        // Store the original width and height
        var originalWidth = canvas.width;
        var originalHeight = canvas.height;
        // Scale the canvas
        canvas.width *= scaleFactor;
        canvas.height *= scaleFactor;
        // Scale the drawing context
        ctx.scale(scaleFactor, scaleFactor);

        // Calculate scale factors
        let scaleX = window.innerWidth / canvas.width;
        let scaleY = window.innerHeight / canvas.height;
        **/

        // Fullscreen
        // Listen for fullscreen change events
        document.addEventListener('fullscreenchange', function() {
            document.getElementById('footer').style.display = document.fullscreenElement ? 'none' : '';
            document.getElementById('sidebar').style.display = document.fullscreenElement ? 'none' : 'block';
            document.getElementById('sidebar-tab').style.display = document.fullscreenElement ? 'none' : '';
        });
        document.addEventListener('mozfullscreenchange', function() {
            document.getElementById('footer').style.display = document.mozFullScreenElement ? 'none' : '';
            document.getElementById('sidebar').style.display = document.mozFullScreenElement ? 'none' : 'block';
            document.getElementById('sidebar-tab').style.display = document.mozFullScreenElement ? 'none' : '';

        });
        document.addEventListener('webkitfullscreenchange', function() {
            document.getElementById('footer').style.display = document.webkitFullscreenElement ? 'none' : '';
            document.getElementById('sidebar').style.display = document.webkitFullscreenElement ? 'none' : 'block';
            document.getElementById('sidebar-tab').style.display = document.webkitFullscreenElement ? 'none' : '';
        });
        document.addEventListener('msfullscreenchange', function() {
            document.getElementById('footer').style.display = document.msFullscreenElement ? 'none' : '';
            document.getElementById('sidebar').style.display = document.msFullscreenElement ? 'none' : 'block';
            document.getElementById('sidebar-tab').style.display = document.msFullscreenElement ? 'none' : '';
        });


function rotateCanvasAroundCanvasOrigin(degrees){
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

}
        function toggleFullScreen() {
            if (!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)){

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { // Safari
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) { // Firefox
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) { // Internet Explorer and Edge
                    document.msExitFullscreen();
                }
            }
            else{
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
                    document.documentElement.msRequestFullscreen();
                }
            }
        }
                
        //canvas.addEventListener('dblclick', toggleFullScreen);
        //document.addEventListener('dblclick', toggleFullScreen);
        window.addEventListener('click', function (evt) {
            if (evt.detail === 3) {
                toggleFullScreen();
            }
        });

        //Convert touch events to mouse events, we should have used pointer events, but i didn't know about them.
        //Props to vetruvet for this idea @ https://blog.vetruvet.com/2010/12/converting-single-touch-events-to-mouse.html?m=1
        var touchToMouse = function(event) {
            // Exit if multi-touch
            if (event.touches.length > 1) return;

            let mouseEventType;
            switch (event.type) {
                case "touchstart": mouseEventType = "mousedown"; break;
                case "touchmove":  mouseEventType = "mousemove"; break;
                case "touchend":   mouseEventType = "mouseup"; break;
                default: return;
            }

            // Only proceed if a valid mouse event type is set
            if (!mouseEventType) return;

            const touch = event.changedTouches[0];
            const simulatedEvent = new MouseEvent(mouseEventType, {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 1,
                screenX: touch.screenX,
                screenY: touch.screenY,
                clientX: touch.clientX,
                clientY: touch.clientY,
                button: 0
            });

            // Dispatch the event to the target of the touch event
            touch.target.dispatchEvent(simulatedEvent);
            event.preventDefault();
        };

        canvas.ontouchstart = touchToMouse;
        canvas.ontouchmove = touchToMouse;
        canvas.ontouchend = touchToMouse;
        

        // Grid and line styling
        
        const playerLineColor = 'white';
        const playerLineColorFinish = "#FFFFFF";
    
        let playerLineColorSuccess = '#00FF00';
        let playerLineColorFail = '#FF0000';
        
        let bgColor;
        let gridColor;
        let endColor;

        const themes = {
            default: {
                endColor: '#00FF00',
                bgColor: '#02b35a',
                gridColor: '#2f4f3e',
                playerLineColorSuccess: '#00FF00',
                playerLineColorFail: '#0c0c0c'
              },
            yellow_basic: {
                endColor: 'rgba(0, 0, 0, 0)',
                bgColor: '#f4c000',
                gridColor: '#594400',
                playerLineColorSuccess: 'white',
                playerLineColorFail: '#0c0c0c'
              },
            yellow: {
                endColor: 'white',
                bgColor: '#f4c000',
                gridColor: '#594400',
                playerLineColorSuccess: '#ffee5d',
                playerLineColorFail: '#0c0c0c'
              },
            blue: {
                endColor: '#FFFFFF',
                bgColor: '#5554fe',
                gridColor: '#2202ab',
                playerLineColorSuccess: '#74aaf9',
                playerLineColorFail: '#0c0c0c'
              },
            green: {
                endColor: '#00FF00',
                bgColor: '#00e255',
                gridColor: '#027b30',
                playerLineColorSuccess: '#b9ff13',
                playerLineColorFail: '#0c0c0c'
              },
            grey: {
                endColor: '#00FF00',
                bgColor: '#bfc3c2',
                gridColor: '#676053',
                playerLineColorSuccess: '#dfeaf2',
                playerLineColorFail: '#0c0c0c'
              },
            red: {
                endColor: '#00FF00',
                bgColor: '#db1901',
                gridColor: '#ff5d4c',
                playerLineColorSuccess: '#ffe828',
                playerLineColorFail: '#0c0c0c'
              },
            olive: {
                endColor: '#00FF00',
                bgColor: '#a1b002',
                gridColor: '#c1bf65',
                playerLineColorSuccess: '#fefc25',
                playerLineColorFail: '#0c0c0c'
              },
            turquoise: {
                endColor: '#00FF00',
                bgColor: '#01abac',
                gridColor: '#264860',
                playerLineColorSuccess: '#c28302',
                playerLineColorFail: '#0c0c0c'
              },
            orange: {
                endColor: '#00FF00',
                bgColor: '#f48e02',
                gridColor: '#966300',
                playerLineColorSuccess: '#faed29',
                playerLineColorFail: '#FF0000' //check
              },
            brown: {
                endColor: '#554114',
                bgColor: '#554114',
                gridColor: '#3c3517',
                playerLineColorSuccess: '#faed29',
                playerLineColorFail: '#FF0000' //check
              },
            purple: {
                endColor: '#00FF00',
                bgColor: '#8421a4',
                gridColor: '#4c4b50',
                playerLineColorSuccess: '#be55c1',
                playerLineColorFail: '#FF0000' //check
              },
            treehouse_grey: {
                endColor: '#212728',
                bgColor: '#677277',
                gridColor: '#212728',
                playerLineColorSuccess: '#ecb313',
                playerLineColorFail: '#FF0000' //check
              },
            treehouse_brown: {
                endColor: '#554114',
                bgColor: '#554114',
                gridColor: '#3c3517',
                playerLineColorSuccess: '#bb7705',
                playerLineColorFail: '#FF0000' //check
              },
            treehouse_yellow: {
                endColor: '#0c181f',
                bgColor: '#4e5860',
                gridColor: '#0c181f',
                playerLineColorSuccess: '#fac427',
                playerLineColorFail: '#FF0000' //check
              },
            treehouse_pink: {
                endColor: '#0c181f',
                bgColor: '#4e5860',
                gridColor: '#0c181f',
                playerLineColorSuccess: '#db02ef',
                playerLineColorFail: '#FF0000' //check
              },
            treehouse_orange: {
                endColor: '#0c181f',
                bgColor: '#4e5860',
                gridColor: '#0c181f',
                playerLineColorSuccess: '#ee8f0f',
                playerLineColorFail: '#FF0000' //check
              },
            treehouse_green: {
                endColor: '#0c181f',
                bgColor: '#4e5860',
                gridColor: '#0c181f',
                playerLineColorSuccess: '#db02ef',
                playerLineColorFail: '#FF0000' //check
              },
        };


        //applyTheme(themes[levelData[level].theme]);
        function applyTheme(theme = 'default'){

            tm = themes[theme];
            endColor = tm.endColor;
            bgColor = tm.bgColor;
            gridColor = tm.gridColor;
            playerLineColorSuccess = tm.playerLineColorSuccess;
            //playerLineColorSuccess = '#00FF00';
            playerLineColorFail = tm.playerLineColorFail;
            //playerLineColorFail = '#FF0000';

            //match body to canvas colour
            document.body.style.backgroundColor = tm.bgColor;
            
            //Canvas cannot be trusted to color-match canvas with traditional elements on old browsers, and we get some edge artifacting. so i want to remove this, BUT.. 
            // we currently draw blocked lines, rather than not drawing them. so all gaps are bgColour.
            canvas.style.backgroundColor = tm.bgColor;            
            document.querySelector('a').style.color = tm.bgColor;
            
            //favicon flexin'
            updateFavicon(bgColor);

        }
        

        //Global Vars

        let soundPlayed = false;
        
        // Grid size and other constants
        const squareSize = 100;
        const shapeSize = squareSize / 8;
        const shapeGapSize = squareSize / 32;
        const startSize = squareSize / 4;
        const endSize = squareSize / 4;
        

        //Shapes
        const tetrisShapes = [
        'monomino',
        'domino',
        'domino_R90',
        'tromino_Right',
        'tromino_Right_R90',
        'tromino_Right_R180',
        'tromino_Right_R270',
        'tromino_Straight',
        'tromino_Straight_R90',
        'tetromino_Square',
        'tetromino_L',
        'tetromino_L_R90',
        'tetromino_L_R180',
        'tetromino_L_R270',
        'tetromino_L_FH',
        'tetromino_L_FH_R90',
        'tetromino_L_FH_R180',
        'tetromino_L_FH_R270',
        'tetromino_Skew',
        'tetromino_Skew_R90',
        'tetromino_Skew_FH',
        'tetromino_Skew_FH_R90',
        'tetromino_T',
        'tetromino_T_R90',
        'tetromino_T_R180',
        'tetromino_T_R270',
        'tetromino_Straight',
        'tetromino_Straight_R90',
        //BS marsh ones
        'octomino_Skewed',
        'domino_Skewed',
        'domino_Skewed_R90',
        'tromino_Skewed',
        'tetromino_Skewed',
        'pentomino_Skewed',
        //ROTATABLES
        //Bunker
        'tetromino_T_R270_Rotatable',
        //Castle
        'tetromino_L_FH_R90_Rotatable',
        //Marsh
        'tetromino_Straight_R90_Rotatable',
        'tetromino_L_FH_R180_Rotatable',
        'tetromino_L_FH_R270_Rotatable',
        'tetromino_Straight_Rotatable',
        'tetromino_L_Rotatable',
        'tromino_Right_R270_Rotatable',
        'domino_Skewed_Rotatable',
        'tetromino_T_R180_Rotatable',
        'pentomino_L_Rotatable',
        'tetromino_L_R90_Rotatable',
        'hexomino_Rectangle',
        'tromino_T_R90',
        'tromino_T_R270',
        'tromino_T_R90_Rotatable',
        'tromino_T_R270_Rotatable',
        'pentomino_V_R270',
        'pentomino_V_R270_Rotatable',
        'pentomino_T',
        'pentomino_T_R180',
        'pentomino_T_R180_Rotatable',
        'tromino_Straight_Rotatable',
        'decomino_Skewed',
        'decomino_Skewed_Rotatable'
        ];
        
        // Initialise Grid
        function createEmptyGrid(x,y) {
          const grid = [];
          for (let i = 0; i < y; i++) {
            const row = [];
            for (let j = 0; j < x; j++) {
              row.push('');
            }
            grid.push(row);
          }
          return grid;
        }

        function convertToMultidimensional(newFormat, gridSizeX, gridSizeY) {
          const grid = createEmptyGrid(gridSizeX, gridSizeY);

          for (const cell of newFormat) {
            if (cell.x >= 0 && cell.x < gridSizeX && cell.y >= 0 && cell.y < gridSizeY) {
              grid[cell.y][cell.x] = cell.value;
            }
          }

          return grid;
        }

        let level = 0;
        let hexagons;
        let startingPoints;
        let chosenStartingPoint = { x: null, y: null};
        let endingPoint;
        let endingPoints;
        let chosenEndingPoint = { x: null, y: null};
        let blockedLines;
        let hiddenLines;
        let grid;
        let gridSizeX;
        let gridSizeY;

        let maxCoordinateX = gridSizeX * squareSize;
        let maxCoordinateY = gridSizeY * squareSize;

        //Canvas setup
        let offset = squareSize;
        
        let viewportWidth;
        let viewportHeight;

        let scaleX; 
        let scaleY;

        // Drawing state variables
        let isDrawing = false;
        let lastPoint = null;
        let completed = false;
        
        let drawnPoints = [];

        // Function to draw the grid and points
        const drawGridAndPuzzles = () => {

            ctx.clearRect(0 -offset, 0 -offset, canvas.width +offset, canvas.height +offset);
            ctx.strokeStyle = gridColor;


            // Drawing squares and skip the hidden-edges
            let drawTop = false;
            let drawRight = false;
            let drawBottom = false;
            let drawLeft = false;

            for (let i = 0; i <= gridSizeX -1; i++) {
                for (let j = 0; j <= gridSizeY-1; j++) {
                    drawTop = false;
                    drawRight = false;
                    drawBottom = false;
                    drawLeft = false;
                    
                    // Draw top edge
                    if (!hiddenLines[i][j][i+1][j]){
                        drawTop = true;
                    }
                    // Draw right edge
                    if (!hiddenLines[i+1][j][i+1][j+1]){
                        drawRight = true;
                    }
                    // Draw bottom edge
                    if (!hiddenLines[i][j+1][i+1][j+1]){
                        drawBottom = true;
                    }
                    // Draw left edge
                    if (!hiddenLines[i][j][i][j+1]){
                        drawLeft = true;
                    }
                         
                    if (drawTop) {
                        if (drawLeft) {
                            drawCorner(i,j);
                        }
                        if (drawRight) {
                            drawCorner(i+1,j);
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize, j * squareSize);
                        ctx.lineTo(i * squareSize + squareSize, j * squareSize);
                        ctx.stroke();
                    }
                    
                    if (drawRight) {
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize + squareSize, j * squareSize);
                        ctx.lineTo(i * squareSize + squareSize, j * squareSize + squareSize);
                        ctx.stroke();
                    }

                    if (drawBottom) {
                    
                        if (drawLeft) {
                            drawCorner(i,j+1);
                        }
                        if (drawRight) {
                            drawCorner(i+1,j+1);
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize, j * squareSize + squareSize);
                        ctx.lineTo(i * squareSize + squareSize, j * squareSize + squareSize);
                        ctx.stroke();
                    }

                    if (drawLeft) {
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize, j * squareSize);
                        ctx.lineTo(i * squareSize, j * squareSize + squareSize);
                        ctx.stroke();
                    }
                }
            }
          
            // draw the blocked-line features
            for (let x1 = 0; x1 <= gridSizeX; x1++) {
                for (let y1 = 0; y1 <= gridSizeY; y1++) {
                    for (let x2 = 0; x2 <= gridSizeX; x2++) {
                        for (let y2 = 0; y2 <= gridSizeY; y2++) {
                            if (blockedLines[x1][y1][x2][y2] === 1) {
                                ctx.strokeStyle = bgColor;  // Same as background color for blocked lines
                                ctx.beginPath();

                                if (x1 === x2 && Math.abs(y2 - y1) === 1) {
                                    // This is a vertical break, top to bottom
                                    ctx.moveTo(x1 * squareSize, y1 * squareSize+(squareSize / 4));
                                    ctx.lineTo(x2 * squareSize, y2 * squareSize-(squareSize / 4));
                                    ctx.stroke();
                                  
                                } else if (y1 === y2 && Math.abs(x2 - x1) === 1) {
                                    // This is a hoizontal break, left to right
                                    ctx.moveTo(x1 * squareSize+(squareSize / 4), y1 * squareSize);
                                    ctx.lineTo(x2 * squareSize-(squareSize / 4), y2 * squareSize);
                                    ctx.stroke();
                                }
                            }
                        }
                    }
                }
            }

            // Redraw start and end points
            
            for (const startCircle of startingPoints) {

                if (startCircle === chosenStartingPoint){
                    ctx.fillStyle = (isDrawing ? playerLineColor : (completed ? playerLineColorSuccess : gridColor));
                }
                else{
                    ctx.fillStyle = gridColor;
                }
                
                ctx.beginPath();
                ctx.arc(startCircle.x * squareSize, startCircle.y * squareSize, startSize, 0, 2 * Math.PI);
                ctx.fill();
            }

            
            // End
            ctx.strokeStyle = gridColor;
            

            for (const endTail of endingPoints) {
                    //TODO: i *think* this fixes some endPoint-corners from being coloured incorrectly
                    ctx.strokeStyle = ((completed && (endTail.x === chosenEndingPoint.x && endTail.y === chosenEndingPoint.y)) ? playerLineColorSuccess : gridColor);
                    drawCorner(endTail.x,endTail.y); //hack for first levels
                    
                    //colour the tail depending on if its the chosen end and success
                    drawTail(endTail.x,endTail.y, ((endColor === 'rgba(0, 0, 0, 0)') ? endColor : (((completed && (endTail.x === chosenEndingPoint.x && endTail.y === chosenEndingPoint.y)) ? playerLineColorSuccess : gridColor))));
                    
            }

            //TODO: replace below with a 'tail'
            //ctx.fillStyle = (endColor === 'rgba(0, 0, 0, 0)') ? endColor : (completed ? playerLineColorSuccess : endColor); 
            //ctx.beginPath();
            //ctx.arc(endingPoint.x * squareSize, endingPoint.y * squareSize, endSize, 0, 2 * Math.PI);
            //ctx.fill();


            // Draw puzzle elements
            for (let row = 0; row < gridSizeY; row++) {
              for (let col = 0; col < gridSizeX; col++) {
                  const element = grid[row][col];
                  const x = (col + 0.5) * squareSize;
                  const y = (row + 0.5) * squareSize;


                  //Triangles
                  const triangleSize = squareSize / 5; // Adjust the size as needed

                  if (element === 'triangle') {
                      drawTriangle(x, y, triangleSize);
                  }
                  else if (element === 'doubletriangle') {
                      drawTriangle(x - (triangleSize / 2), y, triangleSize);
                      drawTriangle(x + (triangleSize / 2), y, triangleSize);
                  }
                  else if (element === 'tripletriangle') {
                      drawTriangle(x, y, triangleSize);
                      drawTriangle(x - triangleSize, y, triangleSize);
                      drawTriangle(x + triangleSize, y, triangleSize);
                  }

                  //Squares
                  else if (element.endsWith("square")) {
                    var squareColor = element.slice(0, -6)
                    drawRoundedSquare(x, y, squareColor);

                  }

                  //Suns
                  else if (element.endsWith("sun")) {
                    var sunColor = element.slice(0, -3)
                    drawSun(x, y, sunColor);

                  }

                  //Tetris
                  else if (tetrisShapes.includes(element)) {
                    drawTetrisShape(x, y, tetrisString2Shape(element));
                  }

                  //Y-Shapes
                  else if (element === 'Y') {
                    drawYShape(x, y, squareSize / 8);
                  }
                  
                  
              }
            }

            // Draw Bestigons
            for (const hexagon of hexagons) {
                drawHexagon(hexagon.x * (squareSize/2), hexagon.y * (squareSize/2), 8); //TODO: squareSize / 12.5
            }

        };

        function loadLevel(n){

            let level = levelData[n];

            applyTheme(level.theme);

            grid = convertToMultidimensional(level.puzzles, level.gridSizeX,level.gridSizeY);

            gridSizeX = level.gridSizeX;
            gridSizeY = level.gridSizeY;
            
            hexagons = level.hexagons;
            startingPoints = level.startingPoints;
            endingPoints = level.endingPoints;
            endingPoint = level.endingPoint;
            maxCoordinateX = gridSizeX * squareSize;
            maxCoordinateY = gridSizeY * squareSize;

            //Canvas setup
            offset = squareSize;
            canvas.width = gridSizeX * squareSize + offset;
            canvas.height = gridSizeY * squareSize + offset;
            ctx.translate(offset/2, offset/2);
            
            viewportWidth = window.innerWidth; // Width of the viewport
            viewportHeight = window.innerHeight; // Height of the viewport

            scaleX = viewportWidth / canvas.width;
            scaleY = viewportHeight / canvas.height;

            ctx.lineWidth = squareSize / 5;

            //Set up blocked lines structure. pretty, but needs impossible lines pruning. i.e. [0][0][0][5]
            blockedLines = Array.from({ length: gridSizeX + 1 }, () =>
              Array.from({ length: gridSizeY + 1 }, () =>
                Array.from({ length: gridSizeX + 1 }, () =>
                  Array.from({ length: gridSizeY + 1 }, () => 0)
                )
              )
            );
            for (let i = 0; i < level.blockedLines.length; i++){
                blockedLines[level.blockedLines[i].x1][level.blockedLines[i].y1][level.blockedLines[i].x2][level.blockedLines[i].y2] = 1;
            }

            //Set up hidden lines structure. pretty, but needs impossible lines pruning. i.e. [0][0][0][5]
            hiddenLines = Array.from({ length: gridSizeX + 1 }, () =>
              Array.from({ length: gridSizeY + 1 }, () =>
                Array.from({ length: gridSizeX + 1 }, () =>
                  Array.from({ length: gridSizeY + 1 }, () => 0)
                )
              )
            );
            for (let i = 0; i < level.hiddenLines.length; i++){
                hiddenLines[level.hiddenLines[i].x1][level.hiddenLines[i].y1][level.hiddenLines[i].x2][level.hiddenLines[i].y2] = 1;
            }
            drawGridAndPuzzles();
        } 
        
        loadLevel(level);



    //I refuse to resort to a second overlay Canvas to make this work. I am only temporarily giving up.
    //drawGrowingCircle(200, 200, 20, 15, 3); // x, y, maxSize, growthRate (in pixels per second), durationInSeconds
    function drawGrowingCircle(x, y, maxSize, growthRate, durationInSeconds) {
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');

      let startTime = null;
      let currentSize = 0;
      let intervalId = null;
      let endTime = null;

      function drawFrame() {
        const now = Date.now();
        const elapsedTime = now - startTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, 2 * Math.PI);
        ctx.strokeStyle = '#ffffffa1';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (endTime && now >= endTime && currentSize === 0) {
          cancelAnimation();
        }

        currentSize = (elapsedTime / 1000) * growthRate;

        if (currentSize > maxSize) {
          currentSize = 0;
          startTime = now;
        }
      }

      function startAnimation() {
        startTime = Date.now(); // Initialize the start time
        endTime = startTime + (durationInSeconds * 1000); // Calculate end time
        intervalId = setInterval(drawFrame, 1000 / 60); // Run drawFrame approximately every 16.67 milliseconds (60 FPS)
      }

      function cancelAnimation() {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }

      // Start animation immediately upon calling the function
      startAnimation();

      // Return the function to cancel the animation loop
      return cancelAnimation;
    }

        function drawCorner(x, y){
            ctx.beginPath();
            ctx.arc(x*squareSize, y*squareSize, 0.1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        function drawTail(x, y, color){


            ctx.strokeStyle = color;

            let isTop = y === 0;
            let isBottom = y === gridSizeY;
            let isLeft = x === 0;
            let isRight = x === gridSizeX;

            let tailSize = squareSize/3;

            ctx.beginPath();

            ctx.moveTo(x * squareSize, y * squareSize);

            let destinationX, destinationY;

            if (isTop && isLeft) {
                destinationX = x * squareSize - (tailSize / Math.sqrt(2)); //Pythagoras baby.
                destinationY = y * squareSize - (tailSize / Math.sqrt(2));
            } else if (isTop && isRight) {
                destinationX = x * squareSize + (tailSize / Math.sqrt(2));
                destinationY = y * squareSize - (tailSize / Math.sqrt(2));
            } else if (isBottom && isLeft) {
                destinationX = x * squareSize - (tailSize / Math.sqrt(2));
                destinationY = y * squareSize + (tailSize / Math.sqrt(2));
            } else if (isBottom && isRight) {
                destinationX = x * squareSize + (tailSize / Math.sqrt(2));
                destinationY = y * squareSize + (tailSize / Math.sqrt(2));
            } else if (isTop) {
                destinationX = x * squareSize;
                destinationY = y * squareSize - tailSize;
            } else if (isBottom) {
                destinationX = x * squareSize;
                destinationY = y * squareSize + tailSize;
            } else if (isLeft) {
                destinationX = x * squareSize - tailSize;
                destinationY = y * squareSize;
            } else if (isRight) {
                destinationX = x * squareSize + tailSize;
                destinationY = y * squareSize;
            }
            ctx.lineTo(destinationX, destinationY);
            ctx.stroke();
            drawCorner(destinationX / squareSize, destinationY / squareSize);
        }

        
        
        
function containsMatchingObject(targetObj, arr) {
    return arr.some(obj => {
        // Check every key in the target object against the current object
        return Object.keys(targetObj).every(key => obj[key] === targetObj[key]);
    });
}

// Function to check if the user-drawn line meets the success criteria
let failed = {};
const validateLine = () => {
    let isValid = true;
    failed = {};


    //Validate Line
    
    //PreValidation sanity check - dont validate puzzles if this fails
    if (!(Array.isArray(drawnPoints)) || (drawnPoints.length === 0)){
        isValid = false;
        console.log("failed line! the line is empty?!");
    }  
    else{

        if (drawnPoints.length === 1){
            isValid = false;
            console.log("failed line! the line is a dot to you?!");
        }  

        if ((drawnPoints[0].x /squareSize != chosenStartingPoint.x) || (drawnPoints[0].y /squareSize != chosenStartingPoint.y)){
        isValid = false;
        console.log("failed line! you didnt start on a startingPoint");
        }
        
        if (!containsMatchingObject({x:(drawnPoints[drawnPoints.length - 1].x /squareSize),y:(drawnPoints[drawnPoints.length - 1].y /squareSize)}, endingPoints)){

            isValid = false;
            console.log("failed line! you complete the line / reach an endingPoint");
        }

        for (let i = 1; i < drawnPoints.length; i++) {
            let prevPoint = drawnPoints[i - 1];
            let currentPoint = drawnPoints[i];
            
            let xDiff = Math.abs(currentPoint.x - prevPoint.x);
            let yDiff = Math.abs(currentPoint.y - prevPoint.y);
            
            if (!((xDiff === squareSize && yDiff === 0) || (xDiff === 0 && yDiff === squareSize))) {
                isValid = false;
                console.log("failed line! each point is not exactly squareSize(100) x or y coordinate away");
                break;
            }
        }

        for (let i = 0; i < drawnPoints.length; i++) {
            const obj1 = drawnPoints[i];
            
            // Compare against each subsequent object in the array
            for (let j = i + 1; j < drawnPoints.length; j++) {
                const obj2 = drawnPoints[j];
                // If any two objects are the same, set isValid to false and break out of the loop
                if (obj1.x === obj2.x && obj1.y === obj2.y) {
                    isValid = false;
                    console.log("failed line! you've used a vertices twice");
                    break;
                }
            }
            // Break out of the outer loop if isValid is false
            if (!isValid) {
                break;
            }
        }
    }

    const puzzlesInAreas = getPuzzlesInAreas();

    //Validate Hexagons
    if (checkHexagons(hexagons).length != 0){
        isValid = false;
        console.log("failed hexagons!");
    }
        //Validate Triangles
    if (checkTriangles() === false){
        isValid = false;
        console.log("failed triangles!");
    }

    //Validate Squares
    if (checkSquares(puzzlesInAreas) === false){
        isValid = false;
        console.log("failed squares!");
    }
    
  //Validate Suns
    if (checkSuns(puzzlesInAreas).includes(false)){
        isValid = false;
        console.log("failed suns!");
    }
  
  //Validate Tetris (please work, i spent way too long on this)
    if (checkTetris(puzzlesInAreas) === false){
        isValid = false;
        console.log("failed tetris!");
    }
    if (isValid) {
      
        console.log("Valid line!");
        completed = true;
        if (level === 0){
                // Hall of the Mountain Kind
                playSFX("challenge");
        }

        //set check on level in menu. TODO: this needs abstracting to an event.
        document.getElementById(level).checked = true;

        level ++;

        playSFX("success");
        redrawCanvas();

    } else {
        
        playSFX("failure");
        

        redrawCanvas(); //Prevents the 'finished line' glow effect lingering

        redrawInvalidLine();
        drawnPoints.length = 0;
        lastPoint = null;
        
        // Clear the line after a short delay
        setTimeout(() => {
            redrawCanvas();
        }, 1000);  // 1 second delay
        
    }
    chosenStartingPoint = { x: null, y: null};
    chosenEndingPoint = { x: null, y: null};
};


let startTime;
let animationId = null;
const fixedHue = 48; // Fixed hue (e.g., 180 for a blue color)
const fixedSaturation = 100; // Fixed saturation

function startAnimation() {
    if (animationId === null){
      startTime = Date.now(); // record the start time
      animate(); // start the animation loop
    }
}

function animate() {
    // Calculate how much time has passed
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    // Calculate a new luminance based on the elapsed time
    // This will create a pulsing effect between 50% and 100% luminance
    const minLuminance = 50;
    const maxLuminance = 100;
    const pulsingSpeed = 200; // Speed of the pulse in milliseconds
    const luminance = minLuminance + (Math.sin(elapsedTime / pulsingSpeed) + 1) / 2 * (maxLuminance - minLuminance);

    const color = `hsl(${fixedHue}, ${fixedSaturation}%, ${luminance}%)`;

     
     for (let i = 1; i < drawnPoints.length; i++) {

        ctx.shadowBlur = 5;
        ctx.shadowColor = color;

        drawLine(drawnPoints[i - 1], drawnPoints[i], color);  // wooo!
        ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(chosenStartingPoint.x * squareSize, chosenStartingPoint.y * squareSize, startSize, 0, 2 * Math.PI);
            ctx.fill();


        drawTail(chosenEndingPoint.x,chosenEndingPoint.y, ((endColor === 'rgba(0, 0, 0, 0)') ? endColor : (completed ? playerLineColorSuccess : color)));

        // Disable shadow blur effect
        ctx.shadowBlur = 0;
    }

    // Schedule the next frame
    animationId = requestAnimationFrame(animate);
    
}

const redrawInvalidLine = () => {

    if ((Array.isArray(drawnPoints)) && (drawnPoints.length !== 0)){

        //red line
        for (let i = 1; i < drawnPoints.length; i++) {
            drawLine(drawnPoints[i - 1], drawnPoints[i], playerLineColorFail);  // Red for invalid
        }
        //red start
        ctx.fillStyle = playerLineColorFail;               
        ctx.beginPath();
        ctx.arc(chosenStartingPoint.x * squareSize, chosenStartingPoint.y * squareSize, startSize, 0, 2 * Math.PI);
        ctx.fill();

    }
};

const drawFinishLine = () => {
    
    startAnimation();

    //for (let i = 1; i < drawnPoints.length; i++) {
      //  drawLine(drawnPoints[i - 1], drawnPoints[i], playerLineColorFinish);  // White for finished
   // }
};

function getPuzzlesInAreas(){
// Get the array of arrays
      const arrayOfArrays = findAreas();
      
      let areasPuzzles = [];

      // Loop through each Area
      for (let i = 0; i < arrayOfArrays.length; i++) {
        const subArray = arrayOfArrays[i];
        
        let areaPuzzles = [];
        
        // Loop through each object in the sub-array
        for (let j = 0; j < subArray.length; j++) {
          const element = subArray[j];
          
          areaPuzzles.push(grid[element.y][element.x]);

        }
        
        areasPuzzles.push(areaPuzzles);
      }
      return areasPuzzles;
}

const redrawCanvas = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid and special cells
    drawGridAndPuzzles(); // You already have this, presumably

    // Draw the line
    for (let i = 1; i < drawnPoints.length; i++) {
        const lineColor = completed ? playerLineColorSuccess : playerLineColor;
        drawLine(drawnPoints[i - 1], drawnPoints[i], lineColor);
        //drawCorner(drawnPoints[i].x / squareSize, drawnPoints[i].y / squareSize);
    }
};


// Function to check if two line segments share an edge
const isSharedEdge = (line1, line2) => {
    return (line1.x1 === line2.x1 && line1.y1 === line2.y1 && line1.x2 === line2.x2 && line1.y2 === line2.y2) ||
           (line1.x1 === line2.x2 && line1.y1 === line2.y2 && line1.x2 === line2.x1 && line1.y2 === line2.y1);
};


        // Initial draw
        drawGridAndPuzzles();

        // Utility functions
        const getClosestPoint = (x, y) => {
            let closestX = Math.round(x / squareSize) * squareSize;
            let closestY = Math.round(y / squareSize) * squareSize;
            return { x: closestX, y: closestY };
        };

        const drawLine = (from, to, color) => {
           

            ctx.strokeStyle = color;
            ctx.beginPath();
             //drawCorner(from.x / squareSize, from.y / squareSize);
            drawCorner(to.x / squareSize, to.y / squareSize);
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        };

        const redrawPath = () => {
            drawGridAndPuzzles();
            for (let i = 0; i < drawnPoints.length - 1; i++) {
                drawLine(drawnPoints[i], drawnPoints[i + 1], playerLineColor);
            }
        };


        // Function to get mouse coordinates relative to the canvas
            function getAdjustedMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left - (squareSize/2); // Adjust for translation
            let y = e.clientY - rect.top - (squareSize/2); // Adjust for translation

            return { x, y };
        }

        // Event listeners
        canvas.addEventListener('mousedown', (e) => {

            if (completed){
                loadLevel(level);
                completed = false;
                drawnPoints.length = 0;
            }

            offsetMousePos = getAdjustedMousePos(e);

            const closestPoint = getClosestPoint(offsetMousePos.x, offsetMousePos.y);

            for (const startCircle of startingPoints) {
                
                if (closestPoint.x === startCircle.x * squareSize && closestPoint.y === startCircle.y * squareSize) {
                    chosenStartingPoint = startCircle;
                    playSFX("start");
                    isDrawing = true;
                    lastPoint = closestPoint;
                    drawnPoints.push(lastPoint);
                    drawGridAndPuzzles();
                }
            }
            
        });

        canvas.addEventListener('mouseup', (e) => {
            cancelAnimationFrame(animationId);
            animationId = null;

            offsetMousePos = getAdjustedMousePos(e);

            const currentPoint = getClosestPoint(offsetMousePos.x, offsetMousePos.y);

            //if currentPoint in endPoints
            if (!containsMatchingObject({x:(currentPoint.x /squareSize),y:(currentPoint.y /squareSize)}, endingPoints)){

                //chosenEndingPoint = { x: null, y: null};
            
                if (isDrawing){
                    playSFX("abort");
                }
                isDrawing = false;
                lastPoint = null;
                drawnPoints.length = 0;
                drawGridAndPuzzles();
            } else {
                //chosenEndingPoint = {x:(currentPoint.x /squareSize),y:(currentPoint.y /squareSize)};
                isDrawing = false;
                lastPoint = null;
                validateLine();
            }
        });
        
        canvas.addEventListener('keydown', (e) => {

            let direction;
       
            switch (e.keyCode) {
                case 87:
                    direction = { x: x, y: - 100 };
                    break;
                case 83:
                    direction = { x: x, y: 100 };
                    break;
                case 65:
                    direction = { x: - 100, y: y };
                    break;
                case 68:
                    direction = { x: 100, y: y };
                    break;
                default:
                    return; // Exit if it's not an arrow key
            }
              const currentPoint = {
                    x: lastPoint.x + direction.x * squareSize,
                    y: lastPoint.y + direction.y * squareSize
                };
        });

        document.addEventListener('keydown', function(event) {
            
            if (event.key === "Enter") {
                if (level !== levelData.length - 1){
                    level ++;
                    loadLevel(level);
                }
            }
            else if (event.key === "Backspace") {
                if (level !== 0){
                    level --;
                    loadLevel(level);
                }
            } 
        });


        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;

            offsetMousePos = getAdjustedMousePos(e);
            
            const currentPoint = getClosestPoint(offsetMousePos.x, offsetMousePos.y);
            
            const x1 = lastPoint.x / squareSize;
            const y1 = lastPoint.y / squareSize;
            const x2 = currentPoint.x / squareSize;
            const y2 = currentPoint.y / squareSize;
            

            if (blockedLines[x1][y1][x2][y2] === 1 || blockedLines[x2][y2][x1][y1] === 1) {
              return; // Don't draw the line if it's blocked
            }

            if (hiddenLines[x1][y1][x2][y2] === 1 || hiddenLines[x2][y2][x1][y1] === 1) {
              return; // Don't draw the line if it's hidden
            }
            
            // Prevent diagonal lines
            const dx = Math.abs(currentPoint.x - lastPoint.x);
            const dy = Math.abs(currentPoint.y - lastPoint.y);
            if (dx > squareSize || dy > squareSize || (dx > 0 && dy > 0)) return;
            
            const lastIndex = drawnPoints.findIndex(point => point.x === currentPoint.x && point.y === currentPoint.y);
            
            if (lastIndex !== -1) {
                // If the last index is not the immediate previous point, it means we've come back to a point
                // we've visited before, and we should truncate the array to that point to enable "backtracking."
                if (lastIndex !== drawnPoints.length - 1) {
                    drawnPoints.length = lastIndex + 1;
                }
                redrawPath();
            } else {
                // Set the line color based on the 'completed' state variable
                const lineColor = completed ? playerLineColorFail : playerLineColor;
                drawLine(lastPoint, currentPoint, lineColor);
                drawnPoints.push(currentPoint);
            }
            lastPoint = currentPoint;

            //Play finish tracing sound and recolour line
            //if (x2 === endingPoint.x && y2 === endingPoint.y) {
            if (containsMatchingObject({x: x2, y: y2}, endingPoints)){

                chosenEndingPoint = {x: x2, y: y2};

                drawFinishLine();
                if (!soundPlayed) {
                    playSFX("finish");
                    soundPlayed = true;
                }
            } else {
                chosenEndingPoint = { x: null, y: null};
                // Reset the sound played flag if the mouse moves away from the ending point
                cancelAnimationFrame(animationId);
                animationId = null;
                soundPlayed = false;
            }
            
            
        });
        

const playSFX = (sfx) => {
//https://www.soundboard.com/track/1047032
    var fx;
    switch(sfx) {
      case "start":
        fx = new Audio("start.mp3");
        break;
      case "abort":
        fx = new Audio("abort.mp3");
        break;
      case "finish":
        fx = new Audio("finish.mp3");
        break;
      case "failure":
        fx = new Audio("failure.mp3");
        break;
      case "success":
        fx = new Audio("success.mp3");
        break;
      case "challenge":
        fx = new Audio("kevin-macleod-hall-of-the-mountain-king.mp3");
        fx.addEventListener('ended', function() {
            
            var userResponse = window.confirm('you reached level '+(level+1)+' before the music ended.\nkeep playing new puzzles with the level-select menu unlocked (OK), or try again from level 1 (Cancel).');
            if (userResponse) {
                debug();
            } else {
                level = 0;
                loadLevel(level);
            }
        });
        break;
      
      //default to playing nothing if we dont have a case for sfx
      default:
        return;
    }
    fx.play();
}
function findAreas() {   
    let visited = new Array(gridSizeX).fill(null).map(() => new Array(gridSizeY).fill(false));


    // If we have some bizzare squares in our level we dont want to inlcude in our Areas, remove them now.
    if (levelData[level].nonvisitingSquares && Array.isArray(levelData[level].nonvisitingSquares) && levelData[level].nonvisitingSquares.length > 0){
        for (let y = 0; y < levelData[level].nonvisitingSquares.length; y++) {
            visited[levelData[level].nonvisitingSquares[y].x][levelData[level].nonvisitingSquares[y].y] = true;
        }
    }
    
    let areas = []; // Array of areas, where each area is an array of squares

    
  function visitSquare(x, y, newArea) {
    visited[x][y] = true;       // Mark this square as visited
    newArea.push({ x, y });


    const neighbors = [[0, 1], [1, 0], [0, -1], [-1, 0]];  

    // Check neighbors
    for (let i = 0; i < neighbors.length; i++) {
      let xOffset = neighbors[i][0];
      let yOffset = neighbors[i][1];
      let neighborX = x + xOffset;
      let neighborY = y + yOffset;

      // Skip if outside the grid
      if (neighborX < 0 || neighborX >= gridSizeX || neighborY < 0 || neighborY >= gridSizeY) {
        continue;
      }

      // Skip if this square has already been visited
      if (visited[neighborX][neighborY]) {
        continue;
      }

      // Check if there's a player line between (x, y) and (neighborX, neighborY)
      let edge = calculateEdge(x, y, neighborX, neighborY);
      //if ((segmentExists(edge.x1,edge.y1,edge.x2,edge.y2)) || (blockExists(edge.x1,edge.y1,edge.x2,edge.y2))) {
      if (segmentExists(edge.x1,edge.y1,edge.x2,edge.y2)){
        continue;
      }

      // Visit this square
      visitSquare(neighborX, neighborY, newArea);
    }
  }

  for (let x = 0; x < gridSizeX; x++) {
    for (let y = 0; y < gridSizeY; y++) {
      // Skip if this square has already been visited
      if (visited[x][y]) {
        continue;
      }

      // Initialize a new area
      let newArea = [];

      // Start the recursive visitation from the current square
      visitSquare(x, y, newArea);

      // Save the completed area
      areas.push(newArea);
    }
  }

  return areas;
}

// Function to check if a segment exists
//segmentExists(0, 5, 1, 5);  // Will return true if this segment exists in `drawnPoints`
function segmentExists(x1, y1, x2, y2) {

    // Initialize a 4D array with dimensions based on the grid size
    let gridSegments = new Array(gridSizeX+1).fill(null).map(() =>
        new Array(gridSizeY+1).fill(null).map(() =>
            new Array(gridSizeX+1).fill(null).map(() => new Array(gridSizeY+1).fill(false))
        )
    );

    // Populate the 4D array based on the `drawnPoints` list
    for (let i = 1; i < drawnPoints.length; i++) {
        const x1 = Math.floor(drawnPoints[i - 1].x / squareSize);
        const y1 = Math.floor(drawnPoints[i - 1].y / squareSize);
        const x2 = Math.floor(drawnPoints[i].x / squareSize);
        const y2 = Math.floor(drawnPoints[i].y / squareSize);

        gridSegments[x1][y1][x2][y2] = true;
        gridSegments[x2][y2][x1][y1] = true;  // Optional: if the line can be traversed in both directions
    }

    return gridSegments[x1][y1][x2][y2];
}

function blockExists(x1, y1, x2, y2) {
    const blocksArray = [...levelData[level].blockedLines , ...levelData[level].hiddenLines , ...levelData[level].edgeLines ];

    return blocksArray.some(item => 
        item.x1 === x1 && item.y1 === y1 && 
        item.x2 === x2 && item.y2 === y2
    );
}

function calculateEdge(x1, y1, x2, y2) {
    let edge = {};
    
    // If the squares are adjacent horizontally
    if (y1 === y2) {
        if (x1 < x2) {
            edge.x1 = x2;
            edge.y1 = y1;
            edge.x2 = x2;
            edge.y2 = y1 + 1;
        } else {
            edge.x1 = x1;
            edge.y1 = y1;
            edge.x2 = x1;
            edge.y2 = y1 + 1;
        }
    }
    // If the squares are adjacent vertically
    else if (x1 === x2) {
        if (y1 < y2) {
            edge.x1 = x1;
            edge.y1 = y2;
            edge.x2 = x1 + 1;
            edge.y2 = y2;
        } else {
            edge.x1 = x1;
            edge.y1 = y1;
            edge.x2 = x1 + 1;
            edge.y2 = y1;
        }
    }
    //edge.x1 = edge.x1 -1;
    //edge.y1 = edge.y1 -1;
    //edge.x2 = edge.x2 -1;
    //edge.y2 = edge.y2 -1;
    return edge;
}
