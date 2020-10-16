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



window.findSolution = (row, n, board, validator, callback) => {

  /* from solution video */

  if (row === n) {
    callback();
    return;
  }

  for (let i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      findSolution(row + 1, n, board, validator, callback);
    }
    board.togglePiece(row, i);
  }

},

window.findNRooksSolution = function(n) {

  /* from solution video */

  var solution;

  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solution = _.map(board.rows(), (row) => {
      return row.slice();
    });
  });

  return solution;

  /* our code */

  // iterate through the first row
  // at each index, place a rook
  // check for row conflict
  // check for col conflict
  // [1, 0, 0, 0] -> some array of solutions  row1 [1000] <- goes to matrix
  // [0, 1, 0, 0] -> some array of solutions  row2 [1000]x [0100] <- goes to matrix
  // [0, 0, 0, 0]   if there is any conflict  row3 [1000]x [0100]x [0010] <- goes to matrix
  // [0, 0, 0, 0]                             row4 [1000]x [0100]x [0010]x [0001] <- goes to matrix


  /* WORKING SOLUTION

  const board = new Board({ n: n });

  let count = n;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board.togglePiece(i, j);
      count--;

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        count++;
      }

      if (!count) {
        console.log(
          'Single solution for ' + n + ' rooks:',
          JSON.stringify(board.rows())
        );
        return board.rows(i);
      }
    }
  }

  */

  /* NOT WORKING

  let sliced = board.rows(0).slice();
  console.log({sliced});

  let solutions = [];

  let recursiveToggle = (board.rows(row)) => {
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

  */
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function (n, board, solutions = 0) {
//   board = board || new Board({ n: n });
// }

window.countNRooksSolutions = function(n) {

  /* from solution video */

  var solutionCount = 0;

  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  });

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  /* from solution video */

  var board = new Board({n: n});

  var solution = board.rows();

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solution = _.map(board.rows(), (row) => {
      return row.slice();
    });
  });


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;

  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
