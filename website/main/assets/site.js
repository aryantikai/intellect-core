/* =====================================================================
   CONFIG — the only block you edit to put this site live.
   Anything left empty hides itself rather than shipping a placeholder.
   ===================================================================== */
var CONFIG = {

  /* 1. Contact form. Get a free key at web3forms.com (30 seconds, no account).
        While this is empty the form is REPLACED by WhatsApp + email, so a
        visitor is never handed a form that silently fails. */
  web3formsKey: "93cfe86d-241c-46a3-8a6a-00c232220ce1",

  /* 2. Headline metrics. Real figures only. Delete any you cannot back up;
        the whole strip disappears if the list is empty. */
  metrics: [
    // { fig: "14", unit: "h", cap: "of manual entry removed per month for one finance team", src: "Measured over 6 months" },
    // { fig: "3",  unit: "",  cap: "banks and currencies reconciled from one upload",        src: "In production since 2025" },
    // { fig: "0",  unit: "",  cap: "statement lines retyped by hand since go-live",          src: "" }
  ],

  /* 3. Per-case results. Same rule: real numbers, or leave it out. */
  results: {
    // c1: { fig: "2 days → 20 minutes", cap: "Monthly reconciliation, end to end." },
    // c2: { fig: "Seconds",             cap: "To find a clause that used to take an afternoon." },
    // c3: { fig: "100%",                cap: "Of open jobs visible in one place, live." }
  },

  /* 3b. HERO COLLAGE — the first thing a visitor sees. Anonymise first.
        Two or three shots work best. Empty = the hero stays full-width text,
        which also looks right, so there is no broken state either way. */
  heroShots: [
    // { src: "shots/statements.png",  label: "Statement parser" },
    // { src: "shots/workorders.png",  label: "Work order board" },
    // { src: "shots/contracts.png",   label: "Contract library" }
  ],

  /* 4. Case screenshots. Anonymise them first. Put files in ./shots/ */
  shots: {
    // c1: { src: "shots/statements.png", cap: "Statement parser, review screen" },
    // c2: { src: "shots/contracts.png",  cap: "Contract library, clause search" },
    // c3: { src: "shots/workorders.png", cap: "Work order board" }
  },

  /* 5. The person behind the company. Leave name empty to hide the card,
        but read the note in the review before you do. */
  person: { name: "", role: "", photo: "" }
};

/* ── hero collage ────────────────────────────────────────────────── */
(function(){
  var box=document.getElementById("collage"),grid=document.getElementById("heroGrid");
  if(!box||!grid)return;
  var shots=(CONFIG.heroShots||[]).filter(function(x){return x&&x.src}).slice(0,3);
  var preview=/[?&]frames=1/.test(location.search);
  if(!shots.length&&!preview)return;           /* the transform panel covers it */
  var art=document.getElementById("heroArt"); if(art)art.hidden=true;  /* real screenshots win over the illustration */

  var pos=["f1","f2","f3"];
  var html="";
  for(var i=0;i<3;i++){
    var sh=shots[i];
    if(!sh&&!preview)continue;
    html+='<div class="frame '+pos[i]+'">'
        + '<div class="bar"><i></i><i></i><i></i><b>'+esc((sh&&sh.label)||"intellectcore.net")+'</b></div>'
        + (sh ? '<img src="'+esc(sh.src)+'" alt="'+esc(sh.label||"")+'" loading="eager" decoding="async">'
              : '<div class="hold"><div class="wf"><div class="side"><i></i><i></i><i></i><i></i><i></i></div>'
                + '<div class="body"><i></i><div class="rows"><i></i><i></i><i></i><i></i></div></div></div>'
                + '<span class="tag">Slot '+(i+1)+'</span></div>')
        + '</div>';
  }
  box.innerHTML=html;
  box.hidden=false;
})();

/* ── floating WhatsApp: appears once the hero is behind you ──────── */
(function(){
  var fab=document.getElementById("waFab");
  if(!fab)return;
  function upd(){fab.classList.toggle("in",window.scrollY>420)}
  upd();
  window.addEventListener("scroll",upd,{passive:true});
  window.addEventListener("load",upd);
  window.addEventListener("hashchange",upd);
})();

/* ── metrics ─────────────────────────────────────────────────────── */
(function(){
  var sec=document.getElementById("metrics"),grid=document.getElementById("metricsGrid");
  if(!sec||!grid||!CONFIG.metrics||!CONFIG.metrics.length)return;
  var html="";
  CONFIG.metrics.slice(0,3).forEach(function(m){
    html+='<div class="metric"><div class="fig">'+esc(m.fig)+(m.unit?'<sup>'+esc(m.unit)+'</sup>':'')
        +'</div><div class="cap">'+esc(m.cap||"")+'</div>'
        +(m.src?'<div class="src">'+esc(m.src)+'</div>':'')+'</div>';
  });
  grid.innerHTML=html;
  sec.hidden=false;
})();

/* ── case results + screenshots ──────────────────────────────────── */
(function(){
  Object.keys(CONFIG.results||{}).forEach(function(k){
    var el=document.querySelector('[data-result="'+k+'"]'),r=CONFIG.results[k];
    if(!el||!r||!r.fig)return;
    el.querySelector(".r-fig").textContent=r.fig;
    el.querySelector(".r-cap").textContent=r.cap||"";
    el.hidden=false;
  });
  Object.keys(CONFIG.shots||{}).forEach(function(k){
    var el=document.querySelector('[data-shot="'+k+'"]'),s=CONFIG.shots[k];
    if(!el||!s||!s.src)return;
    var img=new Image();
    img.alt=s.cap||"";img.loading="lazy";img.decoding="async";
    img.onload=function(){
      el.innerHTML="";el.appendChild(img);
      if(s.cap){var c=document.createElement("figcaption");c.className="shot-cap";c.textContent=s.cap;el.appendChild(c)}
    };
    img.src=s.src;
  });
  var p=CONFIG.person||{},card=document.querySelector("[data-person]");
  if(card){
    if(!p.name){var g=card.closest(".about");card.remove();if(g)g.classList.add("solo")}
    else{
      card.querySelector("[data-person-name]").textContent=p.name;
      card.querySelector("[data-person-role]").textContent=p.role||"";
      if(p.photo){
        var ph=card.querySelector(".ph"),i=new Image();
        i.alt=p.name;i.style.cssText="width:100%;height:100%;object-fit:cover;border-radius:50%";
        i.onload=function(){ph.textContent="";ph.style.padding="0";ph.appendChild(i)};
        i.src=p.photo;
      }
    }
  }
})();
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* ── header shadow ───────────────────────────────────────────────── */
(function(){
  var h=document.getElementById("siteHeader");
  function s(){h.classList.toggle("scrolled",window.scrollY>8)}
  s();
  window.addEventListener("scroll",s,{passive:true});
  window.addEventListener("load",s);
  window.addEventListener("hashchange",s);
})();

/* ── mobile nav ──────────────────────────────────────────────────── */
(function(){
  var tog=document.getElementById("navToggle"),menu=document.getElementById("navMenu");
  if(!tog||!menu)return;
  tog.addEventListener("click",function(){
    var o=document.body.classList.toggle("nav-open");
    tog.setAttribute("aria-expanded",o?"true":"false");
  });
  menu.addEventListener("click",function(e){
    if(e.target.closest("a")){document.body.classList.remove("nav-open");tog.setAttribute("aria-expanded","false")}
  });
})();

