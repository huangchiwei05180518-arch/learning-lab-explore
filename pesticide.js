'use strict';
const pages=[...document.querySelectorAll('.page')], picker=document.getElementById('pagePicker');
const names=['農藥是什麼','細菌製成的農藥','效果與代價','抗藥性','整合管理','施藥之後','殘留與法規','回到廚房'];
let current=0;
names.forEach((name,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${String(i+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')} · ${name}`;picker.append(o)});
function show(i,focus=false){current=Math.max(0,Math.min(pages.length-1,i));pages.forEach((p,n)=>p.hidden=n!==current);picker.value=current;document.getElementById('previous').disabled=current===0;document.getElementById('next').textContent=current===pages.length-1?'↺':'→';history.replaceState(null,'',`#page=${current+1}`);window.scrollTo(0,0);document.querySelector('main').scrollTop=0;document.getElementById('next').setAttribute('aria-label',current===pages.length-1?'重新閱讀':'下一頁');if(focus)pages[current].focus({preventScroll:true});}
document.getElementById('previous').onclick=()=>show(current-1,true);document.getElementById('next').onclick=()=>show((current+1)%pages.length,true);picker.onchange=()=>show(Number(picker.value),true);
function fromHash(){const m=location.hash.match(/^#page=(\d+)$/);show(m?Number(m[1])-1:0)}
window.addEventListener('hashchange',fromHash);document.addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();show((current+1)%pages.length,true)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1,true)}});
let touch=null;document.querySelector('main').addEventListener('touchstart',e=>{touch=null;if(e.target.closest('input,button,a,select,summary'))return;touch={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}},{passive:true});document.querySelector('main').addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>90&&Math.abs(dx)>Math.abs(dy)*2)show(dx<0?Math.min(pages.length-1,current+1):current-1,true)},{passive:true});
document.querySelector('main').addEventListener('touchcancel',()=>{touch=null},{passive:true});
function pressed(attr,value){document.querySelectorAll(`[${attr}]`).forEach(b=>b.setAttribute('aria-pressed',b.getAttribute(attr)===value?'true':'false'))}
const reports={detected:['有檢出，不一定不合格。','先核對檢出的是哪種農藥、用在哪種作物，再把含量與適用規定比較。單看「檢出」兩字，還不能判定合不合格。'],over:['超標應依法處理，風險另須評估。','不合格產品應依查驗或召回處置；健康影響還要看農藥種類與實際暴露。清洗不能替不合格食品重新發合格證。'],unlisted:['查不到限量，不代表可以任意使用。','臺灣對未訂容許量的項目，原則上不得檢出，但依法免訂的項目另有規定。判斷時要查適用標準，不能直接套用別的國家數值。']};
const washes={leaf:['葉片撥開，才能洗到縫隙。','小葉菜一片片撥開清洗，留意凹面與葉柄間的泥沙。'],tomato:['先洗表面，再去蒂、切塊。','番茄、甜椒等果菜，先清洗後再去除蒂頭；表面不平整處可用軟毛刷輕刷沖洗。'],berry:['草莓洗乾淨，再去蒂。','保持果實完整清洗，洗完再去除蒂頭；清洗不是保證所有殘留歸零。']};

const washPhotos={
 leaf:{src:'assets/pesticide-bok.jpg',alt:'整把小白菜，白色葉柄緊密相疊',caption:'小白菜實拍：葉柄相疊的縫隙也要撥開清洗。',credit:'Jeffery Martin / Ksarasola · CC0 ↗',url:'https://commons.wikimedia.org/wiki/File:Bok_choy_bunches.jpg'},
 tomato:{src:'assets/pesticide-tomatoes.jpg',alt:'帶有蒂頭的番茄實拍',caption:'番茄表面與蒂頭實拍。',credit:'Ivan Timov · CC0 ↗',url:'https://commons.wikimedia.org/wiki/File:Healthy_Vegetables_(Unsplash).jpg'},
 berry:{src:'assets/pesticide-strawberries.jpg',alt:'保留綠色蒂頭的草莓實拍',caption:'草莓實拍：清洗時先保留蒂頭。',credit:'MartinThoma · CC0 ↗',url:'https://commons.wikimedia.org/wiki/File:Strawberries-1.jpg'}
};
function updateWashPhoto(key){const p=washPhotos[key];document.getElementById('washPhoto').setAttribute('src',p.src);document.getElementById('washPhoto').setAttribute('alt',p.alt);document.getElementById('washPhotoLink').setAttribute('href',p.src);document.getElementById('washPhotoCaption').textContent=p.caption;document.getElementById('washPhotoCredit').textContent=p.credit;document.getElementById('washPhotoCredit').setAttribute('href',p.url)}
for(const [kind,data] of [['report',reports],['wash',washes]])document.querySelectorAll(`[data-${kind}]`).forEach(b=>b.onclick=()=>{const key=b.dataset[kind];pressed(`data-${kind}`,key);document.getElementById(kind+'Title').textContent=data[key][0];document.getElementById(kind+'Text').textContent=data[key][1];if(kind==='wash')updateWashPhoto(key)});
fromHash();
