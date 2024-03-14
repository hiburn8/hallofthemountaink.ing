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
        

let id = 0;
function getID(){
  return id++;
}
const levelData = [

//Breakout
{
  location: 'Starting Area',
  level: getID(),
  theme: 'yellow_basic',
  gridSizeX: 3,
  gridSizeY: 1,
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
  startingPoints: [{ x: 3, y: 0 }],
  endingPoints: [{ x: 0, y: 0 }],
  endingPoint: { x: 0, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'yellow_basic',
  gridSizeX: 3,
  gridSizeY: 3,
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
  startingPoints: [{ x: 3, y: 0 }],
  endingPoints: [{ x: 0, y: 3 }],
  endingPoint: { x: 0, y: 3 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'yellow',
  gridSizeX: 4,
  gridSizeY: 4,
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
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 }
},

{
  location: 'Starting Area',
  level: getID(),
  theme: 'yellow',
  gridSizeX: 6,
  gridSizeY: 6,
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
  startingPoints: [{ x: 4, y: 4 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 }
}
,

  {
  location: 'Starting Area',
  level: getID(),
  theme: 'yellow',
  gridSizeX: 6,
  gridSizeY: 6,
  puzzles: [],
  blockedLines: [
    { x1: 0, y1: 0, x2: 1, y2: 0 },
    { x1: 2, y1: 0, x2: 3, y2: 0 },
    { x1: 3, y1: 0, x2: 4, y2: 0 },
    { x1: 0, y1: 1, x2: 1, y2: 1 },
    { x1: 3, y1: 1, x2: 4, y2: 1 },
    { x1: 0, y1: 2, x2: 1, y2: 2 },
    { x1: 2, y1: 2, x2: 3, y2: 2 },
    { x1: 1, y1: 3, x2: 2, y2: 3 },
    { x1: 3, y1: 3, x2: 4, y2: 3 },
    { x1: 3, y1: 4, x2: 4, y2: 4 },
    { x1: 4, y1: 4, x2: 5, y2: 4 },
    { x1: 1, y1: 5, x2: 2, y2: 5 },
    { x1: 4, y1: 5, x2: 5, y2: 5 },
    { x1: 2, y1: 6, x2: 3, y2: 6 },
    { x1: 4, y1: 6, x2: 5, y2: 6 },
    { x1: 4, y1: 0, x2: 4, y2: 1 },
    { x1: 5, y1: 0, x2: 5, y2: 1 },
    { x1: 2, y1: 1, x2: 2, y2: 2 },
    { x1: 3, y1: 1, x2: 3, y2: 2 },
    { x1: 5, y1: 1, x2: 6, y2: 2 },
    { x1: 1, y1: 2, x2: 1, y2: 3 },
    { x1: 4, y1: 2, x2: 4, y2: 3 },
    { x1: 5, y1: 2, x2: 5, y2: 3 },
    { x1: 2, y1: 3, x2: 2, y2: 4 },
    { x1: 3, y1: 3, x2: 3, y2: 4 },
    { x1: 6, y1: 3, x2: 6, y2: 4 },
    { x1: 1, y1: 4, x2: 1, y2: 5 },
    { x1: 4, y1: 4, x2: 4, y2: 5 },
    { x1: 5, y1: 4, x2: 5, y2: 5 },

     ],
  hiddenLines: [

  ],
  hexagons: [],
  startingPoints: [
    { x: 0, y: 6 },
    { x: 6, y: 6 },
    ],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},

//          {
//          theme: 'yellow',
//          gridSizeX: 10,
//          gridSizeY: 10,
//          gridName: 'level5',
//          puzzles: [],
//          blockedLines: [],
//          hiddenLines: [
//            { x1: 1, y1: 0, x2: 2, y2: 0 },
//            { x1: 3, y1: 0, x2: 4, y2: 0 },
//            { x1: 6, y1: 0, x2: 7, y2: 0 },
//
//            { x1: 1, y1: 1, x2: 1, y2: 2 },
//            { x1: 0, y1: 1, x2: 1, y2: 1 },
//             { x1: 2, y1: 1, x2: 2, y2: 2 },
//             { x1: 2, y1: 0, x2: 2, y2: 1 },
//            
//          ],
//          hexagons: [],
//          startingPoints: [{ x: 0, y: 0 }],
//          endingPoint: { x: 10, y: 0 }
//        },
      
//Blue Tutorial Levels
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 1,
  gridSizeY: 2,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'whitesquare' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 1 }],
  endingPoints: [{ x: 1, y: 1 }],
  endingPoint: { x: 1, y: 1 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 1,
  gridSizeY: 2,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'whitesquare' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 2 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 1,
  gridSizeY: 3,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'whitesquare' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 2,
  gridSizeY: 2,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 1, y: 0, value: 'blacksquare' },
    { x: 1, y: 1, value: 'whitesquare' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 2 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 3,
  gridSizeY: 3,
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
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 3,
  gridSizeY: 3,
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
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 0, y: 2 }],
  endingPoint: { x: 0, y: 2 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },{ x: 2, y: 0, value: 'whitesquare' },{ x: 3, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },{ x: 1, y: 1, value: 'blacksquare' },{ x: 2, y: 1, value: 'blacksquare' },{ x: 3, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'blacksquare' },{ x: 1, y: 2, value: 'whitesquare' },{ x: 2, y: 2, value: 'blacksquare' },{ x: 3, y: 2, value: 'blacksquare' },
    { x: 0, y: 3, value: 'whitesquare' },{ x: 1, y: 3, value: 'whitesquare' },{ x: 2, y: 3, value: 'whitesquare' },{ x: 3, y: 3, value: 'blacksquare' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },{ x: 1, y: 0, value: 'blacksquare' },{ x: 2, y: 0, value: 'whitesquare' },{ x: 3, y: 0, value: 'blacksquare' },
    { x: 1, y: 1, value: 'blacksquare' },{ x: 2, y: 1, value: 'blacksquare' },{ x: 3, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'blacksquare' },{ x: 1, y: 2, value: 'whitesquare' },{ x: 2, y: 2, value: 'blacksquare' },{ x: 3, y: 2, value: 'blacksquare' },
    { x: 0, y: 3, value: 'whitesquare' },{ x: 1, y: 3, value: 'whitesquare' },{ x: 2, y: 3, value: 'whitesquare' },{ x: 3, y: 3, value: 'blacksquare' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 2 }],
  endingPoint: { x: 4, y: 2 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'blue',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 1, y: 0, value: 'blacksquare' },{ x: 2, y: 0, value: 'whitesquare' },{ x: 3, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },{ x: 3, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'blacksquare' },{ x: 1, y: 2, value: 'whitesquare' },{ x: 2, y: 2, value: 'blacksquare' },
    { x: 0, y: 3, value: 'whitesquare' },{ x: 1, y: 3, value: 'whitesquare' },{ x: 2, y: 3, value: 'whitesquare' },{ x: 3, y: 3, value: 'blacksquare' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 3, y: 4 }],
  endingPoint: { x: 3, y: 4 }
},

