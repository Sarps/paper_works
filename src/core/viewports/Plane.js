const THREE = require("three");
import Base from "./Base";

export default class Plane extends Base {
  constructor(options) {
    super(options);

    this.grid = new THREE.GridHelper(1000, 20, "#ff0000", "#02c64c");

    var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);
    this.plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ visible: false })
    );

    this.scene.add(this.grid);
    this.scene.add(this.plane);
  }

  setupCamera(options) {
    let { offsetHeight, offsetWidth } = options.screen;

    let camera = new THREE.OrthographicCamera(
      offsetWidth / -2,
      offsetWidth / 2,
      offsetHeight / 2,
      offsetHeight / -2,
      1,
      1000
    );
    camera.position.x = 2;
    camera.position.y = 1;
    camera.position.z = 3;
    camera.lookAt(new THREE.Vector3());

    this.perspective = "Orthographic";

    return camera;
  }
}
