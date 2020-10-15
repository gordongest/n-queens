// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      let conflict = false;

      const row = this.get(rowIndex);

      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1 && conflict) {
          return true;
        } else if (row[i] === 1) {
          conflict = true;
        }
      }

      return false;
    },

    hasAnyRowConflicts: function() {

      let result = false;

      let matrix = this.get(0);

      for (let i = 0; i < matrix.length; i++) {
        result = this.hasRowConflictAt(i);
        if (result) {
          return true;
        }
      }

      return result;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      let hasConflict = false;

      const len = this.get(0).length;

      for (let i = 0; i < len; i++) {

        const current = this.get(i)[colIndex];

        if (current === 1 && hasConflict) {
          return true;
        } else if (current === 1) {
          hasConflict = true;
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      let hasConflict = false;

      const row = this.get(0);

      for (let i = 0; i < row.length; i++) {
        hasConflict = this.hasColConflictAt(i);
        if (hasConflict) {
          return true;
        }
      }

      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //

    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(colIndex) {

      const len = this.get(0).length;

      let hasConflict = false;

      for (let i = 0; i < len; i++) {
        const row = this.get(i);

        if (row[colIndex] === 1 && hasConflict) {

          return true;

        } else if (row[colIndex] === 1) {
          hasConflict = true;
        }
        colIndex++;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      const len = this.get(0).length;

      let hasConflict = false;

      for (let i = -len + 1; i < len * 2; i++) {
        hasConflict = this.hasMajorDiagonalConflictAt(i);
        if (hasConflict) {
          return true;
        }
      }

      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(colIndex) {
      const len = this.rows(0).length;
      // console.log(colIndex);

      const sliced = this.rows(0).slice();

      let hasConflict = false;

      for (let i = 0; i <= len - 1; i++) {
        const row = sliced[i];
        if (colIndex > -1) {
          if (row[colIndex] === 1 && hasConflict) {
            return true;
          } else if (row[colIndex] === 1) {
            hasConflict = true;
          }
          colIndex--;
        }
      }

      return false;
    },


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      const len = this.get(0).length;

      let hasConflict = false;

      for (let i = -len + 1; i < len * 2; i++) {
        hasConflict = this.hasMinorDiagonalConflictAt(i);
        if (hasConflict) {
          return hasConflict;
        }
      }

      return hasConflict;
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
