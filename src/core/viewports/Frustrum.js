const THREE = require("three");
import Base from "./Base";

import { CameraControls } from "../controls";
import { InputManager } from "../inputs";

export default class Frustrum extends Base {
    constructor(options) {
        super(options);

        this.setupGrid()
        this.setupControls()
        this.setupMaterial()

    }

    setupMaterial() {
        
        let color = new THREE.Color(0xff0000)
        this.material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true })
        this.material.color = color

        this.capture(InputManager.EVENT_TYPE.KEY_PRESS, {
            key: 'z',
            fn: function () {
                this.material.wireframe = !this.material.wireframe
                if (color.getHex() == 0x000)
                    color.setHex(0xff0000)
                else color.setHex(0x000)
                this.requestAudience()
            }.bind(this)
        }) 
    }

    setupGrid() {
        var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
        geometry.rotateX(-Math.PI / 2);
        let plane = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({ visible: false })
        );

        let grid = new THREE.GridHelper(1000, 20, "#003fa1", "#02c64c");
        this.scene.add(grid);

    }

    setupControls() {
        this.controls = new CameraControls(this.camera, this.screen, this);
    }


}