/* ── reveal on scroll ────────────────────────────────────────────── */
(function(){
  var els=document.querySelectorAll(".rv");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("vis")});return}
  var io=new IntersectionObserver(function(en){
    en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}})
  },{threshold:.08,rootMargin:"0px 0px -40px 0px"});
  els.forEach(function(e){io.observe(e)});
})();

/* ── scrollspy ───────────────────────────────────────────────────── */
(function(){
  var links=[].slice.call(document.querySelectorAll('.nav a[href^="#"], .svc-side a[href^="#"]'));
  var pairs=links.map(function(l){
    var t=document.querySelector(l.getAttribute("href"));
    return t?{link:l,target:t}:null;
  }).filter(Boolean);
  if(!pairs.length)return;
  function upd(){
    var y=window.scrollY+140,cur=null;
    pairs.forEach(function(p){
      var top=p.target.getBoundingClientRect().top+window.scrollY;
      if(top<=y)cur=p.target;
    });
    pairs.forEach(function(p){p.link.classList.toggle("active",cur&&p.link.getAttribute("href")==="#"+cur.id)});
  }
  upd();window.addEventListener("scroll",upd,{passive:true});
  window.addEventListener("load",upd);
})();

/* ── contact form: works, or gets out of the way ─────────────────── */
(function(){
  var form=document.getElementById("leadForm"),card=document.getElementById("formCard");
  if(!form||!card)return;
  var key=(CONFIG.web3formsKey||"").trim();

  function isNL(){return document.documentElement.getAttribute("data-lang")==="nl"}

  /* No key configured: never show a form that cannot deliver. */
  if(key.length<10||/REPLACE|YOUR_/i.test(key)){
    card.innerHTML=
      '<div class="fallback">'
      +'<h3 style="font-size:1.5rem;margin-bottom:.45em" data-i18n="fb.h">Reach us directly</h3>'
      +'<p data-i18n="fb.p">WhatsApp is the quickest way to get an answer from us, usually the same day. Email works just as well if you would rather write it all out.</p>'
      +'<div class="fb-row">'
      +'<a class="btn btn-wa" href="https://wa.me/5978174543?text=Hi%20Intellect%20Core%2C%20I%27d%20like%20to%20talk%20about%20a%20project" target="_blank" rel="noopener">WhatsApp</a>'
      +'<a class="btn btn-ghost" href="mailto:hello@intellectcore.net">hello@intellectcore.net</a>'
      +'</div></div>';
    if(window.__applyLang)window.__applyLang(document.documentElement.getAttribute("data-lang")||"en");
    return;
  }

  document.getElementById("w3fKey").value=key;
  var ok=document.getElementById("formOk"),err=document.getElementById("formErr"),btn=document.getElementById("sbtn");
  var lbl=btn.querySelector("[data-i18n]");
  form.addEventListener("submit",function(e){
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return}
    ok.classList.remove("show");err.classList.remove("show");
    var prev=lbl.textContent;
    btn.disabled=true;lbl.textContent=isNL()?"Versturen…":"Sending…";
    fetch(form.action,{method:"POST",headers:{Accept:"application/json"},body:new FormData(form)})
      .then(function(r){return r.json().then(function(d){return r.ok&&d.success})})
      .then(function(good){
        btn.disabled=false;lbl.textContent=prev;
        if(good){form.reset();ok.classList.add("show")}else{err.classList.add("show")}
      })
      .catch(function(){btn.disabled=false;lbl.textContent=prev;err.classList.add("show")});
  });
})();

/* ── HERO: rotating last line + the "messy in, structured out" panel ──
   The headline's third line cycles through what we actually build. The
   word is typed in and out rather than swapped, so it reads as a live
   thing, but the full first word is already in the HTML: a crawler and
   the LCP measurement both see real text before any script runs.
   ──────────────────────────────────────────────────────────────── */
(function(){
  var el=document.getElementById("rotWord");
  if(!el)return;
  var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var WORDS={
    en:["data automation","AI systems","SaaS platforms","the whole system"],
    nl:["data-automatisering","AI-systemen","SaaS-platformen","het hele systeem"]
  };
  function lang(){return document.documentElement.getAttribute("data-lang")==="nl"?"nl":"en"}
  var i=0,t=null,running=true;
  function clear(){if(t){clearTimeout(t);t=null}}
  function type(word,pos){
    el.textContent=word.slice(0,pos);
    if(pos<word.length){t=setTimeout(function(){type(word,pos+1)},58);return}
    t=setTimeout(function(){erase(word,word.length)},2100);
  }
  function erase(word,pos){
    el.textContent=word.slice(0,pos);
    if(pos>0){t=setTimeout(function(){erase(word,pos-1)},28);return}
    i=(i+1)%WORDS[lang()].length;
    t=setTimeout(start,180);
  }
  function start(){
    if(!running)return;
    var list=WORDS[lang()];
    if(i>=list.length)i=0;
    type(list[i],0);
  }
  window.__rotRelang=function(){
    clear(); i=0;
    if(RM){el.textContent=WORDS[lang()][0];return}
    start();
  };
  document.addEventListener("visibilitychange",function(){
    running=!document.hidden;
    if(running){clear();start()}else{clear()}
  });
  if(RM){el.textContent=WORDS[lang()][0];}   /* no typing, just the word */
  else {el.textContent="";start();}
})();

/* ── HERO NETWORK ────────────────────────────────────────────────
   Drifting nodes that link up when they come close: the logo mark,
   scaled to the whole hero. Light-theme tuned, so thin blue lines on
   paper rather than glow on black.
   It stops drawing when the hero scrolls away and when the tab is
   hidden, so it is not burning a phone battery further down the page.
   ──────────────────────────────────────────────────────────────── */
