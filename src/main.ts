import AppHero from './AppHero';
import './style.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section class="p-section-hero"></section
`


async function mainAsync(){
  (window as any).appHero=new AppHero();

}


mainAsync().catch((error)=>{
  console.error(error);
})
