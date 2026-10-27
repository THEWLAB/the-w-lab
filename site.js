/* =====================================================================
   THE W LAB — shared site script (homepage + articles)

   ✏️  EDIT HERE — everything you update regularly lives in this block:
       TICKER   the news strip at the top of every page
       SERIES   the WNBA Finals tracker on the homepage
       ARTICLES the list used for "Keep reading" and the footer
   ===================================================================== */
window.WLAB = {
  TICKER: [
    "<b>WNBA Finals</b> · Valkyries lead <em>3–2</em>",
    "<b>Game 5</b> · Valkyries 64–55 Dream · pace <em>68.5</em>, slowest of the series",
    "<b>Game 6</b> · Valkyries at Dream · Atlanta · Thu 29 Oct · 8pm ET",
    "Golden State is <em>3–0</em> when the pace stays below 76",
    "<b>Game 3</b> · Dream 97–71 Valkyries · Atlanta offense <em>121.3</em> per 100",
    "<b>New on The W Lab</b> · We built a Possession Lab for the Finals",
    "<b>Kelsey Plum</b> · <em>65.2%</em> True Shooting, best among the top 10 scorers",
    "<b>Spain</b> · <em>10</em> U20 Women's EuroBasket titles in 22 editions"
  ],
  SERIES: {
    results: ["GSV 68–64","ATL 79–65","ATL 97–71","GSV 67–62","GSV 64–55"],
    next: { label:"Game 6", where:"Valkyries at Dream · Atlanta", tipoff:"2026-10-30T00:00:00Z" } // 8pm ET Thu 29 Oct
  },
  ARTICLES: [
    { slug:"finals-pace", href:"finals-pace.html", img:"finals_pace_thumb.png", tags:["WNBA","Tool"], date:"26 Oct 2026",
      title:"We Built a Possession Lab for the WNBA Finals — and It Says Pace Decides the Series",
      dek:"747 possessions, one number that keeps deciding the series. Updated after Game 5." },
    { slug:"talent-pipeline", href:"talent-pipeline.html", img:"U20W_pipeline_04.png", tags:["Europe","FIBA"], date:"3 Jul 2026",
      title:"Produced, Not Promised: What 25 Years of U20 Medals Say About Senior Success",
      dek:"Does dominating Europe's youth game predict anything at senior level?" },
    { slug:"scoring-a-lot", href:"scoring-a-lot.html", img:"ts-vs-points.png", tags:["WNBA","Shooting"], date:"29 Jun 2026",
      title:"Scoring a Lot Isn't Scoring Well",
      dek:"What True Shooting % reveals about the WNBA's top 10 scorers in 2026." }
  ],
  TOOL_URL:"https://tomascosta7.github.io/wnba-finals-possession-lab/",
  GITHUB_URL:"https://github.com/tomascosta7/wnba-finals-possession-lab",
  INSTAGRAM:"https://instagram.com/the.w.lab"
};
/* ======================== end of EDIT HERE ======================== */