(function(){
  var cv=document.getElementById("heroNet");
  if(!cv)return;
  if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches){
    cv.parentElement.querySelector("canvas").style.display="none";return;
  }
  var ctx=cv.getContext&&cv.getContext("2d");
  if(!ctx)return;

  var dpr=Math.min(window.devicePixelRatio||1,2);
  var W=0,H=0,pts=[],raf=0,onScreen=true,visible=!document.hidden;

  function build(){
    var r=cv.parentElement.getBoundingClientRect();
    W=Math.round(r.width);H=Math.round(r.height);
    if(W<=0||H<=0)return;
    cv.width=Math.max(1,W*dpr);cv.height=Math.max(1,H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.max(18,Math.min(54,Math.round(W*H/17000)));
    pts=[];
    for(var i=0;i<n;i++){
      var core=i%7===0;                         /* a few bigger "cores" */
      pts.push({
        x:Math.random()*W, y:Math.random()*H,
        vx:(Math.random()-.5)*.26, vy:(Math.random()-.5)*.26,
        r:core?2.6+Math.random()*1.1:1+Math.random()*1.2,
        core:core
      });
    }
  }

  var LINK=138,LINK2=LINK*LINK;

  function frame(){
    raf=0;
    if(!(onScreen&&visible&&W>0)){return}
    ctx.clearRect(0,0,W,H);
    var i,j,p;
    for(i=0;i<pts.length;i++){
      p=pts[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<-25)p.x=W+25;else if(p.x>W+25)p.x=-25;
      if(p.y<-25)p.y=H+25;else if(p.y>H+25)p.y=-25;
    }
    var dark=document.documentElement.getAttribute("data-theme")==="dark";
    var linkRGB=dark?"120,170,255":"27,77,216";
    var dotFill=dark?"rgba(120,190,240,.55)":"rgba(46,139,255,.46)";
    var coreFill=dark?"rgba(140,220,240,.62)":"rgba(14,111,140,.52)";
    ctx.lineWidth=1;
    for(i=0;i<pts.length;i++){
      for(j=i+1;j<pts.length;j++){
        var a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;
        if(d2<LINK2){
          var o=(1-Math.sqrt(d2)/LINK)*.34;
          ctx.strokeStyle="rgba("+linkRGB+","+o.toFixed(3)+")";
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    }
    for(i=0;i<pts.length;i++){
      p=pts[i];
      ctx.fillStyle=p.core?coreFill:dotFill;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.2832);ctx.fill();
    }
    kick();
  }
  function kick(){if(!raf&&onScreen&&visible)raf=requestAnimationFrame(frame)}
  function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}

  document.addEventListener("visibilitychange",function(){
    visible=!document.hidden; visible?kick():stop();
  });

  if("IntersectionObserver" in window){
    new IntersectionObserver(function(en){
      onScreen=en[0].isIntersecting;
      onScreen?kick():stop();
    },{threshold:0}).observe(cv.parentElement);
  }

  var rt;
  function remeasure(){clearTimeout(rt);rt=setTimeout(function(){build();kick()},160)}
  window.addEventListener("resize",remeasure);
  window.addEventListener("load",remeasure);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(remeasure);
  if("ResizeObserver" in window){
    var seenFirst=false;
    new ResizeObserver(function(){
      if(!seenFirst){seenFirst=true;return}   /* skip the initial fire */
      remeasure();
    }).observe(cv.parentElement);
  }

  build();kick();
})();

/* ── LIVE DEMOS ───────────────────────────────────────────────────
   Three scripted demos in the case panels. Every figure below is
   illustrative, never client data. The ledger accounts and the VAT
   arithmetic are real though: amounts shown are excl. VAT, so a 10%
   line of 1.180,00 becomes 1.072,73 exactly as the running tool does.
   ──────────────────────────────────────────────────────────────── */