//Greenshed
{
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 2,
  gridSizeY: 2,
  puzzles: [],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [
    { x: 0, y: 0 },
    { x: 4, y: 4 },],
  startingPoints: [{ x: 0, y: 2 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 3,
  gridSizeY: 3,
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
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 3,
  gridSizeY: 3,
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
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},

{
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 3,
  gridSizeY: 3,
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
    { x: 6, y: 2 },
    { x: 0, y: 4 },
    { x: 2, y: 4 },
    { x: 6, y: 6 },
    ],
  startingPoints: [
    { x: 1, y: 1 },
    { x: 2, y: 2 }],
  endingPoints: [{ x: 0, y: 1 }],
  endingPoint: { x: 0, y: 1 }
},
{
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 3,
  gridSizeY: 3,
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
    { x: 6, y: 2 },
    { x: 0, y: 4 },
    { x: 2, y: 4 },
    { x: 6, y: 6 },
    ],
  startingPoints: [
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 3, y: 2 }],
  endingPoints: [{ x: 0, y: 1 }],
  endingPoint: { x: 0, y: 1 }
},
//StartAreaSecrets
{
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [],
  blockedLines: [{ x1: 2, y1: 0, x2: 3, y2: 0 }],
  hiddenLines: [],
  hexagons: [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
    { x: 0, y: 4 },
    { x: 0, y: 6 },
    { x: 0, y: 8 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 2, y: 4 },
    { x: 2, y: 6 },
    { x: 2, y: 8 },
    { x: 4, y: 0 },
    { x: 4, y: 2 },
    { x: 4, y: 6 },
    { x: 4, y: 8 },
    { x: 6, y: 0 },
    { x: 6, y: 2 },
    { x: 6, y: 4 },
    { x: 6, y: 6 },
    { x: 6, y: 8 },
    { x: 8, y: 2 },
    { x: 8, y: 4 },
    { x: 8, y: 6 },
    { x: 8, y: 8 }],
  startingPoints: [{ x: 2, y: 2 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 }
},

{
  location: 'Starting Area',
  level: getID(),
  theme: 'grey',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [{ x: 0, y: 2, value: 'triangle' },],
  blockedLines: [
    { x1: 0, y1: 0, x2: 0, y2: 1 },
    { x1: 2, y1: 0, x2: 2, y2: 0 },
    { x1: 3, y1: 0, x2: 3, y2: 1 },
    { x1: 2, y1: 1, x2: 3, y2: 1 },
    { x1: 2, y1: 1, x2: 2, y2: 2 },
    { x1: 1, y1: 3, x2: 2, y2: 3 }],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},

    {
  location: 'Starting Area',
  level: getID(),
  theme: 'green',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [],
  blockedLines: [
    { x1: 1, y1: 0, x2: 1, y2: 1 },
    { x1: 1, y1: 3, x2: 1, y2: 4 }],
  hiddenLines: [],
  hexagons: [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
    { x: 0, y: 4 },
    { x: 0, y: 6 },
    { x: 0, y: 8 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 2, y: 4 },
    { x: 2, y: 6 },
    { x: 2, y: 8 },
    { x: 4, y: 0 },
    { x: 4, y: 2 },
    { x: 4, y: 6 },
    { x: 4, y: 8 },
    { x: 6, y: 0 },
    { x: 6, y: 2 },
    { x: 6, y: 4 },
    { x: 6, y: 6 },
    { x: 6, y: 8 },
    { x: 8, y: 2 },
    { x: 8, y: 4 },
    { x: 8, y: 6 },
    { x: 8, y: 8 }],
  startingPoints: [{ x: 2, y: 2 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 }
},

//Tetris
{
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 1,
  gridSizeY: 1,
  puzzles: [{ x: 0, y: 0, value: 'monomino' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 1 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 1,
  gridSizeY: 2,
  puzzles: [{ x: 0, y: 1, value: 'monomino' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 2 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 1,
  gridSizeY: 3,
  puzzles: [{ x: 0, y: 2, value: 'monomino' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 1,
  gridSizeY: 3,
  puzzles: [{ x: 0, y: 2, value: 'domino' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 2,
  gridSizeY: 2,
  puzzles: [{ x: 0, y: 1, value: 'tromino_Right_R90' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 2 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [{ x: 1, y: 1, value: 'tetromino_Square' }],
  blockedLines: [
    { x1: 2, y1: 1, x2: 3, y2: 1 },
    { x1: 1, y1: 2, x2: 2, y2: 2 },
    { x1: 2, y1: 3, x2: 3, y2: 3 }
    ],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 5,
  gridSizeY: 5,
  puzzles: [{ x: 2, y: 2, value: 'tetromino_L_FH_R180' }],
  blockedLines: [
    { x1: 2, y1: 0, x2: 2, y2: 1 },
    { x1: 4, y1: 0, x2: 4, y2: 1 },
    { x1: 5, y1: 0, x2: 5, y2: 1 },
    { x1: 0, y1: 2, x2: 0, y2: 3 },
    { x1: 1, y1: 4, x2: 2, y2: 4 },
    { x1: 4, y1: 5, x2: 5, y2: 5 }
    ],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 5 }],
  endingPoints: [{ x: 5, y: 0 }],
  endingPoint: { x: 5, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 1,
  gridSizeY: 3,
  puzzles: [
    { x: 0, y: 1, value: 'monomino' },
    { x: 0, y: 2, value: 'monomino' }],
  blockedLines: [
    { x1: 1, y1: 1, x2: 1, y2: 2 },
    { x1: 0, y1: 2, x2: 0, y2: 3 }],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 1,
  gridSizeY: 3,
  puzzles: [
    { x: 0, y: 1, value: 'monomino' },
    { x: 0, y: 2, value: 'monomino' }],
  blockedLines: [
    { x1: 0, y1: 2, x2: 1, y2: 2 },
    { x1: 0, y1: 2, x2: 1, y2: 2 }],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 2,
  gridSizeY: 3,
  puzzles: [
    { x: 1, y: 1, value: 'monomino' },
    { x: 0, y: 2, value: 'tromino_Right_R90' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 0, y: 0, value: 'domino_R90' },
    { x: 0, y: 2, value: 'tetromino_Square' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 1, y: 0, value: 'domino_R90' },
    { x: 0, y: 2, value: 'tetromino_Square' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 1, y: 2, value: 'domino_R90' },
    { x: 0, y: 2, value: 'tetromino_Square' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 1, y: 1, value: 'tromino_Straight_R90' },
    { x: 0, y: 1, value: 'tetromino_Square' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 0, y: 0, value: 'tromino_Straight_R90' },
    { x: 2, y: 2, value: 'tetromino_Square' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 1, value: 'tetromino_Straight_R90' },
    { x: 1, y: 3, value: 'tromino_Straight' },
    { x: 2, y: 3, value: 'tromino_Straight' }],
  blockedLines: [{ x1: 3, y1: 1, x2: 3, y2: 2 },],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 1, value: 'tetromino_Straight_R90' },
    { x: 1, y: 3, value: 'tromino_Straight' },
    { x: 2, y: 3, value: 'tromino_Straight' }],
  blockedLines: [{ x1: 2, y1: 1, x2: 2, y2: 2 },],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 }
},
{//FYI this is the puzzle that broke me
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 5,
  gridSizeY: 5,
  puzzles: [
    { x: 4, y: 0, value: 'tetromino_Straight' },
    { x: 2, y: 2, value: 'monomino' },
    { x: 2, y: 4, value: 'domino_R90' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 5 }],
  endingPoints: [{ x: 5, y: 0 }],
  endingPoint: { x: 5, y: 0 }
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 5,
  gridSizeY: 5,
  puzzles: [
    { x: 0, y: 0, value: 'tetromino_L_FH_R270' },
    { x: 4, y: 0, value: 'domino_R90' },
    { x: 1, y: 4, value: 'tromino_Straight' },
    { x: 4, y: 4, value: 'tromino_Straight_R90' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 5 }],
  endingPoints: [{ x: 5, y: 0 }],
  endingPoint: { x: 5, y: 0 }
},

{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 2, y: 0, value: 'monomino' },
    { x: 0, y: 1, value: 'octomino_Skewed' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 },
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 1, y: 2, value: 'domino_Skewed' },
    { x: 2, y: 2, value: 'domino_Skewed_R90' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 },
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'monomino' },
    { x: 2, y: 0, value: 'tetromino_Straight_R90' },
    { x: 0, y: 2, value: 'tromino_Skewed' },
    
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 },
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'pentomino_Skewed' },
    { x: 3, y: 1, value: 'tromino_Straight' },
    { x: 1, y: 2, value: 'tetromino_Skewed' },
    
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 },
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'olive',
  gridSizeX: 1,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 3, value: 'tetromino_Straight_R90_Rotatable' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 3, y: 0 },
},
{
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 5,
  gridSizeY: 5,
  puzzles: [
    { x: 0, y: 0, value: 'tetromino_L_FH_R90' },
    { x: 0, y: 4, value: 'tetromino_L_R270' },
    { x: 4, y: 0, value: 'tetromino_Straight' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 5 }],
  endingPoints: [{ x: 5, y: 0 }],
  endingPoint: { x: 5, y: 0 }
},

{
  location: 'Marsh',
  level: getID(),
  theme: 'red',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'tetromino_L_FH_R90' },
    { x: 0, y: 3, value: 'tetromino_L_R270' },
    { x: 3, y: 0, value: 'tetromino_Straight' }],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 }
},
{
  location: 'Bunker',
  level: getID(),
  theme: 'green',
  gridSizeX: 4,
  gridSizeY: 5,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 1, y: 0, value: 'blacksquare' },
    { x: 2, y: 0, value: 'blacksquare' },
    { x: 3, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 1, y: 1, value: 'whitesquare' },
    { x: 2, y: 1, value: 'whitesquare' },
    { x: 3, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'blacksquare' },
    { x: 1, y: 2, value: 'whitesquare' },
    { x: 2, y: 2, value: 'whitesquare' },
    { x: 3, y: 2, value: 'blacksquare' },
    { x: 0, y: 3, value: 'blacksquare' },
    { x: 1, y: 3, value: 'blacksquare' },
    { x: 3, y: 3, value: 'blacksquare' },

    ],
  blockedLines: [
    { x1: 1, y1: 4, x2: 1, y2: 5 },
    { x1: 3, y1: 4, x2: 3, y2: 5 },
    ],
  hiddenLines: [
    { x1: 0, y1: 4, x2: 0, y2: 5 },
    { x1: 0, y1: 5, x2: 1, y2: 5 },
    { x1: 3, y1: 5, x2: 4, y2: 5 },
    { x1: 4, y1: 4, x2: 4, y2: 5 },
    ],
  hexagons: [],
  startingPoints: [{ x: 2, y: 5 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 },
},
{
  location: 'Bunker',
  level: getID(),
  theme: 'grey',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 0, y: 2, value: 'triangle' },
    ],
  blockedLines: [
    { x1: 0, y1: 0, x2: 0, y2: 1 },
    { x1: 1, y1: 0, x2: 2, y2: 0 },
    { x1: 3, y1: 0, x2: 3, y2: 1 },
    { x1: 2, y1: 1, x2: 2, y2: 2 },
    { x1: 1, y1: 3, x2: 2, y2: 3 },
    ],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 },
},
{
  location: 'Bunker',
  level: getID(),
  theme: 'green',
  gridSizeX: 4,
  gridSizeY: 5,
  puzzles: [
    { x: 0, y: 0, value: 'tromino_Right' },
    { x: 0, y: 3, value: 'tromino_Right_R90' },
    { x: 1, y: 1, value: 'blacksquare' },
    { x: 2, y: 1, value: 'blacksquare' },
    { x: 1, y: 2, value: 'blacksquare' },
    { x: 2, y: 2, value: 'blacksquare' },
    { x: 3, y: 0, value: 'tromino_Right_R270' },
    { x: 3, y: 3, value: 'tromino_Right_R180' },

    ],
  blockedLines: [
    { x1: 1, y1: 4, x2: 1, y2: 5 },
    { x1: 3, y1: 4, x2: 3, y2: 5 },
    ],
  hiddenLines: [
    { x1: 0, y1: 4, x2: 0, y2: 5 },
    { x1: 0, y1: 5, x2: 1, y2: 5 },
    { x1: 3, y1: 5, x2: 4, y2: 5 },
    { x1: 4, y1: 4, x2: 4, y2: 5 },
    ],
  nonvisitingSquares: [
    { x: 0, y: 4 },
    { x: 3, y: 4 }
  ],
  hexagons: [],
  startingPoints: [{ x: 2, y: 5 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 },
},
{
  location: 'Bunker',
  level: getID(),
  theme: 'grey',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 2, value: 'tetromino_T_R270_Rotatable' }
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 4, y: 0 },
    { x: 6, y: 0 },
    { x: 8, y: 0 },
    { x: 0, y: 2 },
    { x: 2, y: 2},
    { x: 4, y: 2},
    { x: 6, y: 2 },
    { x: 8, y: 2 },
        { x: 0, y: 4 },
    { x: 2, y: 4 },
    { x: 4, y: 4 },
    { x: 6, y: 4 },
    { x: 8, y: 4 },
        { x: 0, y: 6 },
    { x: 2, y: 6 },
    { x: 4, y: 6 },
    { x: 6, y: 6 },
    { x: 8, y: 6 },
        { x: 0, y: 8 },
    { x: 2, y: 8 },
    { x: 4, y: 8 },
    { x: 6, y: 8 },
    { x: 8, y: 8 },
  ],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 },
},
{
  location: 'Town',
  level: getID(),
  theme: 'turquoise',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'whitesquare' },
    { x: 1, y: 0, value: 'domino_R90' },
    { x: 2, y: 0, value: 'domino_R90' },
    { x: 3, y: 0, value: 'whitesquare' },

    { x: 0, y: 3, value: 'blacksquare' },
    { x: 1, y: 3, value: 'domino_R90' },
    { x: 2, y: 3, value: 'domino_R90' },
    { x: 3, y: 3, value: 'whitesquare' },

    ],
  blockedLines: [],
  hiddenLines: [],
  nonvisitingSquares: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 },
},
{
  location: 'Town',
  level: getID(),
  theme: 'grey',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [
    { x: 1, y: 1, value: 'triangle' },
    ],
  blockedLines: [
    { x1: 0, y1: 1, x2: 0, y2: 2 },
    { x1: 0, y1: 3, x2: 1, y2: 3 },
    { x1: 1, y1: 3, x2: 2, y2: 3 },
    { x1: 1, y1: 1, x2: 2, y2: 1 },
    { x1: 2, y1: 0, x2: 3, y2: 0 },
    { x1: 2, y1: 2, x2: 3, y2: 2 },
    { x1: 3, y1: 2, x2: 3, y2: 3 },
    ],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 },
},
{
  location: 'Quarry',
  level: getID(),
  theme: 'blue',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'whitesquare' },
    { x: 1, y: 0, value: 'blacksquare' },
    { x: 2, y: 0, value: 'blacksquare' },
    { x: 3, y: 0, value: 'whitesquare' },
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 1, y: 1, value: 'blacksquare' },
    { x: 2, y: 1, value: 'blacksquare' },
    { x: 3, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'blacksquare' },
    { x: 1, y: 2, value: 'blacksquare' },
    { x: 2, y: 2, value: 'blacksquare' },
    { x: 3, y: 2, value: 'blacksquare' },
    { x: 0, y: 3, value: 'whitesquare' },
    { x: 1, y: 3, value: 'blacksquare' },
    { x: 2, y: 3, value: 'blacksquare' },
    { x: 3, y: 3, value: 'whitesquare' },

    ],
  blockedLines: [],
  hiddenLines: [],
  nonvisitingSquares: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 },
},
{
  location: 'Quarry',
  level: getID(),
  theme: 'olive',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 3, value: 'tetromino_L' },
    { x: 3, y: 3, value: 'tetromino_L_R180' },
    ],
  blockedLines: [],
  hiddenLines: [],
  nonvisitingSquares: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 4 }],
  endingPoints: [{ x: 4, y: 0 }],
  endingPoint: { x: 4, y: 0 },
},
{
  location: 'Castle',
  level: getID(),
  theme: 'orange',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [],
  blockedLines: [
    { x1: 1, y1: 0, x2: 2, y2: 0 },
    { x1: 1, y1: 1, x2: 2, y2: 1 },
    { x1: 4, y1: 1, x2: 4, y2: 2 },
    { x1: 2, y1: 2, x2: 2, y2: 3 },
    { x1: 2, y1: 3, x2: 3, y2: 3 }
  ],
  hiddenLines: [],
  hexagons: [
    { x: 3, y: 6 },
    { x: 7, y: 2 }
  ],
  startingPoints: [{ x: 4, y: 4 }],
  endingPoints: [{ x: 1, y: 0 }],
  endingPoint: { x: 1, y: 0 },
},
{
  location: 'Castle',
  level: getID(),
  theme: 'purple',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'whitesquare' },
    { x: 0, y: 3, value: 'whitesquare' },
    { x: 3, y: 0, value: 'blacksquare' },
    { x: 3, y: 1, value: 'blacksquare' },
    { x: 3, y: 2, value: 'whitesquare' },
    { x: 3, y: 3, value: 'whitesquare' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 4, y: 4 }],
  endingPoints: [{ x: 0, y: 2 }],
  endingPoint: { x: 0, y: 2 },
},
{
  location: 'Castle',
  level: getID(),
  theme: 'green',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 3, y: 0, value: 'tetromino_Straight_R90' },
    { x: 2, y: 3, value: 'tetromino_L_FH_R90' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 4, y: 4 }],
  endingPoints: [{ x: 0, y: 0 }],
  endingPoint: { x: 0, y: 0 },
},
{
  location: 'Castle',
  level: getID(),
  theme: 'grey',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [{ x: 2, y: 1, value: 'doubletriangle' },],
  blockedLines: [
    { x1: 0, y1: 1, x2: 0, y2: 2 },
    { x1: 2, y1: 0, x2: 3, y2: 0 },
    { x1: 3, y1: 1, x2: 3, y2: 2 },
    { x1: 2, y1: 2, x2: 2, y2: 3 },
    ],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 0, y: 3 }],
  endingPoints: [{ x: 3, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Castle',
  level: getID(),
  theme: 'blue',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 2, y: 0, value: 'tetromino_L_FH_R90_Rotatable' }, 
    { x: 1, y: 3, value: 'tetromino_L_FH_R90_Rotatable' },
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [
    { x: 0, y: 4 },
    { x: 4, y: 4 }],
  endingPoints: [
    { x: 0, y: 2 },
    { x: 4, y: 2 }],
  endingPoint: { x: 0, y: 0 },
},
{
  location: 'Castle',
  level: getID(),
  theme: 'grey',
  gridSizeX: 3,
  gridSizeY: 3,
  puzzles: [{ x: 2, y: 1, value: 'doubletriangle' },],
  blockedLines: [
    { x1: 2, y1: 0, x2: 3, y2: 0 },
    { x1: 0, y1: 1, x2: 0, y2: 2 },
    { x1: 1, y1: 1, x2: 2, y2: 1 },
    { x1: 2, y1: 2, x2: 2, y2: 3 },
    { x1: 3, y1: 1, x2: 3, y2: 2 }
    ],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [{ x: 3, y: 3 }],
  endingPoints: [{ x: 0, y: 0 }],
  endingPoint: { x: 3, y: 0 }
},
{
  location: 'Bunker NEEDS Negation',
  level: getID(),
  theme: 'green',
  gridSizeX: 4,
  gridSizeY: 5,
  puzzles: [
    { x: 0, y: 0, value: 'blacksquare' },
    { x: 1, y: 0, value: 'blacksquare' },
    { x: 2, y: 0, value: 'blacksquare' },
    { x: 3, y: 0, value: 'blacksquare' },
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 1, y: 1, value: 'whitesquare' },
    { x: 2, y: 1, value: 'whitesquare' },
    { x: 3, y: 1, value: 'blacksquare' },
    { x: 0, y: 2, value: 'blacksquare' },
    { x: 1, y: 2, value: 'whitesquare' },
    { x: 2, y: 2, value: 'whitesquare' },
    { x: 3, y: 2, value: 'blacksquare' },
    { x: 0, y: 3, value: 'blacksquare' },
    { x: 1, y: 3, value: 'blacksquare' },
    { x: 2, y: 3, value: 'blacksquare' },
    { x: 3, y: 3, value: 'blacksquare' },

    { x: 1, y: 4, value: 'negation' },
    { x: 2, y: 4, value: 'negation' },
    ],
  blockedLines: [
    { x1: 1, y1: 4, x2: 1, y2: 5 },
    { x1: 3, y1: 4, x2: 3, y2: 5 },
    ],
  hiddenLines: [
    { x1: 0, y1: 4, x2: 0, y2: 5 },
    { x1: 0, y1: 5, x2: 1, y2: 5 },
    { x1: 3, y1: 5, x2: 4, y2: 5 },
    { x1: 4, y1: 4, x2: 4, y2: 5 },
    ],
  hexagons: [],
  startingPoints: [{ x: 2, y: 5 }],
  endingPoints: [{ x: 2, y: 0 }],
  endingPoint: { x: 2, y: 0 },
},

