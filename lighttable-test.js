var camera, scene, renderer;
var cubes = [];
var rotate = false;
init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 700;

  scene = new THREE.Scene();

  var cubeGeometry = new THREE.BoxGeometry( 100, 100, 100 );

  for ( var i = 0; i < cubeGeometry.faces.length; i ++ ) {
    var color =  Math.random() * 0xffffff;
    cubeGeometry.faces[ i ].color.setHex(color);
    cubeGeometry.faces[ ++i ].color.setHex(color);
  }

  var positionMap = [
    [-105, -105, -105],
    [-105, -105, 0],
    [-105, -105, 105],

    [-105, 0, -105],
    [-105, 0, 0],
    [-105, 0, 105],

    [-105, 105, -105],
    [-105, 105, 0],
    [-105, 105, 105],

    [0, -105, -105],
    [0, -105, 0],
    [0, -105, 105],

    [0, 0, -105],
    [0, 0, 0],
    [0, 0, 105],

    [0, 105, -105],
    [0, 105, 0],
    [0, 105, 105],

    [105, -105, -105],
    [105, -105, 0],
    [105, -105, 105],

    [105, 0, -105],
    [105, 0, 0],
    [105, 0, 105],

    [105, 105, -105],
    [105, 105, 0],
    [105, 105, 105]
  ];

  positionMap.forEach(function(map) {
    var cube = new THREE.Mesh( cubeGeometry, new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } ) );
    cube.position.set(map[0], map[1], map[2]);
    scene.add( cube );
    cubes.push(cube);
  });


  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

var STEPS = 50,
    step = STEPS;

function animate() {

  requestAnimationFrame( animate );

  var rotation = new THREE.Euler( 0, 0.01, 0, 'XYZ' );
  camera.position.applyEuler(rotation);
  camera.lookAt(new THREE.Vector3(0,0,0));
  camera.updateProjectionMatrix();

  if (rotate) {
    cubes.slice(0,9).forEach(function(c) {
      c.position.applyEuler(rotateRowZ);
      var axis = new THREE.Vector3(-105,0,0);
      var rotObjectMatrix = new THREE.Matrix4();
      rotObjectMatrix.makeRotationAxis(axis.normalize(), - Math.PI / 2 / STEPS);
      c.matrix.multiply(rotObjectMatrix);
      c.rotation.setFromRotationMatrix(c.matrix);
    });
    step--;
    if (step <= 0) {
      rotate = false;
      step = STEPS;
    }
  }

  renderer.render( scene, camera );

}



var rotateRowX = new THREE.Euler(0, 0.01, 0, 'XYZ'),
    rotateRowZ = new THREE.Euler(Math.PI / 2 / STEPS, 0, 0, 'XYZ'),
    rotateRowY = new THREE.Euler(0, 0, 0.01, 'XYZ');

window.addEventListener('keydown', function(e) {
  if (e.which === 40) {
    rotate = true;
  }
})
