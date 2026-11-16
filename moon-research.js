'use strict';
const pages=[...document.querySelectorAll('.page')], picker=document.getElementById('pagePicker');
const names=['換到月球','粒子從哪裡來','地球磁場','留下的歷史','觀測位置','早期宇宙','天線陣列','月球時間','再看月亮'];
let current=0;
names.forEach((name,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${String(i+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')} · ${name}`;picker.append(o)});
function show(i,focus=false){current=Math.max(0,Math.min(pages.length-1,i));pages.forEach((p,n)=>p.hidden=n!==current);picker.value=current;document.getElementById('previous').disabled=current===0;document.getElementById('next').textContent=current===pages.length-1?'↺':'→';history.replaceState(null,'',`#page=${current+1}`);window.scrollTo(0,0);document.getElementById('next').setAttribute('aria-label',current===pages.length-1?'重新閱讀':'下一頁');if(focus)pages[current].focus({preventScroll:true});}
document.getElementById('previous').onclick=()=>show(current-1,true);document.getElementById('next').onclick=()=>show((current+1)%pages.length,true);picker.onchange=()=>show(Number(picker.value),true);
function fromHash(){const m=location.hash.match(/^#page=(\d+)$/);show(m?Number(m[1])-1:0)}
window.addEventListener('hashchange',fromHash);document.addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA|BUTTON|SUMMARY|A/.test(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();show((current+1)%pages.length,true)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1,true)}});
let touch=null;document.querySelector('main').addEventListener('touchstart',e=>{touch=null;if(e.target.closest('input,button,a,select,summary'))return;touch={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}},{passive:true});document.querySelector('main').addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>90&&Math.abs(dx)>Math.abs(dy)*2)show(dx<0?Math.min(pages.length-1,current+1):current-1,true)},{passive:true});
document.querySelector('main').addEventListener('touchcancel',()=>{touch=null},{passive:true});
function pressed(attr,value){document.querySelectorAll(`[${attr}]`).forEach(b=>b.setAttribute('aria-pressed',b.getAttribute(attr)===value?'true':'false'))}
const grain={sun:['太陽一直在向月球送來粒子。','太陽向外噴出的帶電粒子流叫太陽風。當粒子撞上月面，氦、氖這類不易與其他物質反應的氣體，就可能留在月壤中。'],earth:['地球大氣中的粒子，也可能抵達月球。','模擬與樣本研究支持：地球大氣的部分帶電粒子，能沿著地球磁場延伸的區域抵達月球。找到保存良好的古月壤，便可能追查更早的大氣線索。']};
document.querySelectorAll('[data-grain]').forEach(b=>b.onclick=()=>{pressed('data-grain',b.dataset.grain);const a=grain[b.dataset.grain];document.getElementById('grainTitle').textContent=a[0];document.getElementById('grainText').textContent=a[1];const earth=b.dataset.grain==='earth';document.getElementById('grainDiagramLabel').textContent=earth?'地球大氣：部分帶電粒子抵達月面':'太陽風：太陽送出的帶電粒子';document.getElementById('grainDiagram').setAttribute('aria-label',earth?'地球大氣粒子抵達並留在月壤顆粒的概念示意':'太陽風粒子進入月壤顆粒的示意圖')});
document.querySelectorAll('[data-radio]').forEach(b=>b.onclick=()=>{let far=b.dataset.radio==='far';pressed('data-radio',b.dataset.radio);document.getElementById('receiver').setAttribute('transform',`translate(${far?430:290} 105)`);document.getElementById('radioTitle').textContent=far?'移到背面，月球擋在地球與儀器之間。':'正面的儀器，仍然朝著地球。';document.getElementById('radioText').textContent=far?'月球本體能大幅削弱來自地球的無線電干擾，讓某些微弱訊號比較容易被研究。但波會繞過障礙邊緣，太陽與附近設備也會帶來干擾，並非完全安靜。':'地球上的廣播與通訊設備會發出無線電波。這種能在真空中傳播的電磁波，也可能蓋過儀器想接收的微弱宇宙訊號。'});
document.getElementById('days').oninput=e=>{let d=Number(e.target.value);document.getElementById('daysValue').textContent=`${d} 天`;document.getElementById('clockDelta').textContent=d*56<1000?`${d*56} μs`:`${(d*56/1000).toFixed(3)} ms`};
fromHash();
// Exclusive, explicit display choices; the selected label always matches the visible panel.
function selectVisual(name, mode) {
  for (const option of ['photo','diagram']) {
    const selected = option === mode;
    const button = document.getElementById(`view-${name}-${option}`);
    button.setAttribute('aria-pressed', String(selected));
    button.textContent = (selected ? '✓ ' : '') + (option === 'photo' ? '實拍照片' : '機制示意圖');
    document.getElementById(`${name}-${option}`).hidden = !selected;
  }
}
for (const name of ['soil','farside']) {
  for (const mode of ['photo','diagram']) document.getElementById(`view-${name}-${mode}`).onclick = () => selectVisual(name, mode);
  selectVisual(name, 'photo');
}
// Existing source/receiver controls show the diagram and update the selected display label together.
for (const [kind,name] of [['grain','soil'],['radio','farside']]) {
  document.querySelectorAll(`[data-${kind}]`).forEach(button => {
    const prior = button.onclick;
    button.onclick = event => { selectVisual(name, 'diagram'); prior(event); };
  });
}
