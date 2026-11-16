(()=>{'use strict';const main=document.querySelector('main');let start=null;const excluded='button,a,input,select,textarea,model-viewer,.model-stage,#phaseOrbit,dialog,.step-tabs';main.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest(excluded)){start=null;return}start={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});main.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.6)document.getElementById(dx<0?'pageNext':'pagePrev').click()},{passive:true});
main.addEventListener('touchcancel',()=>{start=null},{passive:true});
function detail(parent,nodes,label){if(!nodes.length)return;const d=document.createElement('dialog'),b=document.createElement('button'),close=document.createElement('button');b.textContent=label;b.className='read-more';close.textContent='×';close.setAttribute('aria-label','收起說明');close.className='close-dialog';d.className='detail-sheet';close.onclick=()=>d.close();d.append(close,...nodes);parent.append(b,d);b.onclick=()=>d.showModal();d.addEventListener('click',e=>{if(e.target===d)d.close()});}
// Keep complete prose available without forcing every reader through a long slide.
document.querySelectorAll('.story-copy').forEach(c=>{const fine=[...c.querySelectorAll(':scope > .fine')];detail(c,fine,'製作與授權備註 ↗')});
const scale=document.querySelector('.scale');detail(scale,[...scale.querySelectorAll(':scope > .scale-facts,:scope > .fine')],'數值與來源 ↗');const phases=document.getElementById('phases');detail(phases,[...phases.querySelectorAll(':scope > .fine')],'實驗說明與來源 ↗');
if(matchMedia('(max-width:700px)').matches){const m=document.querySelector('.moon-missions');if(m){detail(m,[m.querySelector('small')].filter(Boolean),'定位說明 ↗')}

}
})();
