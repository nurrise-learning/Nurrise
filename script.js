// Basic app logic for Nurrise (quotes, simple lists, local storage)
const quotes = [
  "You are stronger than your fears.",
  "Your healing is coming — step by step.",
  "Every day is a chance to grow.",
  "You are worthy of every good thing.",
  "Don't rush the process — trust it.",
  "Your pain is turning into power.",
  "You are becoming who you needed.",
  "God is preparing better for you."
];

function $(sel){return document.querySelector(sel)}
function $all(sel){return Array.from(document.querySelectorAll(sel))}

const quoteBox = $('#quoteBox');
const newQuoteBtn = $('#newQuoteBtn');
const quoteLarge = $('#quoteLarge');

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }

newQuoteBtn?.addEventListener('click', ()=> {
  const q = pickRandom(quotes);
  quoteBox.textContent = q;
  saveLast('lastQuote', q);
});

$('#nextQuote')?.addEventListener('click', ()=> {
  const q = pickRandom(quotes);
  quoteLarge.textContent = q;
  saveLast('lastQuoteLarge', q);
});
$('#prevQuote')?.addEventListener('click', ()=> {
  // show previous stored quote or random
  const prev = loadLast('lastQuote') || pickRandom(quotes);
  quoteLarge.textContent = prev;
});

$('#shareQuote')?.addEventListener('click', ()=> {
  const text = quoteLarge.textContent || quoteBox.textContent;
  if(navigator.share){
    navigator.share({title:'Nurrise Quote', text}).catch(()=>{});
  } else {
    prompt('Copy this quote:', text);
  }
});

// Sections navigation
$all('[data-section]').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const target = e.currentTarget.dataset.section;
    openSection(target);
  });
});
$all('.go').forEach(b=>{
  b.addEventListener('click', (e)=>{
    const t = e.currentTarget.dataset.section;
    openSection(t);
  });
});

function openSection(id){
  $all('.section').forEach(s=>s.classList.remove('active'));
  const el = document.getElementById(id);
  if(el) el.classList.add('active');
  // close sidebar on small screens
  toggleSidebar(false);
}

// sidebar toggle
const sidebar = $('#sidebar');
$('#menuBtn')?.addEventListener('click', ()=> toggleSidebar(true));
$('#closeMenu')?.addEventListener('click', ()=> toggleSidebar(false));
function toggleSidebar(show){
  if(!sidebar) return;
  if(show) sidebar.classList.remove('hidden'), sidebar.classList.add('visible');
  else sidebar.classList.add('hidden'), sidebar.classList.remove('visible');
}

// Courses sample (editable)
const courses = [
  {title:'Intro to Mindful Habits', file:'#', description:'5 short lessons'},
  {title:'Basics of Graphic Thumbnails', file:'#', description:'Design templates & tips'},
  {title:'Quranic Reading Tips', file:'#', description:'Practice plan'}
];
function renderCourses(){
  const ul = $('#coursesList');
  if(!ul) return;
  ul.innerHTML = '';
  courses.forEach(c=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${c.title}</strong> <div class="muted">${c.description}</div>`;
    ul.appendChild(li);
  });
}
renderCourses();

// Videos: add links to local list (saved in localStorage)
const videoForm = $('#videoForm');
const videoList = $('#videoList');
videoForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const url = $('#videoUrl').value.trim();
  if(!url) return;
  addVideo(url);
  $('#videoUrl').value = '';
});

function loadVideos(){ return JSON.parse(localStorage.getItem('nurrise_videos')||'[]') }
function saveVideos(list){ localStorage.setItem('nurrise_videos', JSON.stringify(list)) }
function addVideo(url){
  const list = loadVideos(); list.push({url, added:Date.now()});
  saveVideos(list); renderVideos();
}
function renderVideos(){
  const list = loadVideos();
  if(!videoList) return;
  videoList.innerHTML = '';
  list.forEach((v,i)=>{
    const li = document.createElement('li');
    li.innerHTML = `<a href="${v.url}" target="_blank" rel="noopener">${v.url}</a>
      <button data-i="${i}" class="btn small remove">Remove</button>`;
    videoList.appendChild(li);
  });
  $all('.remove').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const i = Number(btn.dataset.i);
      const arr = loadVideos(); arr.splice(i,1); saveVideos(arr); renderVideos();
    });
  });
}
renderVideos();

// Designs grid (just shows images if you add them to /designs folder and list them here)
const designs = [
  // add public paths like 'designs/thumbs/cover1.png' after you upload them to repo
];
function renderDesigns(){
  const grid = $('#designGrid');
  if(!grid) return;
  grid.innerHTML = '';
  designs.forEach(src=>{
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'design';
    grid.appendChild(img);
  });
}
renderDesigns();

// Basic healing play (placeholder)
$('#playHealing')?.addEventListener('click', ()=>{
  alert('This will play a short healing message/audio. Upload audio and implement player for full feature.');
});

/* small local storage util */
function saveLast(k,v){ localStorage.setItem('nurrise_'+k, v) }
function loadLast(k){ return localStorage.getItem('nurrise_'+k) }

// install service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').catch(e=>console.warn('SW failed',e));
}
