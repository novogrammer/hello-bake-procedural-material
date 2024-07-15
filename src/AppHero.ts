import * as THREE from "three";
import { getElementSize } from "./dom_utils";

interface ThreeObjects{
  scene:THREE.Scene;
  camera:THREE.PerspectiveCamera;
  renderer:THREE.WebGLRenderer;
  cube:THREE.Mesh;
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
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.setAnimationLoop( (time: DOMHighResTimeStamp, frame: XRFrame)=>{
      this.onTick(time,frame);
    } );
    this.sectionHeroElement.appendChild( renderer.domElement );
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;


    this.threeObjects={
      scene,
      camera,
      renderer,
      cube,
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
      cube,
    }=this.threeObjects;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  
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