/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // generate board
  let board = new Board({n: n});
  console.log('board:', board);

  // .togglePiece(row, col)
  board.togglePiece(1, 2);
  console.log('rows:', board.rows());

  // console.log('board again:', board);

  // iterate through the first row
  // at each index, place a rook
  // check for row conflict
  // check for col conflict
  // [1, 0, 0, 0] -> some array of solutions // row1 [1000] <- goes to matrix
  // [1, 0, 0, 0] -> some array of solutions // row2 [1000] [0100] <- goes to matrix
  // [0, 0, 0, 0]   if there is any conflict // row3 [1000] [0100] [0010] <- goes to matrix
  // [0, 0, 0, 0]                            // row4 [1000] [0100] [0010] [0001] <- goes to matrix

  let sliced = board.rows(0).slice();
  console.log({sliced});

  let solutions = [];

  let recursiveToggle = (row) => {
    // iterate through the row
    for (let i = 0; i < row.length; i++) {
      // create alias for colPos
      let colPos = board.rows(row)[i];
      // toggle the piece at the current pos
      board.togglePiece(row, colPos);
      // check the position for conflicts
      // if none, push this row config to solution matrix at current row index
      if (!hasAnyRowConflicts() && !hasAnyColumnConflicts()) {
        solutions[row].push(board.rows(row));
        recursiveToggle(board.rows(row + 1));
      }
    }
  };

  recursiveToggle(board.rows(0));

  return solutions;


  // const board = new Board({n: n});

  // let solution;

  // const ineligibleRows = [];
  // const ineligibleCols = [];
  // let count = n;
  // //find a single random start spot in row
  // for (let i = 0; i < board.length; i++) {

  // }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;

  // for (let i = 0; i < n ** n; i++) {
  //   if (findNRooksSolution(n)) {
  //     solutionCount++;
  //   }
  // }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
