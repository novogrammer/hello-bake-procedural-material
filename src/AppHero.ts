import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getElementSize } from "./dom_utils";

interface ThreeObjects{
  scene:THREE.Scene;
  camera:THREE.PerspectiveCamera;
  renderer:THREE.WebGLRenderer;
  orbitControls:OrbitControls;
  // cube:THREE.Mesh;
  suzanne?:THREE.Mesh;
}


export default class AppHero{
  sectionHeroElement:HTMLElement;
  threeObjects:ThreeObjects;
  constructor(){
    {
      const sectionHeroElement = document.querySelector<HTMLElement>(".p-section-hero");
      if(!sectionHeroElement){
        throw new Error("sectionHeroElement is null")
      }
  
      this.sectionHeroElement=sectionHeroElement;
    }


  
    const {width,height}=getElementSize(this.sectionHeroElement);
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.set(0,1,5);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.shadowMap.enabled=true;
    renderer.setAnimationLoop( (time: DOMHighResTimeStamp, frame: XRFrame)=>{
      this.onTick(time,frame);
    } );
    this.sectionHeroElement.appendChild( renderer.domElement );

    const orbitControls=new OrbitControls(camera,renderer.domElement);



    {
      const ambientLight=new THREE.AmbientLight(0xffffff,0.6);
      scene.add(ambientLight);
    }
    {
      const directionalLight=new THREE.DirectionalLight(0xffffff,2.0);
      directionalLight.position.set(0,5,10);
      directionalLight.shadow.normalBias=0.05;
      directionalLight.castShadow=true;
      scene.add(directionalLight);
    }

    {
      const geometry=new THREE.PlaneGeometry(10,10);
      const material=new THREE.MeshStandardMaterial({
        color:0xffffff,
        roughness:0.8,
        metalness:0,
      })
      const ground:THREE.Mesh=new THREE.Mesh(geometry,material);
      ground.receiveShadow=true;
      ground.rotation.x=-90*THREE.MathUtils.DEG2RAD;
      scene.add(ground);
    }

    {
      const loader = new GLTFLoader();
      loader.loadAsync("./hello-bake-procedural-material.glb").then((gltf)=>{
        gltf.scene.traverse((object3D)=>{
          if(object3D instanceof THREE.Mesh){
            this.threeObjects.suzanne=object3D;
            object3D.castShadow=true;
            object3D.receiveShadow=true;
            scene.add(object3D);
          }
        });
      }).catch((error)=>{
        console.error(error);
      })
    }

    
    // let cube:THREE.Mesh;
    // {
    //   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //   const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    //   cube = new THREE.Mesh( geometry, material );
    //   cube.castShadow=true;
    //   cube.receiveShadow=true;
    //   cube.position.set(2,1,0);
    //   scene.add( cube );
    // }
    


    this.threeObjects={
      scene,
      camera,
      renderer,
      orbitControls,
      // cube,
      suzanne:undefined,
    }
    window.addEventListener("resize",()=>{
      this.onResize();
    });
    this.onResize();
    
  
  }
  onTick(_time: DOMHighResTimeStamp, _frame: XRFrame){
    const {
      scene,
      camera,
      renderer,
      // cube,
    }=this.threeObjects;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
  
    renderer.render( scene, camera );

  }
  onResize(){
    const {width,height}=getElementSize(this.sectionHeroElement);
    const {
      camera,
      renderer,
    }=this.threeObjects;

    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.updateProjectionMatrix();
    

  }
}