import { ArcRotateCamera, AxesViewer, Color3, Engine, HemisphericLight, MeshBuilder, PBRMaterial, Scene, StandardMaterial, Tools, Vector3, VideoTexture } from "@babylonjs/core";

export class SceneManage {
  engine: Engine;
	scene: Scene;
  selectedMesh: any

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.selectedMesh = ''
    this.CreateArcCamera()
    this.createHemisphericLight("light1", 0.5, { x: 1, y: 1, z: 1 })
    this.CreateBox()  
    this.CreateSphere()
    
    this.runRenderLoop()
    this.resizeScene()
  }

  initScene() {
    
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    // const  axer = new AxesViewer(scene, 3)
    return scene
  }

  CreateArcCamera(): ArcRotateCamera {
    const camera3D = new ArcRotateCamera("ArcRotateCamera", 
      Math.PI / 4,               // alpha 
      Math.PI / 4,               // beta 
      20,                        // radius
      new Vector3(0, 0, 0),      //
      this.scene
    );
    camera3D.attachControl(this.canvas, true);
    // camera3D.panningSensibility = 0
    camera3D.panningSensibility = 500; 
  
    camera3D.upperBetaLimit = Math.PI / 2.2;
    // camera3D.wheelPrecision = 100
    camera3D.minZ = 0.1
    camera3D.lowerRadiusLimit = 2;    
    camera3D.upperRadiusLimit = 50;   
  
    return camera3D;
  }

  createHemisphericLight(name: string, intensity: number, direction: { x: number; y: number; z: number }): HemisphericLight {
    const light = new HemisphericLight(name, new Vector3(direction.x, direction.y, direction.z), this.scene);
    return light;
  }

  CreateBox() {
    const box = MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
    box.id = Tools.RandomId()
    const videoMat = new StandardMaterial("videoMat", this.scene);
    box.material = videoMat;
    return box
  }

  CreateSphere() {
    const sphere = MeshBuilder.CreateSphere("shpere", { diameter: 2 }, this.scene);
    sphere.position.set(3, 0, 0)
    sphere.id = Tools.RandomId()
    const mat = new PBRMaterial("mat", this.scene);
    sphere.material = mat;  
    return sphere
  }

  
  updateSelectedMesh(mesh: any) {
    if (this.selectedMesh) {
      this.selectedMesh.showBoundingBox = false; 
    }
    this.selectedMesh = mesh;
    
    if (mesh) {
      mesh.showBoundingBox = true; 
      
    }
  }

  pickMesh = (pointerEvent: any) => {
    const pickResult = this.scene.pick(pointerEvent.clientX, pointerEvent.clientY - 30);
    if (pickResult && pickResult.hit) {
      return pickResult.pickedMesh;
    }
    return null;
  } 

  pointerDown = (event: any) => {
    const clickedMesh = this.pickMesh(event);
    if (clickedMesh && clickedMesh.name !== 'ground') {
      this.updateSelectedMesh(clickedMesh)
      return clickedMesh
    }
  }

  runRenderLoop() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  resizeScene() {
    if(this.engine) {
      window.addEventListener('resize', () => {
        this.engine.resize();
      });
    }
  }
}
