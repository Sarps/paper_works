const THREE = require("three");
import { InputManager } from "../inputs";
import StateManager from "../StateManager";

export default class Base {

  static STATES = {
    NONE: 0,
    SELECTED: 1
  }

  /**
   * 
   * @param {Object} options 
   */
  constructor(options) {

    this.screen = options.screen;
    this.renderer = options.renderer || this.setupRenderer(options);
    this.camera = options.camera || this.setupCamera(options);
    this.scene = options.scene || this.setupScene(options);

    this.stateManager = this.setupStateManager(options);
    this.inputManager = this.setupInputManager(options);

    this.capture = this.inputManager.capture.bind(this.inputManager);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  requestAudience() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.renderer.setSize(this.screen.offsetWidth, this.screen.offsetHeight);
    this.camera.aspect = this.screen.offsetWidth / this.screen.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.requestAudience()
  }

  /**
   *
   * @param {*} options
   * @returns {THREE.Renderer}
   */
  setupRenderer(options) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(options.screen.offsetWidth, options.screen.offsetHeight);
    options.screen.appendChild(renderer.domElement);
    return renderer;
  }

  /**
   *
   * @param {*} options
   * @returns {THREE.Camera}
   */
  setupCamera(options) {
    let camera = new THREE.PerspectiveCamera(
      45,
      options.screen.offsetWidth / options.screen.offsetHeight,
      1,
      10000
    );
    camera.position.set(0, 500, 0);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  /**
   *
   * @returns {THREE.Scene}
   */
  setupScene() {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    return scene;
  }

  /**
   *
   * @returns {InputManager}
   */
  setupInputManager() {
    return new InputManager(this.screen, this.stateManager);
  }

  /**
   *
   * @returns {StateManager}
   */
  setupStateManager() {
    return new StateManager(["..."]);
  }
}
