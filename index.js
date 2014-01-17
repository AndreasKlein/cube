// cube
// sides
// s5
// s1 s2 s3 s4
// s6

//              z3
// side       z2
// y1 y2 y3 z1
// |  |  | /
// 1  2  3  - x1
// 4  5  6  - x2
// 7  8  9  - x3

var x1 = [1,2,3]
  , x2 = [4,5,6]
  , x3 = [7,8,9]
  , y1 = [1,4,7]
  , y2 = [2,5,8]
  , y3 = [3,6,9]
  , fields = {
    x1: x1.concat(x1).concat(x1).concat(x1),
    x2: x2.concat(x2).concat(x2).concat(x2),
    x3: x3.concat(x3).concat(x3).concat(x3),
    y1: y1.concat(y1).concat(y1).concat(y1),
    y2: y2.concat(y2).concat(y2).concat(y2),
    y3: y3.concat(y3).concat(y3).concat(y3),
    z1: y1.concat(x1).concat(y3).concat(x3),
    z2: y2.concat(x2).concat(y2).concat(x2),
    z3: y3.concat(x3).concat(y1).concat(x1),
  }
  , X = [1,2,3,4]
  , Y = [1,6,3,5]
  , Z = [2,6,4,5]
  , cube = {}
  , colors = ['white',
              'red',
              'yellow',
              'green',
              'orange',
              'blue']
  , movementMap = {
    x1: X, x2: X, x3: X,
    y1: Y, y2: Y, y3: Y,
    z1: Z, z2: Z, z3: Z,
  };


colors.forEach(function(color, i) {
  var side = {};
  [1,2,3,4,5,6,6,7,8,9]
  .forEach(function(num) {
    side[num] = color;
  });
  cube['s'+(i+1)] = side;
});


// 9 movements

function move(axis, direction) {
  direction = direction || "left";
  var movement = movementMap[axis]
    , temp = {};

  for (var i = 0; i < movement.length; i++) {
    var side = movement[i]
      , targetfields = fields[axis].slice(i*3, (i+1)*3)
      , nextSide = direction === "left" ? movement[i+1] : movement[i-1];
    if (!nextSide) nextSide = (i === 0) ? movement[movement.length-1] : movement[0];
    targetfields.forEach(function(num, j) {
      if (i === 0) temp[num] = cube['s'+side][num];
      if (i === movement.length-1) cube['s'+side][num] = temp[Object.keys(temp)[j]];
      else cube['s'+side][num] = cube['s'+nextSide][num];
    }); 
  }
}

console.log(cube)

move('z1', 'left')

console.log(cube)