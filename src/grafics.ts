import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface principal {
    canvas: HTMLCanvasElement;
    escena: THREE.Scene;
    camara: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    colorFons: string;
    controls: OrbitControls;
  }

class Grafics {
    public static colors: THREE.Texture[] = [];
    public static bomba: THREE.Texture;
    public static cover: THREE.Texture;
    public static bandera: THREE.Texture;
    public static raycaster: THREE.Raycaster;

    static crearBasic(canvas: HTMLCanvasElement, color: string): principal {
        const colorFons: string = color;
        const escena: THREE.Scene = new THREE.Scene();
        escena.background = new THREE.Color(colorFons);
        const camara: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camara.position.z = 10;

        escena.add(camara);

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        escena.add( light );

        const geometriaTauler: THREE.BoxGeometry = new THREE.BoxGeometry(5,5,5);
        const materialTauler: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" });
        const tauler: THREE.Mesh = new THREE.Mesh(geometriaTauler, materialTauler);
        console.log(tauler);
        escena.add(tauler);

        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(2);
        const controls: OrbitControls = new OrbitControls(camara, canvas);
        controls.enableDamping = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
        }
        const grafics: principal = { canvas, escena, camara, renderer, colorFons, controls };

        this.loop(grafics);

        return grafics;
    }

    static crearTauler(files: number, columnes: number, colorTauler: string, escena: THREE.Scene, tamanyTauler: number): THREE.Mesh {
        const geometriaTauler: THREE.BoxGeometry = new THREE.BoxGeometry(files * tamanyTauler, columnes * tamanyTauler, tamanyTauler * 0.1);
        const materialTauler: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: colorTauler });
        const tauler: THREE.Mesh = new THREE.Mesh(geometriaTauler, materialTauler);
        escena.add(tauler);

        return tauler;
    }

    static crearCaixa(files: number, columnes: number, escena: THREE.Scene, posicioX: number, posicioY: number, colorCaixa: string, tamanyTauler: number): THREE.Mesh {
        const geometriaCaixa: THREE.BoxGeometry = new THREE.BoxGeometry(tamanyTauler * 0.9, tamanyTauler * 0.9, tamanyTauler * 0.3);

        // const texture = new THREE.TextureLoader().load('../img/square.gif');

        const materialCaixa: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: this.cover });

        materialCaixa.needsUpdate = true

        const caixa: THREE.Mesh = new THREE.Mesh(geometriaCaixa, materialCaixa);

        caixa.position.x = posicioX * tamanyTauler - (files * tamanyTauler / 2) + tamanyTauler / 2;
        caixa.position.y = posicioY * tamanyTauler - (columnes * tamanyTauler / 2) + tamanyTauler / 2;
        caixa.position.z = tamanyTauler * 0.05;

        escena.add(caixa);

        return caixa;
    }

    static reSize(grafics: principal, width: number, height: number) {
        grafics.camara.aspect = width / height;
        grafics.camara.updateProjectionMatrix();
        grafics.renderer.setSize(width, height);

        grafics.renderer.render(grafics.escena, grafics.camara);
    }

    static render(grafics: principal) {
        grafics.renderer.render(grafics.escena, grafics.camara);
        
        grafics.controls.update();
    }

    static loop(grafics: principal) {
        this.render(grafics);

        window.requestAnimationFrame(() => this.loop(grafics));
    }
}

export default Grafics;