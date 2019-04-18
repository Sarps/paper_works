function onWindowResize() {
  console.log(screen.offsetWidth, screen.offsetHeight);

  renderer.setSize(screen.offsetWidth, screen.offsetHeight);

  camera.aspect = screen.offsetWidth / screen.offsetHeight;
  camera.updateProjectionMatrix();
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.set(
    (event.offsetX / screen.offsetWidth) * 2 - 1,
    -(event.offsetY / screen.offsetHeight) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    var intersect = intersects[0];

    rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    rollOverMesh.position
      .divideScalar(50)
      .floor()
      .multiplyScalar(50)
      .addScalar(25);
  }

  render();
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.set(
    (event.offsetX / screen.offsetWidth) * 2 - 1,
    -(event.offsetY / screen.offsetHeight) * 2 + 1
  );

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
      voxel.position
        .divideScalar(50)
        .floor()
        .multiplyScalar(50)
        .addScalar(25);
      scene.add(voxel);

      objects.push(voxel);
    }

    render();
  }
}

function onDocumentKeyDown(event) {
  switch (event.keyCode) {
    case 16:
      isShiftDown = true;
      break;
  }
}

function onDocumentKeyUp(event) {
  switch (event.keyCode) {
    case 16:
      isShiftDown = false;
      break;
  }
}

function init() {
  screen.addEventListener("mousemove", onDocumentMouseMove, false);
  screen.addEventListener("mousedown", onDocumentMouseDown, false);
  document.addEventListener("keydown", onDocumentKeyDown, false);
  document.addEventListener("keyup", onDocumentKeyUp, false);

  window.addEventListener("resize", onWindowResize, false);
}