(function(){
  const W=window.WLAB, $=s=>document.querySelector(s), isHome=document.body.dataset.page==='home';
  const home=isHome?'':'index.html';

  // ticker
  const t=$('#wl-ticker');
  if(t){const items=W.TICKER.map(x=>`<span class="item">${x}</span>`).join('');
    t.outerHTML=`<div class="ticker" aria-label="Latest"><div class="live"><i></i>Live · Finals</div><div class="track"><div class="belt">${items}${items}</div></div></div>`;}

  // header
  const h=$('#wl-header');
  if(h){h.outerHTML=`<header class="site"><div class="wrap"><div class="bar">
    <a class="brand" href="index.html"><img src="logo.png" alt=""><b>THE W LAB</b></a>
    <button class="burger" id="burger" aria-expanded="false" aria-controls="menu">MENU</button>
    <nav class="menu" id="menu">
      <a href="${isHome?'#top':'index.html'}" class="${isHome?'on':''}">Home</a>
      <a href="${home}#analysis" class="${isHome?'':'on'}">Analysis</a>
      <a href="${home}#tools">Tools</a>
      <a href="${home}#numbers">Numbers</a>
      <a href="${home}#about">About</a>
      <a class="ig" href="${W.INSTAGRAM}" target="_blank" rel="noopener">@the.w.lab</a>
    </nav></div></div></header>`;
    const bg=$('#burger'),mn=$('#menu');
    bg.addEventListener('click',()=>{const o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o);});
    mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mn.classList.remove('open')));}

  // footer
  const f=$('#wl-footer');
  if(f){f.outerHTML=`<footer class="site"><div class="wrap">
    <div class="fgrid">
      <div><a class="brand" href="index.html"><img src="logo.png" alt=""><b>THE W LAB</b></a><p>Women's basketball, decoded by the numbers.</p></div>
      <div><h4>Analysis</h4>${W.ARTICLES.map(a=>`<a href="${a.href}">${a.title.split(':')[0].split(' — ')[0]}</a>`).join('')}</div>
      <div><h4>Tools</h4><a href="${W.TOOL_URL}" target="_blank" rel="noopener">Possession Lab</a><a href="${W.GITHUB_URL}" target="_blank" rel="noopener">GitHub</a></div>
      <div><h4>Follow</h4><a href="${W.INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></div>
    </div>
    <div class="fbottom"><span>© 2026 The W Lab · Tomás Costa</span><span>Independent analysis · not affiliated with the WNBA or its teams</span></div>
  </div></footer>`;}

  // ---------- article-only features ----------
  if(document.body.dataset.page!=='article') return;
  const slug=document.body.dataset.slug, body=$('.a-body');

  // reading progress
  const bar=document.createElement('div');bar.className='progress';bar.innerHTML='<i></i>';document.body.appendChild(bar);
  const fill=bar.firstChild;
  const onScroll=()=>{const r=body.getBoundingClientRect();const total=r.height-innerHeight*.6;const done=Math.min(1,Math.max(0,-r.top/total));fill.style.width=(done*100)+'%';};
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // table of contents from h2s
  const hs=[...body.querySelectorAll('h2')];
  hs.forEach((x,i)=>{if(!x.id)x.id='s'+(i+1)+'-'+x.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);});
  const toc=$('#toc');
  if(toc){toc.innerHTML=hs.map(x=>`<a href="#${x.id}">${x.textContent.replace(/^Part \d+ — /,'')}</a>`).join('');
    const links=[...toc.querySelectorAll('a')];
    const spy=()=>{let cur=0;hs.forEach((x,i)=>{if(x.getBoundingClientRect().top<140)cur=i;});links.forEach((l,i)=>l.classList.toggle('on',i===cur));};
    addEventListener('scroll',spy,{passive:true});spy();}

  // reading time
  const rt=$('#readtime');if(rt){const words=body.innerText.split(/\s+/).length;rt.textContent=Math.max(1,Math.round(words/220))+' min read';}

  // copy link
  const cp=$('#copylink');
  if(cp)cp.addEventListener('click',async()=>{
    let ok=true;try{await navigator.clipboard.writeText(location.href);}catch(e){ok=false;}
    const n=document.createElement('div');n.className='toast';n.textContent=ok?'Link copied':location.href;document.body.appendChild(n);setTimeout(()=>n.remove(),2200);});

  // keep reading
  const more=$('#more');
  if(more){more.innerHTML=W.ARTICLES.filter(a=>a.slug!==slug).slice(0,3).map(a=>`<a class="card" href="${a.href}">
      <div class="th"><img src="${a.img}" alt=""></div>
      <div class="bd"><div class="tags">${a.tags.map(x=>`<span>${x}</span>`).join('')}</div><h3>${a.title}</h3><p>${a.dek}</p><span class="meta">${a.date}</span></div></a>`).join('')
      +`<a class="card" href="${W.TOOL_URL}" target="_blank" rel="noopener">
      <div class="th"><img src="finals_pace_tool.png" alt=""></div>
      <div class="bd"><div class="tags"><span>Tool</span><span>Live</span></div><h3>WNBA Finals Possession Lab</h3><p>Every possession of the Finals, rebuilt event by event. Open it and explore.</p><span class="meta">Interactive tool</span></div></a>`;}
})();
