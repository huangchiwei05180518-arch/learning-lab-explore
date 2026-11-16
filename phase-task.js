(()=>{'use strict';
const slider=document.getElementById('phaseAngle'),label=document.getElementById('phaseTask'),box=label.parentElement,buttons=[...document.querySelectorAll('[data-phase]')];
const tasks=[{prompt:'讓右圖只亮一半。',pass:a=>Math.abs(Math.cos(a*Math.PI/180))<.04,done:'找到了！太陽與月球方向約成直角。'},{prompt:'讓右圖出現滿月。',pass:a=>Math.abs(a-180)<3,done:'滿月！月球在太陽的相反方向。'},{prompt:'讓右圖的亮面消失。',pass:a=>a<3||a>357,done:'新月！亮面朝向太陽，背對地球。'}];let task=0,touched=false;
function render(){const angle=+slider.value,passed=touched&&tasks[task].pass(angle);label.textContent=passed?tasks[task].done:`挑戰 ${task+1}/3：${tasks[task].prompt}`;box.classList.toggle('done',passed);buttons.forEach(b=>b.setAttribute('aria-pressed',String(angle%360===+b.dataset.phase)));}
function observe(){touched=true;render()}
slider.addEventListener('input',observe);buttons.forEach(b=>b.addEventListener('click',observe));document.getElementById('phaseOrbit').addEventListener('pointerup',observe);document.getElementById('nextTask').addEventListener('click',()=>{task=(task+1)%tasks.length;touched=false;render()});render();
})();