(function(){
  var isNL=function(){return document.documentElement.getAttribute("data-lang")==="nl"};
  var RM=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers={};
  function clearTimers(k){(timers[k]||[]).forEach(clearTimeout);timers[k]=[]}
  function mkAt(k){return function(ms,fn){(timers[k]=timers[k]||[]).push(setTimeout(fn,RM?0:ms))}}
  function E(x){return String(x).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  var TICK='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

  /* ---------- 1 · bank statement → ledger ---------- */
  var BANK={
    raw:[
      '16/08/2025,"Service Charge",FT2500000001,"","-25,00","149.975,00"',
      '16/08/2025,"Internet Debit - EBS - Stroomrekening augustus",FT2500000002,"","-1.180,00","148.795,00"',
      '17/08/2025,"Inward SNEPS Credit CR - FACTUUR 2025-0841",FT2500000003,"12.100,00","","160.895,00"',
      '18/08/2025,"Internet Debit - TELESUR N.V. - Betaling factuur augustus",FT2500000004,"","-3.546,70","157.348,30"',
      '18/08/2025,"POS Transaction SUPERMARKT WANICA   WANICA   SR 17:07",FT2500000005,"","-315,50","157.032,80"'
    ],
    rows:[
      ["16/08","Bankkosten","Bankkosten · 4310","-25,00",false],
      ["16/08","Stroomrekening augustus","Vaste lasten · 4201","-1.072,73",false],
      ["17/08","Factuur 2025-0841","Omzet · 8000","+11.000,00",true],
      ["18/08","Telefoon en internet","Telefoon/internet · 4430","-3.224,27",false],
      ["18/08","Supermarkt Wanica","R/C aandeelhouder · 1280","-286,82",false]
    ],
    en:{head:["Date","Description","Ledger account","Excl. VAT"],done:"5 lines categorised, ready for the ledger"},
    nl:{head:["Datum","Omschrijving","Grootboek","Excl. btw"],done:"5 regels ingedeeld, klaar voor het grootboek"}
  };
  function bankRender(instant){
    var at=mkAt("bank");
    var raw=document.getElementById("bkRaw"),out=document.getElementById("bkOut");
    if(!raw||!out)return;
    var t=isNL()?BANK.nl:BANK.en;
    raw.textContent="";out.innerHTML="";
    var thead='<table class="bk-tbl"><thead><tr>'
      +'<th style="width:14%">'+t.head[0]+'</th><th style="width:34%">'+t.head[1]+'</th>'
      +'<th style="width:31%">'+t.head[2]+'</th><th style="width:21%;text-align:right">'+t.head[3]+'</th>'
      +'</tr></thead><tbody id="bkRows"></tbody></table>';
    function showRaw(i){
      if(i>=BANK.raw.length){at(340,function(){out.innerHTML=thead;showRow(0)});return}
      raw.textContent+=(i?"\n":"")+BANK.raw[i];
      at(instant?0:170,function(){showRaw(i+1)});
    }
    function showRow(i){
      var tb=document.getElementById("bkRows");if(!tb)return;
      if(i>=BANK.rows.length){
        at(260,function(){
          var d=document.createElement("div");d.className="bk-done fade-in";
          d.innerHTML=TICK+'<span>'+E(t.done)+'</span>';
          out.appendChild(d);
          var b=document.querySelector('[data-play="bank"]');if(b)b.disabled=false;
        });
        return;
      }
      var r=BANK.rows[i],tr=document.createElement("tr");
      tr.className="fade-in";
      tr.innerHTML='<td>'+E(r[0])+'</td><td>'+E(r[1])+'</td><td class="gb">'+E(r[2])+'</td>'
        +'<td class="amt'+(r[4]?" in":"")+'">'+E(r[3])+'</td>';
      tb.appendChild(tr);
      at(instant?0:210,function(){showRow(i+1)});
    }
    showRaw(0);
  }

  /* ---------- 2 · RAG chat over contracts ---------- */
  var CHAT={
    en:{q:"When does the maintenance agreement with the supplier expire, and is there a notice period?",
        a:"The agreement runs to <b>31 December 2026</b>. Clause 8.2 requires written notice <b>three months</b> before the end date, so the last day to cancel is <b>30 September 2026</b>.",
        src:"Maintenance agreement 2024-114 · clause 8.2"},
    nl:{q:"Wanneer loopt het onderhoudscontract met de leverancier af, en zit er een opzegtermijn in?",
        a:"De overeenkomst loopt tot <b>31 december 2026</b>. Artikel 8.2 vereist schriftelijke opzegging <b>drie maanden</b> voor de einddatum, dus de laatste opzegdag is <b>30 september 2026</b>.",
        src:"Onderhoudsovereenkomst 2024-114 · artikel 8.2"}
  };
  function chatRender(instant){
    var at=mkAt("chat");
    var box=document.getElementById("chBody");if(!box)return;
    var t=isNL()?CHAT.nl:CHAT.en;
    box.innerHTML="";
    function add(cls,html){var d=document.createElement("div");d.className=cls+" fade-in";d.innerHTML=html;box.appendChild(d);return d}
    at(instant?0:160,function(){
      add("ch-msg user",E(t.q));
      at(instant?0:520,function(){
        var ty=add("ch-typing",'<i></i><i></i><i></i>');
        at(instant?0:1150,function(){
          ty.remove();
          add("ch-msg bot",t.a);
          at(instant?0:340,function(){
            add("ch-src",'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><span>'+E(t.src)+'</span>');
            var b=document.querySelector('[data-play="chat"]');if(b)b.disabled=false;
          });
        });
      });
    });
  }

  /* ---------- 3 · receipt photo → bookkeeping ---------- */
  var RC={
    vals:["Bouwmarkt Paramaribo N.V.","18-08-2025","SRD 1.847,50","10%  ·  SRD 167,95","Kantoorbenodigdheden · 4400"],
    en:{keys:["Supplier","Date","Amount","VAT","Category"],reading:"reading…",
        ask:"Is this correct?",yes:"Yes",no:"Change",
        xh:"Bookkeeping · August 2025",saved:"Saved · photo kept as proof"},
    nl:{keys:["Leverancier","Datum","Bedrag","Btw","Categorie"],reading:"lezen…",
        ask:"Klopt dit?",yes:"Ja",no:"Aanpassen",
        xh:"Administratie · augustus 2025",saved:"Opgeslagen · foto bewaard als bewijs"}
  };
  function rcRender(instant){
    var at=mkAt("receipt");
    var body=document.getElementById("bnBody");if(!body)return;
    var t=isNL()?RC.nl:RC.en;
    body.innerHTML='<div class="bn"><div class="bn-photo" id="bnPhoto"></div><div class="bn-fields" id="bnFields"></div></div>';
    var photo=document.getElementById("bnPhoto"),fields=document.getElementById("bnFields");
    at(instant?0:180,function(){
      photo.classList.add("fade-in");
      photo.innerHTML='<div class="bn-recpt"><div class="c"><b>BOUWMARKT</b><br>PARAMARIBO N.V.</div><hr>'
        +'Cement 25kg &nbsp; 3x<br>Schroeven doos<br>Kwast 50mm &nbsp; 2x<hr>'
        +'<div class="c">TOTAAL &nbsp; 1.847,50<br>BTW 10% &nbsp; 167,95</div><hr>'
        +'<div class="c">18-08-2025 &nbsp; 14:32</div></div>';
      RC.vals.forEach(function(val,i){
        var row=document.createElement("div");row.className="bn-f";
        row.innerHTML='<span class="k">'+E(t.keys[i])+'</span><span class="v pend">'+E(t.reading)+'</span>';
        fields.appendChild(row);
        at(instant?0:480+i*220,function(){
          var v=row.querySelector(".v");v.classList.remove("pend");
          v.textContent=val;v.classList.add("fade-in");
        });
      });
      at(instant?0:480+RC.vals.length*220+240,function(){
        var ask=document.createElement("div");ask.className="bn-ask fade-in";
        ask.innerHTML='<span>'+E(t.ask)+'</span>'
          +'<button class="bn-yes" type="button">'+E(t.yes)+' ✓</button>'
          +'<button class="bn-no" type="button">'+E(t.no)+'</button>';
        body.appendChild(ask);
        function confirmIt(){
          if(!document.body.contains(ask))return;
          ask.remove();
          var x=document.createElement("div");x.className="bn-xls fade-in";
          x.innerHTML='<div class="xh">'+E(t.xh)+'</div>'
            +'<div class="xr"><b>18-08</b><span>Bouwmarkt Paramaribo</span><span class="amt">1.679,55</span></div>';
          body.appendChild(x);
          var d=document.createElement("div");d.className="bk-done fade-in";d.style.marginTop="9px";
          d.innerHTML=TICK+'<span>'+E(t.saved)+'</span>';
          body.appendChild(d);
          var b=document.querySelector('[data-play="receipt"]');if(b)b.disabled=false;
        }
        ask.querySelector(".bn-yes").addEventListener("click",confirmIt);
        ask.querySelector(".bn-no").addEventListener("click",function(){clearTimers("receipt");rcRender(false)});
        at(instant?0:3600,confirmIt);
      });
    });
  }

  var RENDER={bank:bankRender,chat:chatRender,receipt:rcRender};
  var seen={};

  function play(name,instant){
    clearTimers(name);
    var btn=document.querySelector('[data-play="'+name+'"]');if(btn)btn.disabled=true;
    seen[name]=1;
    RENDER[name](!!instant||RM);
  }
  window.__demoPlay=play;

  document.querySelectorAll("[data-play]").forEach(function(b){
    b.addEventListener("click",function(){play(b.getAttribute("data-play"),false)});
  });

  /* first time a panel scrolls into view it plays itself once, so the
     proof lands even for a visitor who never clicks anything */
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(en){
      en.forEach(function(e){
        if(!e.isIntersecting)return;
        var name=e.target.getAttribute("data-demo");
        if(seen[name])return;
        play(name,RM);
        io.unobserve(e.target);
      });
    },{threshold:.4});
    document.querySelectorAll("[data-demo]").forEach(function(el){io.observe(el)});
  }else{
    Object.keys(RENDER).forEach(function(k){play(k,true)});
  }

  /* language switch redraws whatever has already been shown */
  window.__demosRelang=function(){
    Object.keys(seen).forEach(function(k){clearTimers(k);RENDER[k](true)});
    document.querySelectorAll(".demo-btn").forEach(function(b){b.disabled=false});
  };
})();

/* ── THEME: forced light ─────────────────────────────────────────
   The theme toggle was removed at Aryan's request, so the site is
   always light. Any older stored preference is cleared on load, and
   we ignore OS prefers-color-scheme. Dark sections still exist as
   per-section .dark, but the global palette stays light. */
(function(){
  try{localStorage.removeItem("ic-theme")}catch(e){}
  document.documentElement.setAttribute("data-theme","light");
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute("content","#eef4fd");
})();

