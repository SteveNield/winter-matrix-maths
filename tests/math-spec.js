require('winter-test-setup')

var MatrixMaths = require('./../index');

describe('median', function(){
  function testMedian(matrix, expectedMedian){
    it('correctly finds the median of '+matrix, function(){
      MatrixMaths.median(matrix).should.equal(expectedMedian);
    })
  }

  testMedian([[1,2],[2,2]], 2);
  testMedian([[1,3,4],[4,5,6],[7,8,9]], 5);
  testMedian([[1,2],[7,8]], 4.5);
  testMedian([[8,1],[2,68]], 5);
})

describe('deviation', function(){
  function testDeviation(matrix, element, expectedDeviation){
    it('finds the deviation at '+element+' from '+matrix, function(){
      MatrixMaths.deviationAt(element, matrix).should.equal(expectedDeviation);
    });
  }

  testDeviation([[1,2],[3,2]], 1, 1);
  testDeviation([[25,9],[2,16]], 2, 11);
  testDeviation([[8,8],[14,14]], 8, 3);
})

describe('mean', function(){
  function testMean(matrix, expectedMean){
    it('finds the mean of matrix '+matrix, function(){
      MatrixMaths.mean(matrix).should.equal(expectedMean);
    })
  }

  testMean([[2,1,4],[3,6,5]], 3.5);
  testMean([[6,2],[1,1],[3,5]], 3);
})

describe('flatten', function(){
  function testFlatten(matrix, expectedFlatArr){
    it('returns a 1-dimensional array of all elements of matrix '+matrix, function(){
      MatrixMaths.flatten(matrix).should.deep.equal(expectedFlatArr);
    })
  }

  testFlatten([[1,2,3],[5,2,1],[534,123]], [1,2,3,5,2,1,534,123]);
  testFlatten([[1,2,2,3,4,5,1,1,2,2,3,1,1,2],[1,2,2,3,21,23,12,4,3,23,441]], [1,2,2,3,4,5,1,1,2,2,3,1,1,2,1,2,2,3,21,23,12,4,3,23,441]);
});

describe('immutableMatrixReverse', function(){
  function testImmutableMatrixReverse(matrix, expectedReversedMatrix){
    it('reverses the order of elements in a matrix cell-wise, then row-wise without mutating the original matrix '+matrix, function(){
      let original = matrix.slice(0);
      MatrixMaths.immutableMatrixReverse(matrix).should.deep.equal(expectedReversedMatrix);
      matrix.should.deep.equal(original);
    })
  }

  testImmutableMatrixReverse([[1,2,3,4],[5,2,1,2],[3,3,3,3]],[[3,3,3,3],[2,1,2,5],[4,3,2,1]]);
  testImmutableMatrixReverse([[1,5],[4,2]],[[2,4],[5,1]]);
})

describe('determinant', function(){
  function testDeterminant(matrix, expectedDeterminant){
    it('finds the determinant of a matrix: '+matrix, function(){
      MatrixMaths.determinant(matrix).should.equal(expectedDeterminant);
    })
  }

  testDeterminant([
    [1,2,4],
    [2,-1,3],
    [4,0,1]
  ], 35);

  testDeterminant([
    [1,2],
    [3,4]
  ], -2);

  testDeterminant([
    [1,2,3,4],
    [1,0,2,0],
    [0,1,2,3],
    [2,3,0,0]
  ], 7);
})

describe('diff', function(){
  function testDiff(minuend, subtrahend, expectedDiff){
    it('finds the solution to '+minuend+'-'+subtrahend, function(){
      MatrixMaths.diff(minuend, subtrahend).should.deep.equal(expectedDiff);
    })
  }

  testDiff([[5,2,4],[4,2,4]], [[1,1,1],[1,1,1]], [[4,1,3],[3,1,3]]);
  testDiff([[1,1,1],[1,1,1]], [[5,2,4],[5,2,3]], [[-4,-1,-3],[-4,-1,-2]]);
  testDiff([[2,2],[2,2]], [[2,2],[2,2]], [[0,0],[0,0]]);
})