{
  location: 'Quarry',
  level: getID(),
  theme: 'blue',
  gridSizeX: 4,
  gridSizeY: 4,
  puzzles: [
    { x: 0, y: 0, value: 'whitesquare' },
    { x: 1, y: 0, value: 'blacksquare' },
    { x: 2, y: 0, value: 'blacksquare' },
    { x: 3, y: 0, value: 'whitesquare' },
    
    { x: 0, y: 1, value: 'blacksquare' },
    { x: 1, y: 1, value: 'blacksquare' },
    { x: 2, y: 1, value: 'blacksquare' },
    { x: 3, y: 1, value: 'blacksquare' },

    { x: 0, y: 2, value: 'blacksquare' },
    { x: 1, y: 2, value: 'blacksquare' },
    { x: 2, y: 2, value: 'blacksquare' },
    { x: 3, y: 2, value: 'blacksquare' },

    { x: 0, y: 3, value: 'whitesquare' },
    { x: 1, y: 3, value: 'blacksquare' },
    { x: 2, y: 3, value: 'blacksquare' },
    
    ],
  blockedLines: [],
  hiddenLines: [],
  hexagons: [],
  startingPoints: [
    { x: 0, y: 0 },
    { x: 4, y: 4 }
    ],
  endingPoints: [
    { x: 2, y: 0 },
    { x: 2, y: 4 },
    ],
  endingPoint: { x: 2, y: 0 },
},
{
  location: 'Quarry',
  level: getID(),
  theme: 'green',
  gridSizeX: 5,
  gridSizeY: 5,
  puzzles: [],
  blockedLines: [],
  hiddenLines: [
    { x1: 0, y1: 3, x2: 0, y2: 4 },
    { x1: 0, y1: 4, x2: 0, y2: 5 },
    { x1: 1, y1: 3, x2: 1, y2: 4 },
    { x1: 1, y1: 4, x2: 1, y2: 5 },
    { x1: 4, y1: 0, x2: 4, y2: 1 },
    { x1: 4, y1: 1, x2: 4, y2: 2 },
    { x1: 5, y1: 0, x2: 5, y2: 1 },
    { x1: 5, y1: 1, x2: 5, y2: 2 },
    { x1: 0, y1: 4, x2: 1, y2: 4 },
    { x1: 1, y1: 4, x2: 2, y2: 4 },
    { x1: 0, y1: 5, x2: 1, y2: 5 },
    { x1: 1, y1: 5, x2: 2, y2: 5 },
    { x1: 3, y1: 0, x2: 4, y2: 0 },
    { x1: 4, y1: 0, x2: 5, y2: 0 },
    { x1: 3, y1: 1, x2: 4, y2: 1 },
    { x1: 4, y1: 1, x2: 5, y2: 1 },
    ],
  hexagons: [
    { x: 3, y: 0 },
    { x: 0, y: 3 },
    { x: 6, y: 3 },
    { x: 0, y: 6 },
    { x: 2, y: 6 },
    { x: 4, y: 6 },
    { x: 4, y: 8 },
    { x: 4, y: 10 },
    { x: 8, y: 10 },
    { x: 10, y: 4 },
    { x: 10, y: 7 },
    ],
  startingPoints: [
    { x: 2, y: 5 },
    ],
  endingPoints: [
    { x: 3, y: 0 },
    ],
  endingPoint: { x: 2, y: 0 },
},

//Flex
/**
{
  location: 'Flex',
  level: getID(),
  gridSizeX: 5,
  gridSizeY: 7,
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
  startingPoints: [{ x: 0, y: 5 }],
  endingPoints: [{ x: 5, y: 0 }],
  endingPoint: { x: 5, y: 0 },
},
**/
];