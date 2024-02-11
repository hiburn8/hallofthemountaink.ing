// Low effort features: 
//add proper end position 'tails'
//add rounded line corners
//scale squareSize to viewport for large/small levels
//add fullscreen
//kill game after audio finish

// Fixes:
//find out why level changes are sometimes black (usually when a theme changes) 
//fix abort SFX when starting new level
//fix multiple start locations
//fix multiple end locations
//fix aggressive backtracking player line :line 1433

// High effort features: 
//support Y shapes
//support rotated tetris shapes
//support symmetry
//support inverted/negative tetris shapes
//support audio hexagons

    
        // Initialize canvas and context
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        

        

        // Fullscreen Touch Hacks
        /**
        // Calculate scale factors
        let scaleX = window.innerWidth / canvas.width;
        let scaleY = window.innerHeight / canvas.height;

        // Helper function to dispatch adjusted events
        function dispatchAdjustedEvent(originalEvent, eventName) {
            let adjustedX = originalEvent.clientX / scaleX;
            let adjustedY = originalEvent.clientY / scaleY;

            // Create a new custom event
            let adjustedEvent = new MouseEvent(eventName, {
                clientX: adjustedX,
                clientY: adjustedY,
                bubbles: true,  // This allows the event to bubble up the DOM
                cancelable: true // This allows the event to be cancelable
                
            });

            // Dispatch the new custom event
            canvas.dispatchEvent(adjustedEvent);
        }

        canvas.addEventListener('mousedown', function(e) {
            dispatchAdjustedEvent(e, 'adjustedMousedown');
        });

        canvas.addEventListener('mousemove', function(e) {
            dispatchAdjustedEvent(e, 'adjustedMousemove');
        });

        canvas.addEventListener('mouseup', function(e) {
            dispatchAdjustedEvent(e, 'adjustedMouseup');
        });
        **/
       
        // Fullscreen
        function goFullScreen() {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.mozRequestFullScreen) { /* Firefox */
                canvas.mozRequestFullScreen();
            } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                canvas.webkitRequestFullscreen();
            } else if (canvas.msRequestFullscreen) { /* IE/Edge */
                canvas.msRequestFullscreen();
            }
        }

        function isCanvasFullscreen() {
          return (
            document.fullscreenElement === canvas ||
            document.mozFullScreenElement === canvas ||
            document.webkitFullscreenElement === canvas ||
            document.msFullscreenElement === canvas
          );
        }

        //canvas.addEventListener('dblclick', goFullScreen);
         
        //Disable Default Browser Touch Controls
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false }); 
        // Setting passive to false ensures that we can call preventDefault()

        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, { passive: false });

        // Grid and line styling
        const playerLineColorFail = "#FF0000";
        const playerLineColorFinish = "#FFFFFF";
        const playerLineColorSuccess = "#00FF00";
        
        
        let startColor;
        let bgColor;
        let gridColor;
        let playerLineColor;
        let endColor = '#00FF00';
        let shapeColour;


        const themes = {
          default: {
            startColor: '#2f4f3e',
            endColor: '#00FF00',
            bgColor: '#02b35a',
            gridColor: '#2f4f3e',
            playerLineColor: 'white',
            shapeColour: 'orange'
          },
          green: {
            startColor: '#027b30',
            endColor: '#00FF00',
            bgColor: '#00e255',
            gridColor: '#027b30',
            playerLineColor: 'white',
            shapeColour: 'orange'
          },
          blue: {
            startColor: '#2202ab',
            endColor: '#FFFFFF',
            bgColor: '#5554fe',
            gridColor: '#2202ab',
            playerLineColor: 'white',
            shapeColour: 'orange'
          },
          yellow_basic: {
            startColor: '#594400',
            endColor: 'rgba(0, 0, 0, 0)',
            bgColor: '#f4c000',
            gridColor: '#594400',
            playerLineColor: 'white',
            shapeColour: 'orange'
          },
          yellow: {
            startColor: '#594400',
            endColor: 'white',
            bgColor: '#f4c000',
            gridColor: '#594400',
            playerLineColor: 'white',
            shapeColour: 'orange'
          },
        };


        //applyTheme(themes[levelData[level].theme]);
        function applyTheme(theme = 'default'){

            tm = themes[theme];
            startColor = tm.startColor;
            endColor = tm.endColor;
            bgColor = tm.bgColor;
            gridColor = tm.gridColor;
            playerLineColor = tm.playerLineColor;
            shapeColour = tm.shapeColour;
            document.body.style.backgroundColor = tm.bgColor;
            canvas.style.backgroundColor = tm.bgColor;
            //why not
            document.querySelector('a').style.color = tm.bgColor;
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
        'tetromino_Straight_R90'];
        
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


        //Template
        /**
        grid[0] = [ , , , , ];
        grid[1] = [ , , , , ];
        grid[2] = [ , , , , ];
        grid[3] = [ , , , , ];
        grid[4] = [ , , , , ];
        
    
        //Level 1
        let grid0 = createEmptyGrid(gridSizeX,gridSizeY);
        grid0[0] = [ , , , , , , ];
        grid0[1] = [ , , , , , , ];
        grid0[2] = [ , , , , , , ];
        grid0[3] = [ , , , , , , ];
        grid0[4] = [ , , , , , , ];
        grid0[5] = [ , , , , , , ];
        grid0[6] = [ , , , , , , ];
        grid0[7] = [ , , , , , , ];


        //Level 1
        let grid1 = createEmptyGrid(gridSizeX,gridSizeY);
        grid1[0] = [ , , , , ];
        grid1[1] = [ , , , , ];
        grid1[2] = [ , ,'whitesquare' , , ];
        grid1[3] = [ , , , , ];
        grid1[4] = [ , , , , ];

        //Level 2
        let grid2 = createEmptyGrid(gridSizeX,gridSizeY);
        grid2[0] = [ , , , , ];
        grid2[1] = [ , , , , ];
        grid2[2] = [ , ,'whitesquare' ,'blacksquare', , ];
        grid2[3] = [ , , , , ];
        grid2[4] = [ , , , , ];

        

        // Bit of everything
        let grid3 = createEmptyGrid(gridSizeX,gridSizeY);
        grid3[0] = ['blacksquare', 'tetromino_L_R180', 'domino_R90', , 'whitesquare'];
        grid3[1] = ['redsun', 'doubletriangle', 'tripletriangle', , 'tripletriangle'];
        grid3[2] = [, 'tripletriangle', 'doubletriangle', 'tetromino_Skew_R90', ];
        grid3[3] = [, , , 'doubletriangle', ];
        grid3[4] = ['redsun', 'triangle',,'yellowsun' , 'yellowsun'];

        //All trominoes and tetrominoes
        let grid4 = createEmptyGrid(gridSizeX,gridSizeY);
        grid4[0] = ['tromino_Right','tromino_Right_R90','tromino_Right_R180','tromino_Right_R270','tromino_Straight'];
        grid4[1] = ['tromino_Straight_R90','tetromino_Square','tetromino_L','tetromino_L_R90','tetromino_L_R180'];
        grid4[2] = ['tetromino_L_R270','tetromino_L_FH','tetromino_L_FH_R90','tetromino_L_FH_R180','tetromino_L_FH_R270'];
        grid4[3] = ['tetromino_Skew','tetromino_Skew_R90','tetromino_Skew_FH','tetromino_Skew_FH_R90','tetromino_T'];
        grid4[4] = ['tetromino_T_R90','tetromino_T_R180','tetromino_T_R270','tetromino_Straight','tetromino_Straight_R90'];


        // SAVED
        let grid5 = createEmptyGrid(gridSizeX,gridSizeY);
        grid5[0] = ['blacksquare', 'tetromino_L_R180', , , 'tetromino_Straight_R90', ];
        grid5[1] = ['redsun', 'doubletriangle', 'tripletriangle', , 'tripletriangle','whitesquare'];
        grid5[2] = [, 'tripletriangle', 'doubletriangle', 'tetromino_Skew_R90', ,];
        grid5[3] = [, , , 'doubletriangle', ];
        grid5[4] = ['redsun', 'triangle',,'yellowsun' , 'yellowsun',];
        grid5[5] = [ , , , , , ];
        grid5[6] = [ , , , , , ];
        grid5[7] = [ , , 'tripletriangle', , , ];

        // Bit of everything2
        let grid6 = createEmptyGrid(gridSizeX,gridSizeY);
        grid6[0] = [, 'tetromino_L_R180', 'domino_R90', , ,];
        grid6[1] = [, , , , ,];
        grid6[2] = [, , , 'tetromino_Skew_R90', ,];
        grid6[3] = [, , , , ];
        grid6[4] = [, ,, , ,];
        grid6[5] = [ , , , , , ];
        grid6[6] = [ , , , , , ];
        grid6[7] = [ , , , , , ];



        
        **/

        //let grid = createEmptyGrid(gridSizeX,gridSizeY);
        // Y/X <- this was an accident i will regret
        


        const levelData = [
        
        {
          theme: 'yellow_basic',
          gridSizeX: 3,
          gridSizeY: 1,
          gridName: 'level1',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 1, y1: 0, x2: 1, y2: 1 },
            { x1: 2, y1: 0, x2: 2, y2: 1 },
            { x1: 3, y1: 0, x2: 3, y2: 1 },
            { x1: 0, y1: 1, x2: 1, y2: 1 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },
            { x1: 2, y1: 1, x2: 3, y2: 1 },
          ],
          hexagons: [],
          startingPoint: { x: 3, y: 0 },
          endingPoint: { x: 0, y: 0 }
        },
        {
          theme: 'yellow_basic',
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level2',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 0, y1: 1, x2: 0, y2: 2 },
            { x1: 0, y1: 2, x2: 0, y2: 3 },
            { x1: 1, y1: 0, x2: 1, y2: 1 },
            { x1: 1, y1: 1, x2: 1, y2: 2 },
            { x1: 1, y1: 2, x2: 1, y2: 3 },
            { x1: 2, y1: 0, x2: 2, y2: 1 },
            { x1: 2, y1: 1, x2: 2, y2: 2 },
            { x1: 2, y1: 2, x2: 2, y2: 3 },
            { x1: 0, y1: 0, x2: 1, y2: 0 },
            { x1: 1, y1: 0, x2: 2, y2: 0 },
            { x1: 2, y1: 0, x2: 3, y2: 0 },
            { x1: 0, y1: 1, x2: 1, y2: 1 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },
            { x1: 2, y1: 1, x2: 3, y2: 1 },
            { x1: 0, y1: 2, x2: 1, y2: 2 },
            { x1: 1, y1: 2, x2: 2, y2: 2 },
            { x1: 2, y1: 2, x2: 3, y2: 2 },

          ],
          hexagons: [],
          startingPoint: { x: 3, y: 0 },
          endingPoint: { x: 0, y: 3 }
        },
        {
          theme: 'yellow',
          gridSizeX: 4,
          gridSizeY: 4,
          gridName: 'level3',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 1, y1: 0, x2: 1, y2: 1 },
            { x1: 2, y1: 0, x2: 2, y2: 1 },
            { x1: 3, y1: 0, x2: 3, y2: 1 },
            { x1: 4, y1: 0, x2: 4, y2: 1 },
            { x1: 0, y1: 1, x2: 0, y2: 2 },
            { x1: 1, y1: 2, x2: 1, y2: 3 },
            { x1: 3, y1: 2, x2: 3, y2: 3 },
            { x1: 0, y1: 3, x2: 0, y2: 4 },
            { x1: 4, y1: 3, x2: 4, y2: 4 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },
            { x1: 3, y1: 1, x2: 4, y2: 1 },
            { x1: 0, y1: 3, x2: 1, y2: 3 },
            { x1: 1, y1: 4, x2: 2, y2: 4 },
            { x1: 3, y1: 2, x2: 4, y2: 2 },

          ],
          hexagons: [],
          startingPoint: { x: 0, y: 4 },
          endingPoint: { x: 4, y: 0 }
        },
        {
          theme: 'yellow',
          gridSizeX: 6,
          gridSizeY: 6,
          gridName: 'level4',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 1, y1: 0, x2: 1, y2: 1 },
            { x1: 0, y1: 1, x2: 1, y2: 1 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },
            { x1: 2, y1: 1, x2: 2, y2: 2 },
            { x1: 3, y1: 1, x2: 3, y2: 2 },
            { x1: 4, y1: 1, x2: 4, y2: 2 },
            { x1: 5, y1: 1, x2: 5, y2: 2 },
            { x1: 0, y1: 5, x2: 1, y2: 5 },
            { x1: 1, y1: 5, x2: 2, y2: 5 },
            { x1: 2, y1: 5, x2: 3, y2: 5 },
            { x1: 4, y1: 5, x2: 5, y2: 5 },
            { x1: 2, y1: 2, x2: 3, y2: 2 },
            { x1: 3, y1: 2, x2: 3, y2: 3 },
            { x1: 5, y1: 2, x2: 5, y2: 3 },
            { x1: 4, y1: 3, x2: 5, y2: 3 },
            { x1: 5, y1: 3, x2: 6, y2: 3 },
            { x1: 5, y1: 4, x2: 6, y2: 4 },
            { x1: 3, y1: 3, x2: 3, y2: 4 },
            { x1: 4, y1: 3, x2: 4, y2: 4 },
            { x1: 1, y1: 3, x2: 2, y2: 3 },
            { x1: 1, y1: 4, x2: 2, y2: 4 },
            { x1: 2, y1: 0, x2: 3, y2: 0 },
            { x1: 4, y1: 0, x2: 5, y2: 0 },
            { x1: 3, y1: 1, x2: 4, y2: 1 },
            { x1: 5, y1: 1, x2: 6, y2: 1 },
            { x1: 0, y1: 2, x2: 1, y2: 2 },
            { x1: 0, y1: 3, x2: 1, y2: 3 },
            { x1: 0, y1: 3, x2: 0, y2: 4 },
            { x1: 0, y1: 4, x2: 0, y2: 5 },
            { x1: 2, y1: 4, x2: 2, y2: 5 },
            { x1: 6, y1: 4, x2: 6, y2: 5 },
            { x1: 1, y1: 5, x2: 1, y2: 6 },
            { x1: 3, y1: 5, x2: 3, y2: 6 },
            { x1: 4, y1: 5, x2: 4, y2: 6 },
            { x1: 5, y1: 5, x2: 5, y2: 6 },
          ],
          hexagons: [],
          startingPoint: { x: 4, y: 4 },
          endingPoint: { x: 2, y: 0 }
        }
        ,
          {
          theme: 'yellow',
          gridSizeX: 10,
          gridSizeY: 10,
          gridName: 'level5',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 1, y1: 0, x2: 2, y2: 0 },
            { x1: 3, y1: 0, x2: 4, y2: 0 },
            { x1: 6, y1: 0, x2: 7, y2: 0 },

            { x1: 3, y1: 0, x2: 3, y2: 1 },
            { x1: 0, y1: 1, x2: 1, y2: 1 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },
            { x1: 2, y1: 1, x2: 3, y2: 1 },
          ],
          hexagons: [],
          startingPoint: { x: 3, y: 0 },
          endingPoint: { x: 0, y: 0 }
        }
        
        ,
        //Blue row
        {
          theme: 'blue',
          gridSizeX: 1,
          gridSizeY: 2,
          gridName: 'level6',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'whitesquare' }],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 1 },
          endingPoint: { x: 1, y: 1 }
        },
        {
          theme: 'blue',
          gridSizeX: 1,
          gridSizeY: 2,
          gridName: 'level7',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'whitesquare' }],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 2 },
          endingPoint: { x: 1, y: 0 }
        },
        {
          theme: 'blue',
          gridSizeX: 1,
          gridSizeY: 3,
          gridName: 'level8',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'blacksquare' },
            { x: 0, y: 2, value: 'whitesquare' }],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 3 },
          endingPoint: { x: 1, y: 0 }
        },
        {
          theme: 'blue',
          gridSizeX: 2,
          gridSizeY: 2,
          gridName: 'level9',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'blacksquare' },
            { x: 1, y: 0, value: 'blacksquare' },
            { x: 1, y: 1, value: 'whitesquare' }],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 2 },
          endingPoint: { x: 2, y: 0 }
        },
        {
          theme: 'blue',
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level10',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 1, y: 0, value: 'blacksquare' },
            { x: 2, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'blacksquare' },
            { x: 1, y: 1, value: 'whitesquare' },
            { x: 2, y: 1, value: 'blacksquare' },
            { x: 0, y: 2, value: 'whitesquare' },
            { x: 1, y: 2, value: 'whitesquare' },
            { x: 2, y: 2, value: 'whitesquare' }],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 3 },
          endingPoint: { x: 3, y: 0 }
        },
               {
          theme: 'blue',
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level11',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 1, y: 0, value: 'blacksquare' },
            { x: 2, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'blacksquare' },
            { x: 1, y: 1, value: 'whitesquare' },
            { x: 2, y: 1, value: 'blacksquare' },
            { x: 0, y: 2, value: 'whitesquare' },
            { x: 1, y: 2, value: 'whitesquare' },
            { x: 2, y: 2, value: 'whitesquare' }],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 3 },
          endingPoint: { x: 0, y: 2 }
        },
        {
          theme: 'blue',
          gridSizeX: 4,
          gridSizeY: 4,
          gridName: 'level12',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },{ x: 2, y: 0, value: 'whitesquare' },{ x: 3, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'blacksquare' },{ x: 1, y: 1, value: 'blacksquare' },{ x: 2, y: 1, value: 'blacksquare' },{ x: 3, y: 1, value: 'blacksquare' },
            { x: 0, y: 2, value: 'blacksquare' },{ x: 1, y: 2, value: 'whitesquare' },{ x: 2, y: 2, value: 'blacksquare' },{ x: 3, y: 2, value: 'blacksquare' },
            { x: 0, y: 3, value: 'whitesquare' },{ x: 1, y: 3, value: 'whitesquare' },{ x: 2, y: 3, value: 'whitesquare' },{ x: 3, y: 3, value: 'blacksquare' },
            ],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 4 },
          endingPoint: { x: 1, y: 0 }
        },
        {
          theme: 'blue',
          gridSizeX: 4,
          gridSizeY: 4,
          gridName: 'level13',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },{ x: 1, y: 0, value: 'blacksquare' },{ x: 2, y: 0, value: 'whitesquare' },{ x: 3, y: 0, value: 'blacksquare' },
            { x: 1, y: 1, value: 'blacksquare' },{ x: 2, y: 1, value: 'blacksquare' },{ x: 3, y: 1, value: 'blacksquare' },
            { x: 0, y: 2, value: 'blacksquare' },{ x: 1, y: 2, value: 'whitesquare' },{ x: 2, y: 2, value: 'blacksquare' },{ x: 3, y: 2, value: 'blacksquare' },
            { x: 0, y: 3, value: 'whitesquare' },{ x: 1, y: 3, value: 'whitesquare' },{ x: 2, y: 3, value: 'whitesquare' },{ x: 3, y: 3, value: 'blacksquare' },
            ],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 4 },
          endingPoint: { x: 4, y: 2 }
        },
        {
          theme: 'blue',
          gridSizeX: 4,
          gridSizeY: 4,
          gridName: 'level14',
          puzzles: [
            { x: 1, y: 0, value: 'blacksquare' },{ x: 2, y: 0, value: 'whitesquare' },{ x: 3, y: 0, value: 'blacksquare' },
            { x: 0, y: 1, value: 'blacksquare' },{ x: 3, y: 1, value: 'blacksquare' },
            { x: 0, y: 2, value: 'blacksquare' },{ x: 1, y: 2, value: 'whitesquare' },{ x: 2, y: 2, value: 'blacksquare' },
            { x: 0, y: 3, value: 'whitesquare' },{ x: 1, y: 3, value: 'whitesquare' },{ x: 2, y: 3, value: 'whitesquare' },{ x: 3, y: 3, value: 'blacksquare' },
            ],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 4 },
          endingPoint: { x: 3, y: 4 }
        },
        
        //Greenshed
        {
          theme: 'green',
          gridSizeX: 2,
          gridSizeY: 2,
          gridName: 'level15',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [
            { x: 0, y: 0 },
            { x: 4, y: 4 },],
          startingPoint: { x: 0, y: 2 },
          endingPoint: { x: 2, y: 0 }
        },
        {
          theme: 'green',
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level16',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 0, y1: 0, x2: 1, y2: 0 },
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 2, y1: 1, x2: 3, y2: 1 },
            { x1: 2, y1: 2, x2: 2, y2: 3 },],
          hexagons: [
            { x: 2, y: 0 },
            { x: 4, y: 2 },
            { x: 0, y: 4 },
            { x: 2, y: 4 },
            { x: 6, y: 6 },
            ],
          startingPoint: { x: 0, y: 3 },
          endingPoint: { x: 3, y: 0 }
        },
        {
          theme: 'green',
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level17',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 0, y1: 0, x2: 1, y2: 0 },
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 2, y1: 1, x2: 3, y2: 1 },
            { x1: 2, y1: 2, x2: 2, y2: 3 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },],
          hexagons: [
            { x: 2, y: 0 },
            { x: 4, y: 2 },
            { x: 0, y: 4 },
            { x: 2, y: 4 },
            { x: 6, y: 6 },
            ],
          startingPoint: { x: 0, y: 3 },
          endingPoint: { x: 3, y: 0 }
        },
        
        {
          theme: 'green',
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level18',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 0, y1: 0, x2: 1, y2: 0 },
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 2, y1: 1, x2: 3, y2: 1 },
            { x1: 2, y1: 2, x2: 2, y2: 3 },
            { x1: 1, y1: 1, x2: 2, y2: 1 },],
          hexagons: [
            { x: 2, y: 0 },
            { x: 4, y: 2 },
            { x: 6, y: 2 },
            { x: 0, y: 4 },
            { x: 2, y: 4 },
            { x: 6, y: 6 },
            ],
          startingPoint: { x: 1, y: 2 },
          endingPoint: { x: 3, y: 0 }
        },
        
        {
          theme: 'yellow',
          gridSizeX: 3,
          gridSizeY: 2,
          gridName: 'level0',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [
            { x1: 0, y1: 0, x2: 1, y2: 0 },
            { x1: 1, y1: 0, x2: 2, y2: 0 },
            { x1: 2, y1: 0, x2: 3, y2: 0 },

            { x1: 0, y1: 2, x2: 1, y2: 2 },
            { x1: 1, y1: 2, x2: 2, y2: 2 },
            { x1: 2, y1: 2, x2: 3, y2: 2 },

            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 1, y1: 0, x2: 1, y2: 1 },
            { x1: 2, y1: 0, x2: 2, y2: 1 },

            { x1: 1, y1: 1, x2: 1, y2: 2 },
            { x1: 2, y1: 1, x2: 2, y2: 2 },
            { x1: 3, y1: 1, x2: 3, y2: 2 },


          ],
          hexagons: [],
          startingPoint: { x: 3, y: 0 },
          endingPoint: { x: 0, y: 2 }
        },

        {
          gridSizeX: 2,
          gridSizeY: 2,
          gridName: 'level0',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 0 },
          endingPoint: { x: 2, y: 2 }
        },

        {
          gridSizeX: 3,
          gridSizeY: 3,
          gridName: 'level0',
          puzzles: [],
          blockedLines: [],
          hiddenLines: [],
          hexagons: [],
          startingPoint: { x: 0, y: 0 },
          endingPoint: { x: 3, y: 3 }
        },

        {
          gridSizeX: 5,
          gridSizeY: 7,
          gridName: 'level1',
          puzzles: [
            { x: 0, y: 0, value: 'blacksquare' },
            { x: 1, y: 0, value: 'tetromino_L_R180' },
            { x: 2, y: 0, value: 'domino_R90' },
            { x: 4, y: 0, value: 'whitesquare' },
            { x: 0, y: 1, value: 'redsun' },
            { x: 1, y: 1, value: 'doubletriangle' },
            { x: 2, y: 1, value: 'tripletriangle' },
            { x: 4, y: 1, value: 'tripletriangle' },
            { x: 1, y: 2, value: 'tripletriangle' },
            { x: 2, y: 2, value: 'doubletriangle' },
            { x: 3, y: 2, value: 'tetromino_Skew_R90' },
            { x: 3, y: 3, value: 'doubletriangle' },
            { x: 0, y: 4, value: 'redsun' },
            { x: 1, y: 4, value: 'triangle' },
            { x: 3, y: 4, value: 'yellowsun' },
            { x: 4, y: 4, value: 'yellowsun' },

            ],
          blockedLines: [
            { x1: 3, y1: 3, x2: 3, y2: 4 },
            { x1: 2, y1: 4, x2: 2, y2: 5 }
          ],
          hiddenLines: [],
          hexagons: [
            { x: 3, y: 12 },
            { x: 4, y: 12 },
            { x: 5, y: 12 },
            { x: 7, y: 10 },
            { x: 10, y: 13 },
          ],
          startingPoint: { x: 0, y: 5 },
          endingPoint: { x: 5, y: 0 },
        },

        {
          gridSizeX: 9,
          gridSizeY: 9,
          gridName: 'level2',
          puzzles: [
            { x: 2, y: 2, value: 'whitesquare' },
            { x: 2, y: 3, value: 'whitesquare' },],
          blockedLines: [
            { x1: 3, y1: 3, x2: 3, y2: 4 },
            { x1: 2, y1: 4, x2: 2, y2: 5 },
          ],
          hiddenLines: [],
          hexagons: [
            { x: 1, y: 12 },
            { x: 2, y: 12 },
            { x: 5, y: 12 },
            { x: 7, y: 10 },
            { x: 10, y: 13 },
          ],
          startingPoint: { x: 0, y: 5 },
          endingPoint: { x: 5, y: 0 },
        },

        ];

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
        let startingPoint;
        let endingPoint;
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

        function loadLevel(n){


            applyTheme(levelData[n].theme);

            grid = convertToMultidimensional(levelData[n].puzzles, levelData[n].gridSizeX,levelData[n].gridSizeY);

            gridSizeX = levelData[n].gridSizeX;
            gridSizeY = levelData[n].gridSizeY;
            
            hexagons = levelData[n].hexagons;
            startingPoint = levelData[n].startingPoint;
            endingPoint = levelData[n].endingPoint;
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
            for (let i = 0; i < levelData[n].blockedLines.length; i++){
                blockedLines[levelData[n].blockedLines[i].x1][levelData[n].blockedLines[i].y1][levelData[n].blockedLines[i].x2][levelData[n].blockedLines[i].y2] = 1;
            }

            //Set up hidden lines structure. pretty, but needs impossible lines pruning. i.e. [0][0][0][5]
            hiddenLines = Array.from({ length: gridSizeX + 1 }, () =>
              Array.from({ length: gridSizeY + 1 }, () =>
                Array.from({ length: gridSizeX + 1 }, () =>
                  Array.from({ length: gridSizeY + 1 }, () => 0)
                )
              )
            );
            for (let i = 0; i < levelData[n].hiddenLines.length; i++){
                hiddenLines[levelData[n].hiddenLines[i].x1][levelData[n].hiddenLines[i].y1][levelData[n].hiddenLines[i].x2][levelData[n].hiddenLines[i].y2] = 1;
            }
            
        } 
        

        loadLevel(level);

        

        // Drawing state variables
        let isDrawing = false;
        let lastPoint = null;
        let completed = false;
        
        let drawnPoints = [];

        function drawCorner(x, y){
            ctx.beginPath();
            ctx.arc(x*squareSize, y*squareSize, 0.1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        // Function to draw the grid and points
        const drawGridAndPoints = () => {

            ctx.clearRect(0 -offset, 0 -offset, canvas.width +offset, canvas.height +offset);
            ctx.strokeStyle = gridColor;

            for (let i = 0; i <= gridSizeX -1; i++) {
                for (let j = 0; j <= gridSizeY-1; j++) {
                
                    // Draw top edge
                    if (!hiddenLines[i][j][i+1][j]) {
                        drawCorner(i,j);
                        drawCorner(i+1,j);
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize, j * squareSize);
                        ctx.lineTo(i * squareSize + squareSize, j * squareSize);
                        ctx.stroke();
                    }

                    // Draw right edge
                    if (!hiddenLines[i+1][j][i+1][j+1]) {
                        drawCorner(i+1,j);
                        drawCorner(i+1,j+1);
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize + squareSize, j * squareSize);
                        ctx.lineTo(i * squareSize + squareSize, j * squareSize + squareSize);
                        ctx.stroke();
                    }

                    // Draw bottom edge
                    if (!hiddenLines[i][j+1][i+1][j+1]) {
                        drawCorner(i,j+1);
                        drawCorner(i+1,j+1);
                        ctx.beginPath();
                        ctx.moveTo(i * squareSize, j * squareSize + squareSize);
                        ctx.lineTo(i * squareSize + squareSize, j * squareSize + squareSize);
                        ctx.stroke();
                    }

                    // Draw left edge
                    if (!hiddenLines[i][j][i][j+1]) {
                        drawCorner(i,j);
                        drawCorner(i,j+1);
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
            
            
            ctx.fillStyle = (isDrawing ? playerLineColor : (completed ? playerLineColorSuccess : startColor));
            ctx.beginPath();
            ctx.arc(startingPoint.x * squareSize, startingPoint.y * squareSize, startSize, 0, 2 * Math.PI);
            ctx.fill();

            
            // End
            ctx.fillStyle = (endColor === 'rgba(0, 0, 0, 0)') ? endColor : (completed ? playerLineColorSuccess : endColor); 
            ctx.beginPath();
            ctx.arc(endingPoint.x * squareSize, endingPoint.y * squareSize, endSize, 0, 2 * Math.PI);
            ctx.fill();


            // Draw puzzle elements
            for (let row = 0; row < gridSizeY; row++) {
              for (let col = 0; col < gridSizeX; col++) {
                  const element = grid[row][col];
                  const x = (col + 0.5) * squareSize;
                  const y = (row + 0.5) * squareSize;
                  const triangleSize = 20; // Adjust the size as needed

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
                  
                  else if (element === 'blacksquare') {
                      drawRoundedSquare(x, y, 'black');
                  }
                  
                  else if (element === 'whitesquare') {
                      drawRoundedSquare(x, y, 'white');
                  }
                  else if (element === 'yellowsun'){
                    drawSun(x, y, "yellow");
                  }
                  else if (element === 'redsun'){
                    drawSun(x, y, "red");
                  }
                  else if (tetrisShapes.includes(element)) {
                    drawTetrisShape(x, y, tetrisString2Shape(element));
                  }
                  
              }
            }

            // Draw Bestigons
            for (const hexagon of hexagons) {
                drawHexagon(hexagon.x * (squareSize/2), hexagon.y * (squareSize/2), 8);
            }

        };
        
        

// Function to check if the user-drawn line meets the success criteria
let failed = {};
const validateLine = () => {
    let isValid = true;
    failed = {};

    const puzzlesInAreas = getPuzzlesInAreas();

    //Validate Line
    if (!(Array.isArray(drawnPoints)) || (drawnPoints.length === 0) || 
        (drawnPoints[0].x /100 != levelData[level].startingPoint.x) || (drawnPoints[0].y /100 != levelData[level].startingPoint.y) || 
        (drawnPoints[drawnPoints.length - 1].y /100 != levelData[level].endingPoint.y) || (drawnPoints[drawnPoints.length - 1].y /100 != levelData[level].endingPoint.y)){
        isValid = false;
        console.log("failed line!");
    }

    //Validate Hexagons
    if (checkHexagons(hexagons).length != 0){
        isValid = false;
        console.log("failed hexagons!");
    }
        //Validate Trianges
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
        level ++;



        playSFX("success");
        redrawCanvas();



        

    } else {
        
        //console.log(failed);
        playSFX("failure");
            
        redrawInvalidLine();
        
        // Clear the line after a short delay
        setTimeout(() => {
            drawnPoints.length = 0;
            lastPoint = null;
            drawGridAndPoints();
        }, 1000);  // 1 second delay
        
    }
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
            ctx.arc(startingPoint.x * squareSize, startingPoint.y * squareSize, startSize, 0, 2 * Math.PI);
            ctx.fill();

        ctx.fillStyle = (endColor === 'rgba(0, 0, 0, 0)') ? endColor : color;
            ctx.beginPath();
            ctx.arc(endingPoint.x * squareSize, endingPoint.y * squareSize, endSize, 0, 2 * Math.PI);
            ctx.fill();

        // Disable shadow blur effect
        ctx.shadowBlur = 0;
    }

    // Schedule the next frame
    animationId = requestAnimationFrame(animate);
    
}

const redrawInvalidLine = () => {
    for (let i = 1; i < drawnPoints.length; i++) {
        drawLine(drawnPoints[i - 1], drawnPoints[i], playerLineColorFail);  // Red for invalid
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
    drawGridAndPoints(); // You already have this, presumably

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
        drawGridAndPoints();

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
            drawGridAndPoints();
            for (let i = 0; i < drawnPoints.length - 1; i++) {
                drawLine(drawnPoints[i], drawnPoints[i + 1], playerLineColor);
            }
        };


        // Function to get mouse coordinates relative to the canvas
            function getAdjustedMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left - (squareSize/2); // Adjust for translation
            let y = e.clientY - rect.top - (squareSize/2); // Adjust for translation

            //Adjust for fullscreen scalefactor
            if (isCanvasFullscreen()){
                //Does not work.
                //x = (viewportWidth - canvas.width * scaleX) / 2;;
                //y = (viewportHeight - canvas.height * scaleX) / 2;
                //drawHexagon(x,y,20);
            }

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
            if (closestPoint.x === startingPoint.x * squareSize && closestPoint.y === startingPoint.y * squareSize) {
                playSFX("start");
                isDrawing = true;
                lastPoint = closestPoint;
                drawnPoints.push(lastPoint);
            }
        });

        canvas.addEventListener('mouseup', (e) => {
            cancelAnimationFrame(animationId);
            animationId = null;

            offsetMousePos = getAdjustedMousePos(e);

            const currentPoint = getClosestPoint(offsetMousePos.x, offsetMousePos.y);
            if (currentPoint.x !== endingPoint.x * squareSize || currentPoint.y !== endingPoint.y * squareSize) {
                playSFX("abort");
                isDrawing = false;
                lastPoint = null;
                drawnPoints.length = 0;
                drawGridAndPoints();
            } else {
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
            
            
            const dx = Math.abs(currentPoint.x - lastPoint.x);
            const dy = Math.abs(currentPoint.y - lastPoint.y);
                        
            // Prevent diagonal lines
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
            if (x2 === endingPoint.x && y2 === endingPoint.y) {
                drawFinishLine();
                if (!soundPlayed) {
                    playSFX("finish");
                    soundPlayed = true;
                }
            } else {
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
        break;
    }
    fx.play();
}
function findAreas() {   
    let visited = new Array(gridSizeX).fill(null).map(() => new Array(gridSizeY).fill(false));     
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
      if (segmentExists(edge.x1,edge.y1,edge.x2,edge.y2)) {
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
        const x1 = Math.floor(drawnPoints[i - 1].x / 100);
        const y1 = Math.floor(drawnPoints[i - 1].y / 100);
        const x2 = Math.floor(drawnPoints[i].x / 100);
        const y2 = Math.floor(drawnPoints[i].y / 100);

        gridSegments[x1][y1][x2][y2] = true;
        gridSegments[x2][y2][x1][y1] = true;  // Optional: if the line can be traversed in both directions
    }

    return gridSegments[x1][y1][x2][y2];
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
