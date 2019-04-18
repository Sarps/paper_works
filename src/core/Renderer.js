const THREE = require("three");

import { FrustrumViewport, PlaneViewport } from "./viewports";
import { InputManager } from "./inputs";

export default class Renderer {

    constructor() {
        this.screen = document.querySelector("#screen");
        this.viewport = new FrustrumViewport({ screen: this.screen });
        //this.viewport = new PlaneViewport({screen: this.screen})

        let rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
        let rollOverMesh = new THREE.Mesh(rollOverGeo, this.viewport.material);

        // raycaster
        let raycaster = new THREE.Raycaster();

        let { scene } = this.viewport;
        scene.add(rollOverMesh);

        this.viewport.requestAudience();

        screen.ondrag = () => {
            console.log("dragstart");
        };
    }
}
