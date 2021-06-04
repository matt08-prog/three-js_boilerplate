import {OrbitControls} from '../vendor/OrbitControls.js'
import * as THREE from "../vendor/three.module.js";
import { GUI } from "../vendor/dat.gui.module.js";
import { Stats } from "../vendor/stats.module.js";
import { Input } from "./input.js"

class App {
    constructor(){
        var stats, scene, renderer;
        var camera, cameraControls;

        if (!init()) animate();

        // init the scene
        function init() {
            console.log("Press F to go fullscreen and S to show/hide stats")
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.outputEncoding = THREE.sRGBEncoding;

            // renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById("container").appendChild(renderer.domElement);

            // add Stats.js - https://github.com/mrdoob/stats.js
            stats = new Stats();
            stats.domElement.style.position = "absolute";
            stats.domElement.style.bottom = "0px";
            document.body.appendChild(stats.domElement);

            // create a scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x858585);
            // put a camera in the scene
            camera = new THREE.PerspectiveCamera(
                35,
                window.innerWidth / window.innerHeight,
                1,
                10000
            );
            camera.position.set(0, 0, 5);
            scene.add(camera);

            // create a camera contol
            cameraControls = new OrbitControls(camera, renderer.domElement);
            cameraControls.enableDamping = true;
            cameraControls.dampingFactor = 0.25;
            cameraControls.enableZoom = true;
            cameraControls.autoRotate = true;
            cameraControls.autoRotateSpeed = 5.0;
            cameraControls.minDistance = 4.0;
            cameraControls.keyPanSpeed = 0;

            // transparently support window resize
            THREEx.WindowResize.bind(renderer, camera);

            // allow 'f' to go fullscreen where this feature is supported
            if (THREEx.FullScreen.available()) {
                THREEx.FullScreen.bindKey();
            }

            // here you add your objects
            // - you will most likely replace this part by your own
            var geometry = new THREE.TorusGeometry(1, 0.42);
            var material = new THREE.MeshNormalMaterial();
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const gui = new GUI();
            const input = new Input()
            
        }

        // animation loop
        function animate() {
        // loop on request animation loop
        // - it has to be at the begining of the function
        // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        requestAnimationFrame(animate);

        // do the render
        render();

        // update stats
        stats.update();
        }

        // render the scene
        function render() {
        // update camera controls
        cameraControls.update();

        // actually render the scene
        renderer.render(scene, camera);
        }
    }
}

export { App }