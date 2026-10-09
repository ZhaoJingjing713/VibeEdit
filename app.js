const heroCases={chair:{text:'Change the middle chair to velvet blue while preserving the rest of the room.',alt:'The selected middle chair changes from white to velvet blue'},rose:{text:'Add a red rose in the circled area.',alt:'A red rose in a glass vase is added to the marked area on a wooden table'},patio:{text:'Remove the marked chair and fill the area behind it.',alt:'The marked patio chair is removed while the surrounding seating is retained'},fern:{text:'Replace the selected pair of boots with a potted fern.',alt:'The selected boots in a shop window are replaced by a tall potted fern'},cats:{text:'Move the selected cat figurine to the marked destination.',alt:'The selected cat figurine moves from the lower shelf to the upper right shelf'}};
let heroSelection = 0;
async function selectHero(button) {
  const selection = ++heroSelection, key = button.dataset.case;
  const panel = document.getElementById('hero-panel');
  panel.setAttribute('aria-busy', 'true');
  const sources = [`assets/images/${key}-canvas.webp`, `assets/images/${key}-output.webp`];
  try {
    await Promise.all(sources.map(src => {const img = new Image(); img.src = src; return img.decode();}));
    if (selection !== heroSelection) return;
    document.querySelectorAll('.demo-tabs button').forEach(b => {b.setAttribute('aria-selected', b === button); b.tabIndex = b === button ? 0 : -1;});
    panel.setAttribute('aria-labelledby', button.id);
    const input = document.getElementById('hero-input'), output = document.getElementById('hero-output');
    input.src = sources[0]; output.src = sources[1];
    input.alt = `Canvas instruction: ${heroCases[key].alt}`; output.alt = heroCases[key].alt;
    document.getElementById('hero-description').textContent = heroCases[key].text;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [input, output].forEach(img => img.animate([{opacity:.55}, {opacity:1}], {duration:220, easing:'ease-out'}));
    }
  } catch {
    // Keep the current, fully loaded pair if a requested image cannot be decoded.
  } finally {
    if (selection === heroSelection) panel.removeAttribute('aria-busy');
  }
}
document.querySelectorAll('.demo-tabs button').forEach((b,i,all)=>{b.tabIndex=b.getAttribute('aria-selected')==='true'?0:-1;b.addEventListener('click',()=>selectHero(b));b.addEventListener('keydown',e=>{let k=i;if(e.key==='ArrowRight')k=(i+1)%all.length;else if(e.key==='ArrowLeft')k=(i+all.length-1)%all.length;else if(e.key==='Home')k=0;else if(e.key==='End')k=all.length-1;else return;e.preventDefault();all[k].focus();selectHero(all[k])})});
// All demonstrations are recorded research results, not live model inference.
function bindComparisons(root=document){root.querySelectorAll('.comparison input').forEach(input=>{input.addEventListener('input',()=>input.closest('.comparison').style.setProperty('--split',`${input.value}%`));});}
bindComparisons();
function accessibleTabs(selector,callback){const tabs=[...document.querySelectorAll(selector)];tabs.forEach((tab,i)=>{tab.tabIndex=tab.getAttribute('aria-selected')==='true'?0:-1;const activate=()=>{tabs.forEach(t=>{t.setAttribute('aria-selected',t===tab);t.tabIndex=t===tab?0:-1});callback(tab);};tab.addEventListener('click',activate);tab.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].focus();tabs[next].click();});});}
accessibleTabs('.method-nav button',tab=>{document.querySelectorAll('.method-stage').forEach(panel=>panel.hidden=panel.dataset.panel!==tab.dataset.stage);document.getElementById('stage-panel').setAttribute('aria-labelledby',tab.id);});
// Table 1 from sections/5.exp.tex. Task order: add, remove, attribute, replace, move, overall.
const results=[
{group:'visual',name:'Qwen-Image-Edit-2511',v:[17.7,22.1,28.1,21.1,10.0,19.8],p:[17.0,14.3,17.4,16.5,16.1,16.3]},
{group:'visual',name:'LongCat-Image-Edit',v:[8.8,39.0,29.5,27.8,10.5,23.1],p:[15.0,18.9,14.8,16.2,13.5,15.6]},
{group:'visual',name:'FLUX.2-klein-9B',v:[30.0,34.3,56.9,43.3,23.8,37.6],p:[24.1,27.6,26.8,25.7,27.9,26.4]},
{group:'visual',name:'FireRed-Image-Edit-1.0',v:[26.9,35.4,28.6,19.0,4.2,22.8],p:[17.9,17.1,13.4,16.6,14.6,16.0]},
{group:'visual',name:'JoyAI-Image-Edit',v:[69.1,38.1,49.9,63.0,12.0,46.4],p:[23.9,27.8,24.1,26.0,20.9,24.5]},
{group:'visual',name:'Step1X-Edit-v1p2',v:[31.3,43.6,40.1,53.3,21.1,37.9],p:[19.7,24.6,19.1,18.5,21.7,20.7]},
{group:'visual',name:'GPT-Image-1',v:[50.0,52.8,43.7,50.6,16.3,42.7],p:[14.4,12.9,13.1,13.2,13.1,13.4]},
{group:'text',name:'Qwen-Image-Edit-2511',v:[63.7,71.8,54.7,67.8,54.4,62.5],p:[18.9,19.7,19.9,20.0,18.9,19.4]},
{group:'text',name:'LongCat-Image-Edit',v:[54.6,66.9,53.4,62.7,34.7,54.5],p:[17.7,19.5,20.2,19.7,16.1,18.6]},
{group:'text',name:'FLUX.2-klein-9B',v:[57.3,70.8,57.4,59.8,32.4,55.5],p:[25.0,23.5,24.1,24.4,26.0,24.6]},
{group:'text',name:'FireRed-Image-Edit-1.0',v:[69.9,69.8,65.4,78.9,53.0,67.4],p:[23.4,22.8,26.4,25.8,21.8,24.0]},
{group:'text',name:'JoyAI-Image-Edit',v:[66.0,72.3,61.5,72.9,54.6,65.4],p:[21.9,23.3,26.2,24.7,20.8,23.3]},
{group:'text',name:'Step1X-Edit-v1p2',v:[43.3,60.8,50.6,62.5,31.9,49.8],p:[18.8,19.5,19.8,19.6,17.8,19.1]},
{group:'ours',name:'VibeEdit-base',v:[67.6,73.3,66.0,72.9,59.1,67.8],p:[32.7,27.5,22.1,31.5,20.7,27.0]},
{group:'ours',name:'VibeEdit',v:[80.3,85.4,77.4,79.9,76.4,79.9],p:[34.7,35.8,31.2,34.9,27.1,32.8]}
];
function renderResults(filter='all'){const tbody=document.getElementById('results-body');let last='';tbody.innerHTML=results.filter(r=>filter==='all'||r.group===filter||r.group==='ours').map(r=>{let label='';if(last!==r.group){last=r.group;label=`<tr class="group-label"><td colspan="7">${{visual:'Visual-only baselines',text:'Text-instructed baselines',ours:'Ours · source + canvas · no separate text prompt'}[r.group]}</td></tr>`;}return label+`<tr class="${r.name==='VibeEdit'?'ours-row':r.group==='ours'?'base-row':''}"><th scope="row">${r.name}</th>${r.v.map((v,i)=>`<td>${v.toFixed(1)} <span class="score-separator">/</span> ${r.p[i].toFixed(1)}</td>`).join('')}</tr>`;}).join('');}
renderResults();document.getElementById('setting-filter').addEventListener('change',event=>renderResults(event.target.value));
const gallery=[
{key:'eggs',task:'modify',title:'Recolor one egg',desc:'Change the selected egg to red.',w:1152,h:832},
{key:'teacup',task:'move',title:'Move a teacup',desc:'Move the selected teacup to the marked destination.',w:832,h:1152},
{key:'glasses',task:'add',title:'Add sunglasses',desc:'Add black sunglasses to the selected person.',w:1216,h:832},
{key:'basket',task:'remove',title:'Remove a hanging basket',desc:'Remove the circled hanging basket.',w:1216,h:832},
{key:'headphones',task:'modify',title:'Recolor one pair of headphones',desc:'Recolor one pair of headphones among similar pairs.',w:1152,h:832},
{key:'fern',task:'replace',title:'Replace boots with a fern',desc:'Replace the selected boots with a tall potted fern.',w:1216,h:832},
{key:'flowers',task:'modify',title:'Recolor selected flowers',desc:'Turn the selected red flowers blue.',w:1216,h:832},
{key:'cup',task:'move',title:'Move a drink',desc:'Move the drink across the seated person.',w:1216,h:832},
{key:'crowd',task:'modify',title:'Recolor one person’s clothing',desc:'Change the selected person’s clothing to blue.',w:1344,h:768},
{key:'rose',task:'add',title:'Add a red rose',desc:'Add a red rose at the circled position.',w:1536,h:1024},
{key:'dog',task:'add',title:'Add a dog',desc:'Add a dog in the marked area.',w:1216,h:832},
{key:'cats',task:'move',title:'Move a cat figurine',desc:'Move the selected figurine to the upper shelf.',w:1216,h:832},
{key:'market',task:'modify',title:'Change an umbrella pattern',desc:'Change the selected umbrella to a blue-and-white checkered pattern.',w:896,h:1152},
{key:'patio',task:'remove',title:'Remove a patio chair',desc:'Remove the marked chair.',w:1216,h:832},
{key:'cushion',task:'move',title:'Move a cushion',desc:'Move the selected cushion across the sofa.',w:1216,h:832},
{key:'cow',task:'add',title:'Add a cow',desc:'Add a cow facing the camera.',w:832,h:1216},
{key:'metal',task:'modify',title:'Change a basket’s material',desc:'Change the selected basket’s material to stainless steel.',w:768,h:1344},
{key:'boat',task:'modify',title:'Make a boat look rusty',desc:'Change the selected boat’s state to rusty.',w:832,h:1216},
{key:'coracle',task:'modify',title:'Recolor a round boat',desc:'Change the selected round boat to red.',w:1216,h:832},
{key:'facade',task:'remove',title:'Remove a window',desc:'Remove the circled window.',w:832,h:1216},
{key:'ac',task:'move',title:'Move an air conditioner',desc:'Move the wall-mounted unit to the marked lower position.',w:832,h:1216},
{key:'blossom',task:'move',title:'Move a blossom',desc:'Move the selected blossom to the destination circle.',w:832,h:1216},
{key:'pastry',task:'move',title:'Move a pastry',desc:'Move a single pastry to the marked area.',w:768,h:1344},
{key:'lamp',task:'move',title:'Move a vase',desc:'Move the marked turquoise vase to the destination circle.',w:1216,h:832}
];
function renderGallery(){const grid=document.getElementById('gallery-grid');grid.innerHTML=[...gallery].sort((a,b)=>(a.w<a.h)-(b.w<b.h)).map(c=>`<article class="gallery-card ${c.w<c.h?'portrait':'landscape'}"><div class="comparison" style="--split:52%"><img src="assets/images/${c.key}-output.webp" width="${c.w}" height="${c.h}" alt="VibeEdit output. ${c.desc}" loading="lazy" decoding="async"><img class="compare-before" src="assets/images/${c.key}-canvas.webp" width="${c.w}" height="${c.h}" alt="Canvas instruction. ${c.desc}" loading="lazy" decoding="async"><span class="compare-label left-label">Canvas</span><span class="compare-label right-label">Output</span><span class="compare-divider" aria-hidden="true"><span>‹ ›</span></span><input type="range" min="0" max="100" value="52" aria-label="Compare canvas and output: ${c.title}"></div><div class="gallery-caption"><div><h3>${c.title}</h3></div><button class="text-button" data-enlarge="${c.key}" aria-label="Enlarge example: ${c.title}">Enlarge</button></div></article>`).join('');bindComparisons(grid);grid.querySelectorAll('[data-enlarge]').forEach(button=>button.addEventListener('click',()=>openCase(button.dataset.enlarge)));}
renderGallery();
const modal=document.getElementById('image-modal');const modalContent=document.getElementById('modal-content');function showModal(){modal.showModal();document.body.classList.add('modal-open');}function openCase(key){const c=gallery.find(x=>x.key===key);document.getElementById('modal-title').textContent=c.title;modalContent.innerHTML=`<div class="modal-pair"><figure><figcaption>Canvas instruction</figcaption><img src="assets/images/${key}-canvas.webp" alt="Canvas instruction: ${c.desc}"></figure><figure><figcaption>VibeEdit output</figcaption><img src="assets/images/${key}-output.webp" alt="Edited result: ${c.desc}"></figure></div>`;document.getElementById('modal-caption').textContent=c.desc;showModal();}
document.getElementById('close-modal').addEventListener('click',()=>modal.close());modal.addEventListener('close',()=>document.body.classList.remove('modal-open'));modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.figure;document.getElementById('modal-title').textContent={pipe:'Model pipeline','data-pipe':'Data construction pipeline',demo:'Qualitative baseline comparison'}[key];modalContent.innerHTML=`<img class="modal-figure" src="assets/figures/${key}.webp" alt="${document.getElementById('modal-title').textContent}">`;document.getElementById('modal-caption').innerHTML=`<a href="assets/figures/${key}.pdf" target="_blank" rel="noopener">Open full-resolution PDF</a>.`;showModal();}));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.site-header nav a').forEach(link=>{const active=link.hash===`#${entry.target.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));

