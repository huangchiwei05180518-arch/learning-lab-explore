const data={
  "juniper": {
    "name": "玉山圓柏",
    "kind": "植物",
    "tag": "樹形會隨環境改變",
    "text": "在風強、土壤貧瘠的地方，玉山圓柏可長成低矮、彎曲甚至匍匐的形態；在較受遮蔽的山凹或林間，也能長成直立大樹。",
    "fact": "同一種植物，不一定只有一種長相。低矮不是它永遠長不高，而可能與所在環境有關。",
    "source": "https://www.ysnp.gov.tw/Child/StaticPage/PK001",
    "img": "assets/eco-juniper.jpg",
    "alt": "玉山近頂低伏的玉山圓柏實拍",
    "credit": "實拍｜HK James Ho · 玉山 · 未裁切",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Juniperus_morrisonicola.jpg",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/"
  },
  "rhodo": {
    "name": "玉山杜鵑",
    "kind": "植物",
    "tag": "山坡上的灌木",
    "text": "玉山杜鵑像小鐘的花朵，有粉紅到乳白的深淺變化，花內可見斑點。它可與箭竹、圓柏等植物交錯，形成不同於高大森林的低矮灌叢。",
    "fact": "灌叢，就是低矮木本植物聚在一起形成的植被；它和成片高大樹木的森林不同。",
    "source": "https://kids.moa.gov.tw/theme_data.php?id=43&sub_theme=T01&theme=kids_travel",
    "img": "assets/eco-rhodo.jpg",
    "alt": "石門山玉山杜鵑花朵實拍",
    "credit": "實拍｜Latinboy · 石門山 · 未裁切",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Rhododendron_pseudochrysanthum.JPG",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  "accentor": {
    "focus": [
      0.3,
      0.37
    ],
    "name": "岩鷚",
    "kind": "動物",
    "tag": "先找岩面上的鳥；放大可看較粗略的外形",
    "text": "岩鷚會在高山裸露岩地活動，尋找昆蟲和植物性食物。灰色頭頸與身側栗紅色，是可留意的線索。這張環境照裡鳥很小，可按放大把牠移到畫面中央。",
    "fact": "照片解析度與光線有限，無法清楚呈現喉部所有細斑，適合認識環境，不作精細物種鑑定。",
    "source": "https://pedia.cloud.edu.tw/Entry/Detail?title=%E5%B2%A9%E9%B7%9A",
    "img": "assets/eco-accentor.jpg",
    "alt": "玉山主峰岩地上的岩鷚實拍",
    "credit": "實拍｜李泓誼 · 玉山主峰 · 未裁切",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Yushan_national_park_hungyilee_32.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  "gold": {
    "name": "金翼白眉",
    "kind": "動物",
    "tag": "留意金黃色翼斑",
    "text": "金翼白眉可在高山森林、林緣和低矮灌叢間活動。在岩稜附近有植被的地方，也可以留意鳥類的活動；這不是每處裸岩都必定能看見牠的意思。",
    "fact": "不同棲地不是圍牆：鳥可以在森林與草坡之間移動。請遠觀，不以食物引誘。",
    "source": "https://www.taiwan.nps.gov.tw/home/zh-tw/eco-gallery/21446.html",
    "img": "assets/eco-alpine-bird.webp",
    "alt": "金翼白眉實拍，翼上有金黃色斑塊",
    "credit": "實拍｜Charles Lam · 臺灣 · 本站縮圖",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Trochalopteron_morrisonianum_-Taiwan-8.jpg",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/"
  }
};
let saved=[];try{saved=JSON.parse(sessionStorage.getItem('alpine-discoveries')||'[]')}catch{}
const seen=new Set((Array.isArray(saved)?saved:[]).filter(id=>data[id])), dialog=document.querySelector('#detail'),content=document.querySelector('#detail-content');
function openSpecies(id){const d=data[id];seen.add(id);try{saved=JSON.parse(sessionStorage.getItem('alpine-discoveries')||'[]')}catch{}try{sessionStorage.setItem('alpine-discoveries',JSON.stringify([...new Set([...(Array.isArray(saved)?saved:[]),...seen])]))}catch{}document.querySelector('#progress').textContent=`本次已找到 ${seen.size} / ${Object.keys(data).length} 種`;document.querySelectorAll(`.hotspot[data-species="${id}"]`).forEach(b=>{b.classList.add('visited');b.querySelector('i').textContent='✓'});content.innerHTML=`<p class="eyebrow">${d.kind} · 真實照片對照</p><h2 id="detail-title">${d.name}</h2><figure><div class="photo-window"><img src="${d.img}" alt="${d.alt}"></div><figcaption><a href="${d.creditUrl}" target="_blank" rel="noopener">${d.credit}</a> · <a href="${d.licenseUrl}" target="_blank" rel="noopener">${d.license}</a></figcaption></figure><button class="zoom">放大實拍（可滑動細看）</button><p class="observe"><strong>觀察線索</strong><br>${d.tag}</p><p>${d.text}</p><p>${d.fact}</p><a href="${d.source}" target="_blank" rel="noopener">閱讀資料來源 ↗</a>`;let zoom=1;content.querySelector('.zoom').onclick=e=>{zoom=zoom===3?1:zoom+1;const box=content.querySelector('.photo-window');box.classList.toggle('zoomed',zoom>1);box.style.setProperty('--zoom',zoom);requestAnimationFrame(()=>{const img=box.querySelector('img'),focus=d.focus||[.5,.5];box.scrollLeft=zoom===1?0:img.clientWidth*focus[0]-box.clientWidth/2;box.scrollTop=zoom===1?0:img.clientHeight*focus[1]-box.clientHeight/2;});e.target.textContent=zoom===1?'放大實拍（可滑動細看）':zoom===2?'目前 2 倍 · 再放大':'目前 3 倍 · 還原';};const photo=content.querySelector('figure img');photo.onerror=()=>{photo.hidden=true;content.querySelector('.zoom').disabled=true;content.querySelector('.zoom').textContent='照片未載入，暫不能放大';content.querySelector('.eyebrow').textContent=d.kind+' · 文字介紹（照片未載入）';const note=document.createElement('p');note.className='photo-error';note.textContent='照片暫時沒有載入。下方仍可閱讀介紹，或開啟原始照片來源。';photo.parentElement.replaceChildren(note)};dialog.showModal();dialog.scrollTop=0}
document.querySelectorAll('[data-species]').forEach(b=>b.onclick=()=>openSpecies(b.dataset.species));document.querySelector('.close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}};
document.querySelector('#hint-toggle').onclick=e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',String(on));document.querySelector('#scene').classList.toggle('show-hints',on);e.currentTarget.textContent=on?'隱藏探索提示':'顯示探索提示'};
document.querySelector('#overview').onclick=e=>{const on=document.querySelector('.scene-shell').classList.toggle('overview');e.currentTarget.setAttribute('aria-pressed',String(on));e.currentTarget.textContent=on?'走近探索':'看全景';};

document.querySelector('#progress').textContent=`本次已找到 ${seen.size} / ${Object.keys(data).length} 種`;document.querySelectorAll('.hotspot').forEach(b=>{if(seen.has(b.dataset.species)){b.classList.add('visited');b.querySelector('i').textContent='✓'}});

const sceneImage=document.querySelector('.scene-image');function sceneFailed(){document.querySelector('.scene-shell').classList.add('image-unavailable');document.querySelectorAll('.hotspot').forEach(b=>b.hidden=true);sceneImage.hidden=true;const note=document.createElement('p');note.className='photo-error';note.textContent='岩稜插畫暫時沒有載入。仍可從下方文字入口選擇生物，閱讀實拍與介紹。';document.querySelector('.scene').replaceChildren(note);document.querySelector('details').open=true;document.querySelector('details').classList.add('image-fallback');document.querySelector('#overview').disabled=true;document.querySelector('#hint-toggle').disabled=true;}sceneImage.onerror=sceneFailed;if(sceneImage.complete&&!sceneImage.naturalWidth)sceneFailed();

window.addEventListener('pageshow',()=>{let latest=[];try{latest=JSON.parse(sessionStorage.getItem('alpine-discoveries')||'[]')}catch{}if(Array.isArray(latest))latest.filter(id=>data[id]).forEach(id=>seen.add(id));document.querySelector('#progress').textContent=`本次已找到 ${seen.size} / ${Object.keys(data).length} 種`;document.querySelectorAll('.hotspot').forEach(b=>{if(seen.has(b.dataset.species)){b.classList.add('visited');b.querySelector('i').textContent='✓'}})});
