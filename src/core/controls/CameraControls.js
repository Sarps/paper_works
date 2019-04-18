const THREE = require("three");

import Base from "./Base"
import { Viewport } from "../viewports"
import { InputManager } from "../inputs"


export default class CameraControls extends Base {
    /**
     *
     * @param {THREE.Camera} camera
     * @param {HTMLCanvasElement} domElement
     * @param {Viewport} viewport
     */
    constructor(camera, domElement, viewport) {

        super(viewport)

        this.camera = camera;
        this.domElement = domElement;
        this.viewport = viewport;

        this.__setDefaults();

        this.update();
    }

    __setDefaults() {
        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the camera orbits around
        this.target = new THREE.Vector3();

        // How far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // How far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = -Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = false; // if true, pan in screen-space
        this.keyPanSpeed = 7.0; // pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // Set to false to disable use of the keys
        this.enableKeys = true;

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

        // Mouse buttons
        this.mouseButtons = {
            LEFT: THREE.MOUSE.LEFT,
            MIDDLE: THREE.MOUSE.MIDDLE,
            RIGHT: THREE.MOUSE.RIGHT
        };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.camera.position.clone();
        this.zoom0 = this.camera.zoom;

        this.__EPS = 0.000001;

        this.__spherical = new THREE.Spherical();
        this.__sphericalDelta = new THREE.Spherical();

        this.__scale = 1;
        this.__panOffset = new THREE.Vector3();
        this.__zoomChanged = false;

        this.__rotateDelta = new THREE.Vector2();
        this.__panDelta = new THREE.Vector2();
        this.__dollyDelta = new THREE.Vector2();

        this.__offset = new THREE.Vector3();

        // so camera.up is the orbit axis
        this.__quat = new THREE.Quaternion().setFromUnitVectors(
            this.camera.up,
            new THREE.Vector3(0, 1, 0)
        );
        this.__quatInverse = this.__quat.clone().inverse();

        this.__lastPosition = new THREE.Vector3();
        this.__lastQuaternion = new THREE.Quaternion();

        this.__v = new THREE.Vector3();
    }

    get autoRotationAngle() {
        return ((2 * Math.PI) / 60 / 60) * this.autoRotateSpeed;
    }

    get zoomScale() {
        return Math.pow(0.95, this.zoomSpeed);
    }

    get polarAngle() {
        return this.__spherical.phi;
    }

    get azimuthalAngle() {
        return this.__spherical.theta;
    }

    rotateLeft(angle) {
        this.__sphericalDelta.theta -= angle;
    }

    rotateUp(angle) {
        this.__sphericalDelta.phi -= angle;
    }

    panLeft(distance, objectMatrix) {
        this.__v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
        this.__v.multiplyScalar(-distance);

        this.__panOffset.add(this.__v);
    }

    panUp(distance, objectMatrix) {
        if (this.screenSpacePanning === true) {
            this.__v.setFromMatrixColumn(objectMatrix, 1);
        } else {
            this.__v.setFromMatrixColumn(objectMatrix, 0);
            this.__v.crossVectors(this.camera.up, this.__v);
        }
        this.__v.multiplyScalar(distance);

        this.__panOffset.add(this.__v);
    }

