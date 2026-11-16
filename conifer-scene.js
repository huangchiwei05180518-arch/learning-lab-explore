const data={
  "fir": {
    "name": "臺灣冷杉",
    "kind": "植物",
    "tag": "先看實拍裡連成一片的樹冠",
    "text": "臺灣冷杉可在高山形成成片針葉林。先從這張照片觀察森林的輪廓：相鄰的樹冠連在一起，和裸露的坡面很不一樣。",
    "fact": "冷杉的葉片短而扁，毬果向上直立；這張遠景照片看不清葉與毬果，不能把插畫當作精細鑑定依據。",
    "source": "https://www.ysnp.gov.tw/Child/StaticPage/PK003",
    "img": "assets/eco-fir.webp",
    "alt": "玉山臺灣冷杉林實拍",
    "credit": "實拍｜HK James Ho · 玉山 · 本站縮圖",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Abies_kawakamii_forest.jpg",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/"
  },
  "bamboo": {
    "name": "玉山箭竹",
    "kind": "植物",
    "tag": "在樹冠下，看看細長的竹葉",
    "text": "玉山箭竹不只生長在開闊草坡，也能出現在森林下層。樹冠下的竹叢，讓我們看見森林不只由高大的樹組成；這張近照可先觀察細長葉片。",
    "fact": "箭竹也能出現在森林下層；不能看到箭竹，就認定自己已經越過林線。",
    "source": "https://subjectweb.forest.gov.tw/species/twtrees/book5/206.htm",
    "img": "assets/eco-bamboo.webp",
    "alt": "玉山箭竹細長葉片",
    "credit": "實拍｜Cheng-Tao Lin · CC BY 4.0 · 本站縮圖",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Yushania_niitakayamensis_leaves.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  "pheasant": {
    "name": "帝雉",
    "kind": "動物",
    "tag": "雄鳥深藍黑，長尾帶白色橫紋",
    "text": "帝雉可以生活在中、高海拔的針闊葉混合林與針葉林。看山林時，除了抬頭看樹冠，也別忘了林下的生活空間。",
    "fact": "雄鳥身體深藍黑，眼周紅，長尾有白色橫紋；雌鳥則偏褐色、尾巴較短，不能把雄鳥外觀套用到每一隻帝雉。",
    "source": "https://www.taiwan.nps.gov.tw/home/zh-tw/eco-gallery/21316.html",
    "img": "assets/eco-mikado-real.jpg",
    "alt": "臺灣雄帝雉實拍，藍黑羽毛與帶白色橫紋的長尾",
    "credit": "實拍｜pondhawk · 臺灣 · Commons 裁切調光版本縮圖",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Syrmaticus_mikado_male_Taiwan.jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
  },
  "gold": {
    "name": "金翼白眉",
    "kind": "動物",
    "tag": "留意金黃色翼斑",
    "text": "牠在高山森林、森林邊緣（林緣）與低矮灌叢間活動。白色眉線、臉側白紋和金黃色翼斑，是觀察時值得留意的特徵。",
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
function openSpecies(id){const d=data[id];seen.add(id);try{saved=JSON.parse(sessionStorage.getItem('alpine-discoveries')||'[]')}catch{}try{sessionStorage.setItem('alpine-discoveries',JSON.stringify([...new Set([...(Array.isArray(saved)?saved:[]),...seen])]))}catch{}document.querySelector('#progress').textContent=`本次已找到 ${seen.size} / ${Object.keys(data).length} 種`;document.querySelectorAll(`.hotspot[data-species="${id}"]`).forEach(b=>{b.classList.add('visited');b.querySelector('i').textContent='✓'});content.innerHTML=`<p class="eyebrow">${d.kind} · 真實照片對照</p><h2 id="detail-title">${d.name}</h2><figure><div class="photo-window"><img src="${d.img}" alt="${d.alt}"></div><figcaption><a href="${d.creditUrl}" target="_blank" rel="noopener">${d.credit}</a> · <a href="${d.licenseUrl}" target="_blank" rel="noopener">${d.license}</a></figcaption></figure><button class="zoom">放大實拍（可滑動細看）</button><p class="observe"><strong>觀察線索</strong><br>${d.tag}</p><p>${d.text}</p><p>${d.fact}</p><a href="${d.source}" target="_blank" rel="noopener">閱讀資料來源 ↗</a>`;let zoom=1;content.querySelector('.zoom').onclick=e=>{zoom=zoom===3?1:zoom+1;const box=content.querySelector('.photo-window');box.classList.toggle('zoomed',zoom>1);box.style.setProperty('--zoom',zoom);e.target.textContent=zoom===1?'放大實拍（可滑動細看）':zoom===2?'目前 2 倍 · 再放大':'目前 3 倍 · 還原';};const photo=content.querySelector('figure img');photo.onerror=()=>{photo.hidden=true;content.querySelector('.zoom').disabled=true;content.querySelector('.zoom').textContent='照片未載入，暫不能放大';content.querySelector('.eyebrow').textContent=d.kind+' · 文字介紹（照片未載入）';const note=document.createElement('p');note.className='photo-error';note.textContent='照片暫時沒有載入。下方仍可閱讀介紹，或開啟原始照片來源。';photo.parentElement.replaceChildren(note)};dialog.showModal();dialog.scrollTop=0}
document.querySelectorAll('[data-species]').forEach(b=>b.onclick=()=>openSpecies(b.dataset.species));document.querySelector('.close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}};
document.querySelector('#hint-toggle').onclick=e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',String(on));document.querySelector('#scene').classList.toggle('show-hints',on);e.currentTarget.textContent=on?'隱藏探索提示':'顯示探索提示'};
document.querySelector('#overview').onclick=e=>{const on=document.querySelector('.scene-shell').classList.toggle('overview');e.currentTarget.setAttribute('aria-pressed',String(on));e.currentTarget.textContent=on?'走近探索':'看全景';};

document.querySelector('#progress').textContent=`本次已找到 ${seen.size} / ${Object.keys(data).length} 種`;document.querySelectorAll('.hotspot').forEach(b=>{if(seen.has(b.dataset.species)){b.classList.add('visited');b.querySelector('i').textContent='✓'}});

const sceneImage=document.querySelector('.scene-image');function sceneFailed(){document.querySelector('.scene-shell').classList.add('image-unavailable');document.querySelectorAll('.hotspot').forEach(b=>b.hidden=true);sceneImage.hidden=true;const note=document.createElement('p');note.className='photo-error';note.textContent='冷杉林插畫暫時沒有載入。仍可從下方文字入口選擇生物，閱讀實拍與介紹。';document.querySelector('.scene').replaceChildren(note);document.querySelector('details').open=true;document.querySelector('details').classList.add('image-fallback');document.querySelector('#overview').disabled=true;document.querySelector('#hint-toggle').disabled=true;}sceneImage.onerror=sceneFailed;if(sceneImage.complete&&!sceneImage.naturalWidth)sceneFailed();

window.addEventListener('pageshow',()=>{let latest=[];try{latest=JSON.parse(sessionStorage.getItem('alpine-discoveries')||'[]')}catch{}if(Array.isArray(latest))latest.filter(id=>data[id]).forEach(id=>seen.add(id));document.querySelector('#progress').textContent=`本次已找到 ${seen.size} / ${Object.keys(data).length} 種`;document.querySelectorAll('.hotspot').forEach(b=>{if(seen.has(b.dataset.species)){b.classList.add('visited');b.querySelector('i').textContent='✓'}})});
