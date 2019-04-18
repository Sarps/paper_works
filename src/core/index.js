const THREE = require("three");

import Renderer from "./Renderer";

export default {
  init: () => {
    new Renderer();
  }
};

/*
function initi() {

    screen = document.querySelector('#screen')

    camera = new THREE.PerspectiveCamera(45, screen.offsetWidth / screen.offsetHeight, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);

    // roll-over helpers
    var rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);

    // cubes
    cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x02c64c, opacity: 0.5, transparent: true });
    //cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( 'textures/square-outline-textured.png' ) } );

    // grid
    var gridHelper = new THREE.GridHelper(1000, 20, '#ff0000', '#02c64c');
    scene.add(gridHelper);

    // raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    geometry.rotateX(- Math.PI / 2);

    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    scene.add(plane);

    objects.push(plane);

    // lights
    var ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0x000000);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(screen.offsetWidth, screen.offsetHeight);
    screen.appendChild(renderer.domElement);

    screen.addEventListener('mousemove', onDocumentMouseMove, false);
    screen.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);

    window.addEventListener('resize', onWindowResize, false);

    onWindowResize();

    render();

}

function onWindowResize() {

    renderer.setSize(screen.offsetWidth, screen.offsetHeight);

    camera.aspect = screen.offsetWidth / screen.offsetHeight;
    camera.updateProjectionMatrix();

    render()


}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.set((event.offsetX / screen.offsetWidth) * 2 - 1, - (event.offsetY / screen.offsetHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {

        var intersect = intersects[0];

        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    }

    render();

}

function onDocumentMouseDown(event) {

    event.preventDefault();

    mouse.set((event.offsetX / screen.offsetWidth) * 2 - 1, - (event.offsetY / screen.offsetHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {

        var intersect = intersects[0];

        // delete cube

        if (isShiftDown) {

            if (intersect.object !== plane) {

                scene.remove(intersect.object);

                objects.splice(objects.indexOf(intersect.object), 1);

            }

            // create cube

        } else {

            var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            scene.add(voxel);

            objects.push(voxel);

        }

        render();

    }

}

function onDocumentKeyDown(event) {

    switch (event.keyCode) {

        case 16: isShiftDown = true; break;

    }

}

function onDocumentKeyUp(event) {

    switch (event.keyCode) {

        case 16: isShiftDown = false; break;

    }

}

function render() {

    //requestAnimationFrame(render)

    //controls.update()

    renderer.render(scene, camera);


}
*/