    pan(deltaX, deltaY) {
        var element = this.domElement;

        if (this.camera.isPerspectiveCamera) {
            var position = this.camera.position;
            this.__offset.copy(position).sub(this.target);
            var targetDistance = this.__offset.length();

            // half of the fov is center to top of screen
            targetDistance *= Math.tan(((this.camera.fov / 2) * Math.PI) / 180.0);

            // we use only clientHeight here so aspect ratio does not distort speed
            this.panLeft(
                (2 * deltaX * targetDistance) / element.clientHeight,
                this.camera.matrix
            );
            this.panUp(
                (2 * deltaY * targetDistance) / element.clientHeight,
                this.camera.matrix
            );
        } else if (this.camera.isOrthographicCamera) {
            this.panLeft(
                (deltaX * (this.camera.right - this.camera.left)) /
                this.camera.zoom /
                element.clientWidth,
                this.camera.matrix
            );
            this.panUp(
                (deltaY * (this.camera.top - this.camera.bottom)) /
                this.camera.zoom /
                element.clientHeight,
                this.camera.matrix
            );
        } else {
            console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
            );
            this.enablePan = false;
        }
    }

    dollyIn(dollyScale) {
        if (this.camera.isPerspectiveCamera) {
            this.__scale /= dollyScale;
        } else if (this.camera.isOrthographicCamera) {
            this.camera.zoom = Math.max(
                this.minZoom,
                Math.min(this.maxZoom, this.camera.zoom * dollyScale)
            );
            this.camera.updateProjectionMatrix();
            this.__zoomChanged = true;
        } else {
            console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
            );
            this.enableZoom = false;
        }
    }

    dollyOut(dollyScale) {
        if (this.camera.isPerspectiveCamera) {
            this.__scale *= dollyScale;
        } else if (this.camera.isOrthographicCamera) {
            this.camera.zoom = Math.max(
                this.minZoom,
                Math.min(this.maxZoom, this.camera.zoom / dollyScale)
            );
            this.camera.updateProjectionMatrix();
            this.__zoomChanged = true;
        } else {
            console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
            );
            this.enableZoom = false;
        }
    }

    /**
     *
     * @param {KeyboardInput} _
     * @param {MouseInput} $
     * @param {MouseEvent} event
     */
    handleMouseMoveRotate(_, $, event) {
        this.__rotateDelta.set(event.movementX, event.movementY);
        this.__rotateDelta.multiplyScalar(this.rotateSpeed);
        this.rotateLeft(
            (2 * Math.PI * this.__rotateDelta.x) / this.domElement.clientHeight
        ); // yes, height
        this.rotateUp(
            (2 * Math.PI * this.__rotateDelta.y) / this.domElement.clientHeight
        );
        this.update();
    }

    /**
     *
     * @param {KeyboardInput} _
     * @param {MouseInput} $
     * @param {MouseEvent} event
     */
    handleMouseMoveDolly(_, $, event) {
        this.__dollyDelta.set(event.movementX, event.movementY);
        if (this.__dollyDelta.y > 0) {
            this.dollyIn(this.zoomScale);
        } else if (this.__dollyDelta.y < 0) {
            this.dollyOut(this.zoomScale);
        }
        this.update();
    }

    /**
     *
     * @param {KeyboardInput} _
     * @param {MouseInput} $
     * @param {MouseEvent} event
     */
    handleMouseMovePan(_, $, event) {
        this.__panDelta = new THREE.Vector2(event.movementX, event.movementY);
        this.__panDelta.multiplyScalar(this.panSpeed);
        this.pan(this.__panDelta.x, this.__panDelta.y);
        this.update();
    }

    /**
     *
     * @param {KeyboardInput} _
     * @param {MouseInput} $
     * @param {WheelEvent} event
     */
    handleMouseWheel(_, $, event) {
        if (event.deltaY < 0) {
            this.dollyOut(this.zoomScale);
        } else if (event.deltaY > 0) {
            this.dollyIn(this.zoomScale);
        }
        this.update();
    }

    /**
     *
     * @param {Viewport} viewport
     */
    captureInputs(viewport) {
        // Pan events
        viewport.capture(InputManager.EVENT_TYPE.MOUSE_MOVE, {
            button: InputManager.BUTTON.LEFT,
            shift: true,
            fn: this.handleMouseMovePan.bind(this)
        });

        viewport.capture(InputManager.EVENT_TYPE.MOUSE_MOVE, {
            button: InputManager.BUTTON.RIGHT,
            fn: this.handleMouseMovePan.bind(this)
        });

        // Rotate Events
        viewport.capture(InputManager.EVENT_TYPE.MOUSE_MOVE, {
            button: InputManager.BUTTON.LEFT,
            fn: this.handleMouseMoveRotate.bind(this)
        });

        // Dolly Events
        viewport.capture(InputManager.EVENT_TYPE.MOUSE_MOVE, {
            button: InputManager.BUTTON.MIDDLE,
            fn: this.handleMouseMoveDolly.bind(this)
        });

        viewport.capture(InputManager.EVENT_TYPE.MOUSE_WHEEL, {
            fn: this.handleMouseWheel.bind(this)
        });
    }

    saveState() {
        this.target0.copy(this.target);
        this.position0.copy(this.camera.position);
        this.zoom0 = this.camera.zoom;
    }

    reset() {
        this.target.copy(this.target0);
        this.camera.position.copy(this.position0);
        this.camera.zoom = this.zoom0;

        this.camera.updateProjectionMatrix();
        this.dispatchEvent(changeEvent);

        this.update();
    }

    update() {
        this.__offset.copy(this.camera.position).sub(this.target);

        this.__offset.applyQuaternion(this.__quat);

        // angle from z-axis around y-axis
        this.__spherical.setFromVector3(this.__offset);

        this.__spherical.theta += this.__sphericalDelta.theta;
        this.__spherical.phi += this.__sphericalDelta.phi;

        // restrict angles to be between desired limits
        this.__spherical.theta = Math.max(
            this.minAzimuthAngle,
            Math.min(this.maxAzimuthAngle, this.__spherical.theta)
        );
        this.__spherical.phi = Math.max(
            this.minPolarAngle,
            Math.min(this.maxPolarAngle, this.__spherical.phi)
        );

        this.__spherical.makeSafe();

        this.__spherical.radius *= this.__scale;

        // restrict radius to be between desired limits
        this.__spherical.radius = Math.max(
            this.minDistance,
            Math.min(this.maxDistance, this.__spherical.radius)
        );

        // move target to panned location
        this.target.add(this.__panOffset);

        this.__offset.setFromSpherical(this.__spherical);

        this.__offset.applyQuaternion(this.__quatInverse);

        this.camera.position.copy(this.target).add(this.__offset);

        this.camera.lookAt(this.target);

        this.viewport.requestAudience();

        if (this.enableDamping === true) {
            this.__sphericalDelta.theta *= 1 - this.dampingFactor;
            this.__sphericalDelta.phi *= 1 - this.dampingFactor;

            this.__panOffset.multiplyScalar(1 - this.dampingFactor);
        } else {
            this.__sphericalDelta.set(0, 0, 0);
            this.__panOffset.set(0, 0, 0);
        }

        this.__scale = 1;

        if (
            this.__zoomChanged ||
            this.__lastPosition.distanceToSquared(this.camera.position) >
            this.__EPS ||
            8 * (1 - this.__lastQuaternion.dot(this.camera.quaternion)) > this.__EPS
        ) {
            this.__lastPosition.copy(this.camera.position);
            this.__lastQuaternion.copy(this.camera.quaternion);
            this.__zoomChanged = false;

            return true;
        }

        return false;
    }
}