// Canvas-instruction animation. This replays an existing result; no inference request is made.
const editingDemo = document.getElementById('edit-animation');
const stroke = document.getElementById('chair-stroke');
stroke.setAttribute('pathLength', '1');
const brush = document.getElementById('brush-cursor');
const strokeLength = stroke.getTotalLength();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let editTime = 0, editPlaying = false, editFrame = 0, editPreviousTime = 0;
let editInView = false, editUserPaused = reduceMotion;
const editLoopDuration = 12000;
const animationUI = {
  overlay: document.getElementById('drawing-overlay'),
  note1: document.getElementById('note-reveal-1'),
  note2: document.getElementById('note-reveal-2'),
  progress: document.getElementById('model-progress-fill'),
  result: document.getElementById('animated-result'),
  waiting: document.getElementById('output-waiting'),
  status: document.getElementById('model-status'),
  steps: [...document.querySelectorAll('[data-animation-step]')]
};
let renderedStep = -1;
const clamp01 = value => Math.max(0, Math.min(1, value));
const smooth01 = value => {const t = clamp01(value); return t * t * (3 - 2 * t);};
function renderEditing(time) {
  const fade = 1 - smooth01((time - 11000) / 1000);
  animationUI.overlay.style.opacity = String(fade);
  const draw = smooth01((time - 600) / 2200);
  stroke.style.strokeDashoffset = String(1 - draw);
  const word1 = clamp01((time - 2900) / 1050), word2 = clamp01((time - 4050) / 1150);
  animationUI.note1.setAttribute('width', String(word1 * 290));
  animationUI.note2.setAttribute('width', String(word2 * 305));
  let point;
  if (time >= 600 && time < 2800) point = stroke.getPointAtLength(draw * strokeLength);
  else if (time >= 2900 && time < 3950) point = {x:650 + word1 * 282, y:94};
  else if (time >= 4050 && time < 5200) point = {x:650 + word2 * 299, y:140};
  brush.style.opacity = point ? '1' : '0';
  if (point) brush.setAttribute('transform', `translate(${point.x} ${point.y})`);
  const generation = clamp01((time - 5600) / 2100);
  const reveal = smooth01((time - 7700) / 900) * fade;
  animationUI.progress.style.transform = `scaleX(${generation * fade})`;
  animationUI.result.style.opacity = String(reveal);
  animationUI.waiting.style.opacity = String(1 - reveal);
  const step = time < 5600 ? 0 : time < 7700 ? 1 : 2;
  if (step !== renderedStep) {
    renderedStep = step;
    animationUI.status.textContent = ['Ready', 'Editing…', 'Complete'][step];
    editingDemo.dataset.step = String(step);
    animationUI.steps.forEach(button => button.setAttribute('aria-pressed', Number(button.dataset.animationStep) === step));
  }
}
function pauseEditing() {
  editPlaying = false;
  cancelAnimationFrame(editFrame);
  document.getElementById('animation-play').textContent = 'Play';
  document.getElementById('animation-play').setAttribute('aria-label', 'Play editing animation');
}
function tickEditing(now) {
  if (!editPlaying) return;
  if (editPreviousTime) editTime += Math.min(now - editPreviousTime, 80);
  editPreviousTime = now;
  editTime %= editLoopDuration;
  renderEditing(editTime);
  editFrame = requestAnimationFrame(tickEditing);
}
function playEditing(restart = false) {
  if (restart) editTime = 0;
  if (editPlaying) cancelAnimationFrame(editFrame);
  editPlaying = true; editUserPaused = false; editPreviousTime = 0;
  document.getElementById('animation-play').textContent = 'Pause';
  document.getElementById('animation-play').setAttribute('aria-label', 'Pause editing animation');
  editFrame = requestAnimationFrame(tickEditing);
}
document.getElementById('animation-play').addEventListener('click', () => {
  if (editPlaying) {editUserPaused = true; pauseEditing();}
  else playEditing();
});
document.getElementById('animation-replay').addEventListener('click', () => playEditing(true));
document.querySelectorAll('[data-animation-step]').forEach(button => button.addEventListener('click', () => {
  pauseEditing(); editUserPaused = true; editTime = [5300, 6650, 9800][Number(button.dataset.animationStep)]; renderEditing(editTime);
}));
// Pause off-screen without overriding an explicit user pause.
function syncEditingVisibility() {
  if (editInView && !document.hidden && !editUserPaused) {
    if (!editPlaying) playEditing();
  } else if (editPlaying) pauseEditing();
}
const editVisibility = new IntersectionObserver(entries => entries.forEach(entry => {
  editInView = entry.isIntersecting && entry.intersectionRatio >= 0.3;
  syncEditingVisibility();
}), {threshold:0.3});
if (reduceMotion) editTime = 9800;
renderEditing(editTime); editVisibility.observe(editingDemo);
document.addEventListener('visibilitychange', syncEditingVisibility);