/* ── EN / NL ─────────────────────────────────────────────────────── */
(function(){
  var NL={
    "skip":"Naar de inhoud",
    "nav.home":"Home","nav.services":"Diensten","nav.insights":"Inzichten","nav.about":"Over ons","nav.book":"Boek een gratis gesprek",
    "nav.menu":"Menu",
    "nav.work":"Werk","nav.products":"Producten","nav.approach":"Aanpak","nav.contact":"Contact","nav.quote":"Vraag een offerte","fab":"WhatsApp ons",

    "hero.label":"Paramaribo, Suriname · wereldwijd actief",
    "hero.h1a":"Wij denken eerst,",
    "hero.h1b":"daarna bouwen we",
    "cap.auto":"Procesautomatisering",
    "cap.doc":"Documentextractie",
    "cap.ai":"AI-assistenten",
    "cap.int":"Integraties",
    "cap.dash":"Dashboards",
    "cap.apps":"Web &amp; apps",
    "hero.lead":"Maatwerksoftware en AI voor het werk dat uw team nog met de hand doet.",
    "hero.cta1":"Boek een gratis gesprek","hero.cta2":"Bekijk wat wij bouwen",
    "hero.note":"Eerste gesprek is gratis, en het is een gesprek, geen verkooppraatje.",
    "ix.1":"Procesautomatisering","ix.2":"Document- &amp; data-extractie","ix.3":"AI-assistenten",
    "ix.4":"Operationele platformen","ix.5":"Integraties","ix.6":"Dashboards",

    "work.label":"Geselecteerd werk",
    "work.h2":"Drie problemen, en wat wij ervoor bouwden.",
    "work.deck":"Klantnamen blijven op afspraak achterwege. Alles wat hier staat draait vandaag in productie. Vraag om een rondleiding op echte data, dan laten wij het systeem zien in plaats van een slide.",
    "lbl.before":"De situatie","lbl.built":"Wat wij bouwden",
    "d1.bar":"Bankafschrift importeren",
    "d1.s1":"1 · Ruwe uitdraai van de bank",
    "d1.s2":"2 · Gesorteerd, ingedeeld, grootboekklaar",
    "d1.btn":"Start demo",
    "d1.hint":"Illustratieve data. Echte bestanden blijven op uw eigen systemen.",
    "d2.bar":"Contractassistent",
    "d2.btn":"Stel een vraag",
    "d2.hint":"Antwoorden komen alleen uit uw eigen documenten, met bronvermelding.",
    "d3.bar":"Bonnen · mobiel",
    "d3.btn":"Stuur een bon",
    "d3.hint":"Er wordt niets opgeslagen tot iemand op ja tikt.",

    "c1.sector":"Financiën &amp; administratie",
    "c1.h3":"Bankafschriften die zichzelf verwerken",
    "c1.before":"Drie banken, drie valuta, drie exportformaten. Elke maand typte het financiële team de afschriftregels met de hand over in het grootboek, en elke maand gingen er een paar regels verkeerd die daarna uitgezocht moesten worden.",
    "c1.built":"Een parser die alle drie de formaten leest, elke regel indeelt volgens het rekeningschema, alles waarover twijfel bestaat markeert voor controle, en een grootboekklaar bestand oplevert. Eén upload, één controleronde, klaar.",

    "c2.sector":"Juridisch &amp; compliance",
    "c2.h3":"Een contractarchief waaraan u vragen kunt stellen",
    "c2.before":"Honderden contracten in mappen. Eén clausule vinden betekende bestanden één voor één openen en hopen dat iemand nog wist in welke overeenkomst het stond.",
    "c2.built":"Automatische extractie van partijen, data, bedragen en verlengingstermijnen uit elk contract, naar een doorzoekbare bibliotheek. Vraag in gewone taal om een clausule en krijg de clausule plus het document waar die uit komt.",

    "c3.sector":"Retail, horeca &amp; ambacht",
    "c3.h3":"De schoenendoos met bonnen, leeg",
    "c3.before":"Bonnen stapelen zich op in een la tot het einde van het kwartaal, waarna iemand er dagen aan kwijt is om alles over te typen. Vervaagde bonnen worden gegokt, sommige komen er nooit in, en de btw die teruggevraagd had kunnen worden verdwijnt stilletjes.",
    "c3.built":"Fotografeer de bon ter plekke. De AI leest de leverancier, datum, bedrag, btw en categorie, en vraagt u om te bevestigen voordat er iets wordt opgeslagen. De foto blijft bewaard als bewijs, en de boekhouder krijgt één Excel-bestand met een tabblad per categorie. Personeel kan bonnen toevoegen zonder bij de rest van de boeken te kunnen.",

    "prod.label":"Onze producten",
    "prod.h2":"Kant-en-klare tools, op uw eigen data.",
    "prod.deck":"Drie producten die wij al bouwden, aanscherpen en nu in productie draaien. Past er één bij uw werk, dan slaat u het grootste deel van de bouwtijd over. Elke productkaart opent een live demo die u direct kunt uitproberen.",
    "p1.tag":"Documentextractie","p1.h3":"Core Parse",
    "p1.p":"Leest pdf-bestanden, scans en e-mailbijlagen en levert schone, gestructureerde data waar uw systemen mee verder kunnen. Geen sjablonen, geen handmatige invoer, in minuten klaar.",
    "p1.more":"Probeer de demo →",
    "p2.tag":"Vraag uw data","p2.h3":"Core Insight",
    "p2.p":"Een AI-analist voor uw spreadsheets en databases. Stel uw vraag in gewone taal en krijg antwoorden, analyses, duplicaatchecks en aanbevelingen in seconden.",
    "p2.more":"Probeer de demo →",
    "p3.tag":"Bonnen naar grootboek","p3.h3":"Core Bonnen",
    "p3.p":"Fotografeer de bon, de AI leest leverancier, datum, bedrag, btw en categorie, en u bevestigt voor er iets wordt opgeslagen. Aan het einde van de maand één Excel-bestand voor de boekhouder, per categorie.",
    "p3.more":"Vraag toegang aan →",
    "prod.note":"Elk product wordt op uw eigen data en in uw eigen account opgezet. Niets gedeeld, niets buiten uw omgeving.",

    "ov.label":"Wat wij bouwen","ov.h2":"Drie soorten werk.",
    "ov.deck":"Wij beginnen bij het probleem, niet bij een vaste stack. Korte versie hieronder, de volledige uitwerking staat op de dienstenpagina.",
    "ov.more":"Zie wat mogelijk is →",
    "ov1.h3":"Data-automatisering",
    "ov1.p":"Afschriften en facturen ingelezen in het grootboek. E-mail omgezet in taken. Goedkeuringsstromen over systemen heen.",
    "ov2.h3":"AI-systemen",
    "ov2.p":"Extractie op uw eigen formulieren. Assistenten die alleen op uw eigen documenten antwoorden. Beslisondersteuning op uw bedrijfsregels.",
    "ov3.h3":"Platformen &amp; SaaS",
    "ov3.p":"Operationele platformen. Dashboards die u kunt vertrouwen. Koppelingen met CRM, ERP, betalingen en berichten. Volledige SaaS, van begin tot eind.",

    "rd.h3":"Klaar om over uw project te praten?",
    "rd.p":"Vertel ons wat uw team tijd kost. Wij zeggen eerlijk of het de moeite waard is om te automatiseren.",
    "rd.cta1":"Boek een gratis gesprek","rd.cta2":"Of bekijk onze inzichten",

    "pk.parse.n":"Core Parse","pk.parse.d":"Documentextractie",
    "pk.insight.n":"Core Insight","pk.insight.d":"Vraag uw data",
    "pk.bonnen.n":"Core Bonnen","pk.bonnen.d":"Bonnen naar grootboek",
    "pk.auto.n":"Data-automatisering","pk.auto.d":"Maatwerk-workflow",
    "pk.ai.n":"AI-systeem","pk.ai.d":"Maatwerk AI-bouw",
    "pk.plat.n":"Platform / SaaS","pk.plat.d":"Webapp-bouw",

    "svc.label":"Maatwerk","svc.h2":"Past geen product? Dan bouwen wij het.",
    "svc.deck":"Wij verkopen geen vaste stack. Wij beginnen bij het probleem en kiezen de aanpak die erbij past, soms AI en vaak gewoon goed gebouwde software. Drie soorten werk lopen door het meeste van wat wij doen.",
    "s1.h3":"Data-automatisering",
    "s1.a":"Bankafschriften en facturen, gelezen en ingedeeld",
    "s1.b":"Data-extractie uit contracten en documenten",
    "s1.c":"Binnenkomende e-mail omgezet in toegewezen taken",
    "s1.d":"Goedkeuringsstromen die over systemen heen lopen",
    "s2.h3":"AI-systemen",
    "s2.a":"Extractie afgestemd op uw eigen formulieren en indelingen",
    "s2.b":"WhatsApp- en webassistenten op uw eigen documenten",
    "s2.c":"Beslisondersteuning op basis van uw bedrijfsregels",
    "s2.d":"Een AI-roadmap, geprioriteerd op wat zich het eerst terugbetaalt",
    "s3.h3":"Platformen (SaaS)",
    "s3.a":"Operationele platformen en werkordersystemen",
    "s3.b":"Dashboards op datastromen die u kunt vertrouwen",
    "s3.c":"Koppelingen met CRM, ERP, betalingen en berichtendiensten",
    "s3.d":"Webapps en volledige SaaS-producten, van begin tot eind",

    "ap.label":"Hoe wij werken","ap.h2":"Rustig, wekelijks, in het open.",
    "ap.deck":"Geen accountmanager die het doorgeeft. U werkt direct met de persoon die uw systeem bouwt. Wekelijks zichtbaar, van begin tot eind gedocumenteerd.",
    "ap.pill1":"Stap één","ap.pill2":"Stap twee","ap.pill3":"Stap drie","ap.pill4":"Stap vier","ap.pill5":"Stap vijf",
    "ap1.h3":"Eerste gesprek",
    "ap1.p":"Gratis en eerlijk verkennen. Is automatisering het verkeerde antwoord, dan zeggen wij dat vóór er een factuur uitgaat.",
    "ap2.h3":"Het werk in kaart brengen",
    "ap2.p":"Wij zitten bij het team dat het werk doet en schrijven op hoe het werkelijk verloopt.",
    "ap3.h3":"Ontwerpen &amp; afstemmen",
    "ap3.p":"Plan, kosten en planning afgesproken vóór er één regel code wordt geschreven.",
    "ap4.h3":"Bouwen in korte cycli",
    "ap4.p":"Elke week iets zichtbaars, getest op uw eigen data.",
    "ap5.h3":"Overdragen &amp; bereikbaar blijven",
    "ap5.p":"Gedocumenteerd, overgedragen aan uw team, en wij blijven één WhatsApp verwijderd.",
    "pact.k1":"Wat u krijgt",
    "pact.p1":"Direct contact met de persoon die uw systeem bouwt, wekelijkse voortgang die u kunt zien, en alles gedocumenteerd zodat uw team de regie houdt.",
    "pact.k2":"Wat wij vragen",
    "pact.p2":"Eén aanspreekpunt aan uw kant dat vragen kan beantwoorden en beslissingen kan nemen. Een half uur per week is meestal genoeg.",
    "pact.k3":"Wat van u blijft",
    "pact.p3":"Uw data, uw code, uw documentatie. Besluit u over een jaar naar een andere partij te gaan, dan kan dat. Wij verdienen liever de volgende opdracht dan dat wij de vorige vasthouden.",

    "sv.label":"Wat wij doen","sv.h2":"Diensten gebouwd rond uw werk.",
    "sv.deck":"Zes overlappende werkgebieden. De meeste projecten liggen op het snijvlak van twee of drie ervan.",
    "sv.side":"Op deze pagina",
    "sv1.short":"Data-automatisering","sv1.tag1":"Workflow","sv1.tag2":"Back-office","sv1.h3":"Data-automatisering",
    "sv1.deck":"Het repeterende handmatige werk dat uw team de week uit vreet. Wij brengen de flow in kaart, bouwen het systeem dat het overneemt, en dragen het gedocumenteerd over zodat het na oplevering blijft draaien.",
    "sv1.a.h":"Afschriften &amp; facturen","sv1.a.p":"Bankafschriften, leveranciersfacturen en betaalbestanden ingelezen in het grootboek, ingedeeld en gemarkeerd waar het systeem twijfelt.",
    "sv1.b.h":"E-mail naar taken","sv1.b.p":"Binnenkomende e-mail gesorteerd, ingedeeld en omgezet in toegewezen taken in het systeem dat uw team al gebruikt, met het originele bericht als bijlage.",
    "sv2.short":"AI-systemen","sv2.tag1":"AI","sv2.tag2":"Assistenten","sv2.h3":"AI-systemen",
    "sv2.deck":"AI daar waar het zich terugverdient. Getraind of afgestemd op uw eigen data, binnen uw eigen omgeving, en altijd met de bron erbij zodat niets een black box is.",
    "sv2.a.h":"WhatsApp- &amp; webassistenten","sv2.a.p":"Antwoorden in gewone taal op vragen over uw eigen documenten en databases, met de bron aan elk antwoord gekoppeld.",
    "sv2.b.h":"Beslisondersteuning","sv2.b.p":"Regels en modellen die uw team helpen consistente beslissingen te nemen op terugkerende gevallen, zonder te verbergen hoe het antwoord tot stand kwam.",
    "sv3.short":"Documentextractie","sv3.tag1":"OCR","sv3.tag2":"Extractie","sv3.h3":"Document- &amp; data-extractie",
    "sv3.deck":"Pdf-bestanden, scans, foto's van bonnen, half-gestructureerde spreadsheets en e-mailbijlagen omgezet in schone, gestructureerde data waar uw systemen mee verder kunnen. Geen sjablonen om te onderhouden.",
    "sv3.a.h":"Contracten &amp; beleid","sv3.a.p":"Partijen, data, clausules, verlengingstermijnen en bedragen eruit gehaald in een doorzoekbare bibliotheek waar u in gewone taal aan kunt vragen.",
    "sv3.b.h":"Bonnen &amp; formulieren","sv3.b.p":"Foto's en scans omgezet in gestructureerde records voor de boekhouder, met de originele afbeelding bewaard als bewijs.",
    "sv4.short":"Platformen &amp; SaaS","sv4.tag1":"SaaS","sv4.tag2":"Volledig product","sv4.h3":"Platformen &amp; SaaS",
    "sv4.deck":"Een volledig werkend product, van begin tot eind gebouwd. Operationele software voor hoe uw bedrijf werkelijk draait, of een echte SaaS die u als eigen product kunt verkopen.",
    "sv4.a.h":"Operationele platformen","sv4.a.p":"Werkordersystemen, service- en dispatch-platformen, personeels- en voorraadtools op maat van hoe uw bedrijf werkelijk werkt.",
    "sv4.b.h":"Webapps &amp; SaaS","sv4.b.p":"Volledige productbouw met accounts, facturering, rechten en alles wat een moderne SaaS nodig heeft, geprijsd na een echt scoping-gesprek.",
    "sv5.short":"Integraties","sv5.tag1":"API","sv5.tag2":"Systemen","sv5.h3":"Integraties",
    "sv5.deck":"Twee systemen die met elkaar moeten praten maar het niet doen. Wij bouwen de brug, en zo dat de volgende wijziging aan één kant het niet breekt.",
    "sv5.a.h":"CRM, ERP, betalingen","sv5.a.p":"De tools die uw team al gebruikt aan elkaar knopen zodat een wijziging in de één ook in de andere verschijnt, zonder de copy-paste-ronde.",
    "sv5.b.h":"Berichten &amp; notificaties","sv5.b.p":"WhatsApp, e-mail en sms gekoppeld aan uw systemen zodat de juiste persoon op het juiste moment iets hoort, en geen minuut eerder.",
    "sv6.short":"Dashboards","sv6.tag1":"Rapportage","sv6.tag2":"Metrics","sv6.h3":"Dashboards",
    "sv6.deck":"Cijfers die u kunt vertrouwen, op één plek, die een mens ook kan uitleggen. Gebouwd op de datastromen die wij bij de automatiseringen en integraties hierboven neerzetten.",
    "sv6.a.h":"Operationele dashboards","sv6.a.p":"Live inzicht in wat er vandaag in uw bedrijf gebeurt, zodat de beslissingen in de vergadering van deze week niet op de cijfers van vorige maand worden gemaakt.",
    "sv6.b.h":"Directie-rapporten","sv6.b.p":"Korte, eerlijke rapporten voor de persoon die de cheques tekent: wat gaat omhoog, wat omlaag, en wat wij eraan doen.",

    "ins.label":"Kennisbank","ins.h2":"Inzichten &amp; artikelen.",
    "ins.deck":"Korte stukken over automatisering, AI, documentextractie en het bouwen van software die blijft staan.",
    "ins.f.all":"Alles","ins.f.auto":"Automatisering","ins.f.ai":"AI &amp; Data","ins.f.case":"Cases","ins.f.ind":"Branche","ins.f.tool":"Tooling",
    "ins.featured":"Uitgelicht","ins.more":"Lees meer →","ins.by":"Intellect Core",
    "ins.a1.tag":"Automatisering","ins.a1.h":"Multi-valuta reconciliatie die zichzelf draait",
    "ins.a1.p":"Drie banken, drie valuta, één upload. Hoe de parser werkt, en waarom sjablonen de verkeerde aanpak waren.",
    "ins.a2.tag":"AI &amp; Data","ins.a2.h":"Extractie zonder sjablonen",
    "ins.a2.p":"Wanneer een AI-pass een handgemaakt sjabloon verslaat, en wanneer niet. Een veldgids voor financiële teams.",
    "ins.a3.tag":"Case","ins.a3.h":"Van twee dagen naar twintig minuten",
    "ins.a3.p":"Een maandafsluiting die een financieel team een week kostte, verteld zoals het ging, met de cijfers erbij.",
    "ins.a4.tag":"Automatisering","ins.a4.h":"De verborgen kosten van de schoenendoos",
    "ins.a4.p":"Iedereen bewaart de bonnen. Bijna niemand voert ze op tijd in. Wat dat kost aan niet-teruggevraagde btw.",
    "ins.a5.tag":"Branche","ins.a5.h":"Wat een werkorder-platform werkelijk nodig heeft",
    "ins.a5.p":"Niet nog een CRM. De zeven dingen die een service-team echt nodig heeft, en de drie die men vraagt en nooit gebruikt.",
    "ins.a6.tag":"Tooling","ins.a6.h":"Lakehouse-keuze: wanneer het de moeite waard is",
    "ins.a6.p":"Databricks of Fabric of geen van beide. Een korte, eerlijke gids voor teams die al op SQL en Power BI draaien.",

    "prj.recent":"Recente projecten",
    "prj.d1.sec":"Financiën","prj.d1.n":"Multi-valuta afschriftverwerking",
    "prj.d1.p":"Drie banken, drie valuta, drie formaten. Één upload levert een grootboekklaar bestand per periode.",
    "prj.d2.sec":"Financiën &amp; treasury","prj.d2.n":"Automatische wisselkoers-inleze",
    "prj.d2.p":"Centrale-bank-koersen worden meerdere keren per dag geschraapt en in een data lake gezet, zodat downstream-rapporten geen fixing missen.",
    "prj.d3.sec":"MKB back-office","prj.d3.n":"Bonnen naar grootboek via WhatsApp",
    "prj.d3.p":"Foto van de bon, AI leest hem uit, ondernemer tikt ja, en een live Excel of grootboek pikt het op. Geen schoenendoos.",

    "prj.a1.sec":"Energie · field ops","prj.a1.n":"Voice-assistent voor buitendienst",
    "prj.a1.p":"Handsfree assistent die vragen beantwoordt uit interne handboeken en inspectienotities logt terwijl de technicus doorwerkt.",
    "prj.a2.sec":"Enterprise","prj.a2.n":"Bedrijfsassistent op interne documenten",
    "prj.a2.p":"Medewerkers stellen vragen in gewone taal, krijgen antwoord dat alleen uit eigen beleid en bestanden komt, met bronvermelding.",
    "prj.a3.sec":"Veiligheid &amp; HSE","prj.a3.n":"AI-ondersteund incidentrapport",
    "prj.a3.p":"Een geleide meldflow die een korte stemmemo of een formulier omzet in een volledig, gestructureerd incidentrapport voor de veiligheidsdienst.",

    "prj.e1.sec":"Juridisch &amp; compliance","prj.e1.n":"Contractmetadata &amp; clausule-zoek",
    "prj.e1.p":"Partijen, data, verlengingstermijnen en clausules uit een map met pdf-bestanden in een bibliotheek die in gewone taal antwoorden geeft.",
    "prj.e2.sec":"Beleidsbibliotheek","prj.e2.n":"Vraag-uw-beleid RAG-zoek",
    "prj.e2.p":"Beleidsdocumenten geïndexeerd en doorzoekbaar in gewone taal, met de exacte alinea en het document erbij vermeld op elk antwoord.",
    "prj.e3.sec":"Documentbeheer","prj.e3.n":"PDF's naar systeem-metadata",
    "prj.e3.p":"Geüploade pdf's worden geocr'd, sleutel-velden er met AI uitgehaald en teruggeschreven als metadata-kolommen op het bronsysteem.",

    "prj.p1.sec":"Facility services","prj.p1.n":"Werkorder-platform",
    "prj.p1.p":"Een volledig operationeel platform voor een servicebedrijf: intake, dispatch, technicus-mobiel, afmelden, factureren en dashboards, in één.",
    "prj.p2.sec":"Enterprise kennis","prj.p2.n":"Gestructureerde kennisbank",
    "prj.p2.p":"Een gecureerde, doorzoekbare kennisbank met eigenaren, tags en herzieningscycli per onderwerp, ter vervanging van de shared-drive-chaos.",
    "prj.p3.sec":"Industrieel · 3D","prj.p3.n":"Digital twin van een plant",
    "prj.p3.p":"Een interactieve 3D-web-weergave van een industriesite op de echte plattegrond, zodat operators op een unit kunnen wijzen en de live data openen.",

    "prj.i1.sec":"Master data","prj.i1.n":"Metadata-uitlijning tussen systemen",
    "prj.i1.p":"Hetzelfde product op drie manieren in drie systemen, nu teruggebracht tot één canonical record met de mappings live onderhouden.",
    "prj.i2.sec":"BI &amp; rapportage","prj.i2.n":"Rapporten-migratie naar lakehouse",
    "prj.i2.p":"Bestaande SQL- en BI-rapporten opnieuw opgebouwd op een moderne lakehouse-stack zodat de cijfers blijven doorstromen tijdens het platform-migratie.",
    "prj.i3.sec":"Klantcommunicatie","prj.i3.n":"WhatsApp Business API-koppeling",
    "prj.i3.p":"Een levende tweeweg-koppeling van de eigen systemen naar WhatsApp Business, zodat klanten updates krijgen en in dezelfde draad kunnen antwoorden.",

    "prj.b1.sec":"Enterprise data","prj.b1.n":"Uitrol cloud-dataplatform",
    "prj.b1.p":"Landing zones, bronsysteem-connectoren en governance-ready dataproducten opgezet op een modern cloud-dataplatform, klaar voor BI- en AI-werk.",
    "prj.b2.sec":"Data science &amp; ML","prj.b2.n":"Lakehouse AI/ML-enablement",
    "prj.b2.p":"Een lakehouse afgestemd op AI/ML-pilots in de energieketen: notebooks, feature stores, MLflow-tracking en kostenbewuste compute.",
    "prj.b3.sec":"Ondergrond-analytics","prj.b3.n":"Petrofysische parameter-werkbank",
    "prj.b3.p":"Ruwe putlogs erin, afgeleide parameters (Vshale, porositeit, saturatie, net pay) eruit met een geschreven interpretatie, klaar voor beoordeling.",

    "mv.label":"Missie &amp; visie","mv.h2":"Waarom wij dit doen.",
    "mv.deck":"Twee alinea's. Waar wij voor opstaan, en waar wij naartoe willen.",
    "mv.k1":"Missie","mv.p1":"Het handmatige back-office-werk overnemen dat bedrijven in Suriname traag houdt, zodat teams hun weken terugkrijgen en die kunnen besteden aan het werk dat het bedrijf werkelijk laat groeien.",
    "mv.k2":"Visie","mv.p2":"Een generatie Surinaamse bedrijven die draait op software die zij zelf bezitten, met dezelfde tools als elke moderne organisatie waar ook ter wereld, hier gebouwd, hier onderhouden, en goedkoper daardoor.",
    "mv.k3":"Zo werken wij","mv.p3":"Klein team, direct contact, wekelijkse voortgang die u kunt zien, alles gedocumenteerd en overgedragen. Kunnen wij niet helpen, dan zeggen wij dat.",

    "rd.cta2b":"Of bekijk de diensten",

    "ab.label":"Wie we zijn","ab.h2":"Een klein team dat dingen bouwt die blijven staan.",
    "ab.p1":"Intellect Core bouwt maatwerksoftware voor bedrijven in Suriname en daarbuiten. Een groot deel van het werk dat bedrijven hier draaiende houdt gebeurt nog met de hand, en het meeste daarvan hoeft niet.",
    "ab.p2":"Wij zijn bewust klein. U spreekt met de persoon die uw systeem bouwt, niet met een accountmanager die het doorgeeft. Daarom zeggen wij ook nee tegen werk waarvan wij denken dat een ander er beter bij past.",
    "ab.p3":"Alles wat wij opleveren is gedocumenteerd en wordt overgedragen. Besluit u het over een jaar in eigen beheer te nemen of naar een andere partij te gaan, dan kan dat. Wij verdienen liever de volgende opdracht dan dat wij de vorige vasthouden.",
    "ab.photo":"Foto",
    "ab.quote":"Eén eerlijke zin hier over waarom u dit bedrijf bent begonnen doet meer voor het vertrouwen dan al het andere op deze pagina bij elkaar.",

    "ct.label":"Neem contact op","ct.h2":"Vertel ons wat u nodig heeft.",
    "ct.p":"Kies wat het beste past, beschrijf de taak in een paar woorden, en wij komen binnen één werkdag bij u terug. Het eerste gesprek is gratis.",
    "ct.wa.s":"· meestal de snelste manier om ons te bereiken",
    "ct.email":"E-mail","ct.loc":"Locatie","ct.loc.s":"Paramaribo, Suriname · klanten wereldwijd",
    "f.name":"Naam","f.email":"E-mail","f.msg":"Vertel ons kort iets over het project",
    "f.interest":"Waar heeft u interesse in?",
    "f.interest.0":"Kies een optie",
    "f.interest.p1":"Core Parse (documentextractie)",
    "f.interest.p2":"Core Insight (vraag uw data)",
    "f.interest.p3":"Core Bonnen (bonnen naar grootboek)",
    "f.interest.s1":"Maatwerk data-automatisering",
    "f.interest.s2":"Maatwerk AI-systeem",
    "f.interest.s3":"Operationeel platform / SaaS",
    "f.interest.x":"Nog niet zeker, help mij het uitzoeken",
    "f.budget":"Budget",
    "f.budget.0":"Optioneel",
    "f.budget.1":"Onder $1.000",
    "f.budget.2":"$1.000 - $3.000",
    "f.budget.3":"$3.000 - $7.000",
    "f.budget.4":"$7.000 - $15.000",
    "f.budget.5":"$15.000 +",
    "f.budget.x":"Nog niet zeker",
    "f.submit":"Verstuur projectaanvraag",
    "f.ok":"Verzonden. Wij komen binnen één werkdag bij u terug.",
    "f.err":"Dat is niet doorgekomen. Stuur ons een WhatsApp of mail hello@intellectcore.net.",
    "ph.name":"Uw naam",
    "ph.msg":"bijv. wij typen elke maand bankafschriften over in het grootboek",
    "fb.h":"Bereik ons direct",
    "fb.p":"Via WhatsApp krijgt u het snelst antwoord van ons, meestal dezelfde dag. E-mail werkt net zo goed als u het liever uitschrijft.",

    "ft.about":"Maatwerksoftware en automatisering voor het werk dat nog met de hand gaat. Gebouwd in Paramaribo, draaiend over de hele wereld.",
    "ft.nav":"Navigatie","ft.touch":"Contact",
    "ft.privacy":"Privacybeleid","ft.terms":"Algemene voorwaarden",
    "ft.rights":"© 2026 Intellect Core. Alle rechten voorbehouden.",
    "ft.where":"Paramaribo, Suriname"
  };
  var EN={},ENP={};
  var segs=[].slice.call(document.querySelectorAll(".langseg button"));

  function apply(lang){
    document.documentElement.setAttribute("lang",lang==="nl"?"nl":"en");
    document.documentElement.setAttribute("data-lang",lang);
    var els=document.querySelectorAll("[data-i18n]"),i,el,k;
    for(i=0;i<els.length;i++){
      el=els[i];k=el.getAttribute("data-i18n");
      if(lang==="nl"){if(EN[k]===undefined)EN[k]=el.innerHTML;if(NL[k]!==undefined)el.innerHTML=NL[k]}
      else if(EN[k]!==undefined)el.innerHTML=EN[k];
    }
    var phs=document.querySelectorAll("[data-i18n-ph]"),j,p,pk;
    for(j=0;j<phs.length;j++){
      p=phs[j];pk=p.getAttribute("data-i18n-ph");
      if(lang==="nl"){if(ENP[pk]===undefined)ENP[pk]=p.getAttribute("placeholder")||"";if(NL[pk]!==undefined)p.setAttribute("placeholder",NL[pk])}
      else if(ENP[pk]!==undefined)p.setAttribute("placeholder",ENP[pk]);
    }
    segs.forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-lang")===lang?"true":"false")});
    if(window.__demosRelang)window.__demosRelang();
    if(window.__rotRelang)window.__rotRelang();
    try{localStorage.setItem("ic-lang",lang)}catch(e){}
  }
  window.__applyLang=apply;

  var saved=null;try{saved=localStorage.getItem("ic-lang")}catch(e){}
  if(saved==="nl")apply("nl");
  segs.forEach(function(b){
    b.addEventListener("click",function(){apply(b.getAttribute("data-lang"))});
  });
})();
