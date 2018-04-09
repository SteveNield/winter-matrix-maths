function _mean(matrix){
  return _flatMean(matrix
    .reduce(function(acc, row){
      return acc.concat(row);
    }, []));
}

function _flatMean(arr){
  return arr.reduce(function(acc, val){
    return acc += val;
  }, 0)/arr.length;
}

function _median(matrix){
  let ordered = _flatten(matrix)
    .sort(function(a, b) {
      return a - b;
    });

  let halfLength = ordered.length/2;
  let midIndex = Math.floor(halfLength);

  if(ordered.length % 2 !== 0){
    return ordered[midIndex];
  }

  return _flatMean(ordered.slice(midIndex-1, midIndex+1));
}

function _deviationAt(element, matrix){
  return Math.sqrt(Math.pow((element-_mean(matrix)), 2));
}

function _flatten(matrix){
  return matrix.reduce(function(acc, row){
    return acc.concat(row);
  }, []);
}

function _immutableReverse(arr){
  return arr.slice().reverse();
}

function _immutableMatrixReverse(matrix){
  return _immutableReverse(matrix).map(function(row){
    return _immutableReverse(row);
  });
}

function _2x2Determinant(flat2x2){
  return (flat2x2[0]*flat2x2[3])-(flat2x2[1]*flat2x2[2]);
}

function _determinant(matrix){
  let flat = _flatten(matrix);
  let size = Math.sqrt(flat.length);
  if(size % 1 !== 0){
    throw new Error('Matrix must be square for determinant');
  }
  if(size === 2){
    return _2x2Determinant(flat);
  }
  return flat
    .slice(0, size)
    .reduce(function(acc, vector, index){
      let sub = [];
      for (let row = size; row < flat.length; row += size) {
        sub = sub.concat(
          flat.slice(row, row + index),
          flat.slice(row + index + 1, row + size)
        );
      }
      let minor = _determinant(sub);
      let cofactor = vector*minor;
      return (index % 2 === 0)
        ? acc+cofactor
        : acc-cofactor;
    }, 0);
}

function _diff(minuend, subtrahend){
  return minuend.map(function(row, ri){
    return row.map(function(col, ci){
      return col-subtrahend[ri][ci];
    })
  })
}

module.exports.mean = _mean;
module.exports.flatMean = _flatMean;
module.exports.deviationAt = _deviationAt;
module.exports.flatten = _flatten;
module.exports.median = _median;
module.exports.determinant = _determinant;
module.exports.immutableMatrixReverse = _immutableMatrixReverse;
module.exports.diff = _diff;