const maskDescriptions = {
  object: ['STEP 1 / OBJECT REGION', 'Locate the edited object', 'The object mask identifies the content that should change. For movement, it covers both the source and destination.', 'Mobj'],
  annotation: ['STEP 2 / CANVAS MARKS', 'Include every stroke and note', 'The annotation mask covers the rendered marks and text. These guide the edit but should not appear in the output.', 'Mann'],
  union: ['STEP 3 / COMBINE + DILATE', 'Cover the edit and nearby pixels', 'Combine the object and annotation masks, then dilate the union by 50 pixels before mapping it to latent resolution.', 'M̃ = dilate(Mobj ∪ Mann)'],
  weighted: ['STEP 4 / LOSS WEIGHTS', 'Emphasize the edit and mark removal', 'Pixels inside the dilated region receive 2.5× the usual loss weight. All other pixels keep a weight of 1.', 'w = 1 + 1.5 M̃']
};
document.querySelectorAll('[data-mask]').forEach(button => {
  if (button.tagName !== 'BUTTON') return;
  button.addEventListener('click', () => {
    const key = button.dataset.mask, details = maskDescriptions[key];
    document.getElementById('sft-demo').dataset.mask = key;
    document.querySelectorAll('.mask-steps button').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', b === button);});
    ['mask-step-label','mask-title','mask-description','mask-equation'].forEach((id,i) => document.getElementById(id).textContent = details[i]);
  });
});

const nftBox = document.getElementById('nft-box');
let nftTimers = [];
function stopNFT() {nftTimers.forEach(clearTimeout); nftTimers = [];}
function showNFTPhase(phase) {
  nftBox.dataset.phase = String(phase + 1);
  nftBox.querySelectorAll('[data-nft-node]').forEach(node => {
    node.classList.toggle('nft-active', Number(node.dataset.nftNode) === phase);
    node.classList.toggle('nft-complete', Number(node.dataset.nftNode) < phase);
  });
}
document.getElementById('nft-replay').addEventListener('click', () => {
  stopNFT();
  document.getElementById('nft-replay').textContent = 'Replay update';
  if (reduceMotion) {showNFTPhase(4); return;}
  showNFTPhase(0);
  for (let phase = 1; phase < 5; phase++) nftTimers.push(setTimeout(() => showNFTPhase(phase), phase * 1700));
});

// Copy the published citation; leave selectable text if clipboard access is unavailable.
const copyCitation = document.getElementById('copy-citation');
copyCitation.addEventListener('click', async () => {
  const citation = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent);
    status.textContent = 'BibTeX copied.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(citation);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    citation.focus();
    status.textContent = 'Select and copy the BibTeX above.';
  }
});
