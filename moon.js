'use strict';
window.MOON_TARGETS=[{label:'雨海附近',orbit:'-105.5deg 57.3deg 125%'},{label:'哥白尼坑附近',orbit:'-108.3deg 80.4deg 110%'},{label:'月球背面',orbit:'90deg 90deg 125%'}];
(()=>{
 const stage=document.getElementById('modelStage'), button=document.getElementById('loadMoon'), reset=document.getElementById('resetMoon'), status=document.getElementById('modelStatus');
 let busy=false, viewer=null, timeout=null, attempt=0, pendingMission=null;
 function focusMission(n){pendingMission=n;if(!viewer||!stage.classList.contains("loaded"))return;const m=window.MOON_TARGETS[n];if(!m)return;viewer.setAttribute("camera-orbit",m.orbit);viewer.setAttribute("camera-target","0m 0m 0m");status.textContent="已轉向："+m.label+"。仍可自由拖曳觀察。";}
 document.addEventListener("moon-focus",e=>{focusMission(e.detail);if(!viewer&&!busy)button.onclick();});
 function fail(message){clearTimeout(timeout);busy=false;attempt++;if(viewer){viewer.remove();viewer=null;}stage.classList.remove('loaded');button.hidden=false;button.disabled=false;button.textContent='重新嘗試載入';reset.disabled=true;status.textContent=message+' 你仍可繼續翻頁，或開啟下方 NASA 來源觀看。';}
 button.onclick=async()=>{
  if(busy)return;const probe=document.createElement('canvas');if(typeof probe.getContext==='function'){let gl=null;try{gl=probe.getContext('webgl2')||probe.getContext('webgl')}catch(e){}if(!gl){fail('目前裝置無法啟用 3D 顯示。');return}gl.getExtension('WEBGL_lose_context')?.loseContext();}busy=true;button.disabled=true;status.textContent='正在下載互動檢視器與模型，首次載入可能需要一些時間…';let id=++attempt;
  timeout=setTimeout(()=>{if(id===attempt)fail('載入逾時。');},45000);
  try{
   await import('./assets/model-viewer.min.js');await customElements.whenDefined('model-viewer');if(id!==attempt)return;
   viewer=document.createElement('model-viewer');
   Object.entries({src:'./assets/moon.glb',alt:'NASA 月球表面三維模型，可拖曳旋轉觀察', 'camera-controls':'','touch-action':'pan-y','camera-orbit':'0deg 75deg 125%','min-camera-orbit':'auto 10deg 60%','max-camera-orbit':'auto 170deg 150%','interaction-prompt':'none','interpolation-decay':'120','shadow-intensity':'0',exposure:'1',tabindex:'0'}).forEach(([k,v])=>viewer.setAttribute(k,v));
   viewer.addEventListener('load',()=>{if(id!==attempt)return;clearTimeout(timeout);stage.classList.add('loaded');busy=false;button.hidden=true;reset.disabled=false;status.textContent='已載入 · 拖曳旋轉，雙指或滾輪縮放。';if(pendingMission!==null)focusMission(pendingMission);});
   viewer.addEventListener('error',()=>{if(id===attempt)fail('這次無法顯示 3D 模型，可能是連線或裝置的 WebGL 支援問題。');});stage.append(viewer);
  }catch(e){if(id===attempt)fail('互動檢視器無法載入。');}
 };
 reset.onclick=()=>{if(viewer){viewer.setAttribute('camera-orbit','0deg 75deg 125%');viewer.setAttribute('camera-target','auto auto auto');status.textContent='已回到初始視角。';}};
})();

document.querySelectorAll('[data-dialog]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.dialog).showModal()));document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
