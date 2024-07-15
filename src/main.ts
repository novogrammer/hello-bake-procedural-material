import './style.scss'
import * as THREE from "three";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section class="p-section-hero"></section
`


async function mainAsync(){
  const sectionHeroElement = document.querySelector<HTMLElement>(".p-section-hero");
  if(!sectionHeroElement){
    throw new Error("sectionHeroElement is null")
  }


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animate );
  sectionHeroElement.appendChild( renderer.domElement );
  
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  
  camera.position.z = 5;
  
  function animate() {
  
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  
    renderer.render( scene, camera );
  
  }


}


mainAsync().catch((error)=>{
  console.error(error);
})
