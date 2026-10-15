// @ts-nocheck
/* eslint-disable */
/* oxlint-disable */
// Generated from the Living IT Atlas source. Mounts inside a shadow root so its styles never leak into the site.

export function mountAtlas(host: HTMLElement, D: any): () => void {
'use strict';
var R=host.shadowRoot as ShadowRoot;
var ROOT=R.getElementById('atlasRoot') as HTMLElement;
var L=[];function on(t,e,f){t.addEventListener(e,f);L.push([t,e,f])}
var DEAD=false;
function toTop(){var r=host.getBoundingClientRect();window.scrollTo({top:Math.max(0,window.scrollY+r.top-92),left:0,behavior:'auto'})}
/* minimal PDF writer: A4, Helvetica, vector shapes, links. Coordinates in mm, origin top-left. */
var PDFW=(function(){
  var K=72/25.4, PH=297;
  var WN=[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  var WB=[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
  function clean(s){return String(s==null?'':s).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/…/g,'...').replace(/→/g,'>').replace(/[^\x20-\x7E\xA0-\xFF]/g,'')}
  function esc(s){var o='';for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);if(c===40||c===41||c===92)o+='\\'+s[i];else if(c>126)o+='\\'+('00'+c.toString(8)).slice(-3);else o+=s[i]}return o}
  function n(v){return (Math.round(v*100)/100).toString()}
  function Doc(){this.pages=[];this.addPage()}
  Doc.prototype.addPage=function(){this.cur={ops:[],links:[]};this.pages.push(this.cur);return this};
  Doc.prototype.page=function(i){this.cur=this.pages[i-1]};
  Doc.prototype._c=function(c,stroke){return n(c[0]/255)+' '+n(c[1]/255)+' '+n(c[2]/255)+(stroke?' RG':' rg')};
  Doc.prototype.rect=function(x,y,w,h,fill){this.cur.ops.push(this._c(fill)+' '+n(x*K)+' '+n((PH-y-h)*K)+' '+n(w*K)+' '+n(h*K)+' re f')};
  Doc.prototype.rrect=function(x,y,w,h,r,fill){
    var k=.5523*r, X=function(v){return n(v*K)}, Y=function(v){return n((PH-v)*K)};
    var p=[X(x+r)+' '+Y(y)+' m',X(x+w-r)+' '+Y(y)+' l',X(x+w-r+k)+' '+Y(y)+' '+X(x+w)+' '+Y(y+r-k)+' '+X(x+w)+' '+Y(y+r)+' c',
      X(x+w)+' '+Y(y+h-r)+' l',X(x+w)+' '+Y(y+h-r+k)+' '+X(x+w-r+k)+' '+Y(y+h)+' '+X(x+w-r)+' '+Y(y+h)+' c',
      X(x+r)+' '+Y(y+h)+' l',X(x+r-k)+' '+Y(y+h)+' '+X(x)+' '+Y(y+h-r+k)+' '+X(x)+' '+Y(y+h-r)+' c',
      X(x)+' '+Y(y+r)+' l',X(x)+' '+Y(y+r-k)+' '+X(x+r-k)+' '+Y(y)+' '+X(x+r)+' '+Y(y)+' c h f'];
    this.cur.ops.push(this._c(fill)+' '+p.join(' '));
  };
  Doc.prototype.circle=function(cx,cy,r,fill){this.rrect(cx-r,cy-r,2*r,2*r,r,fill)};
  Doc.prototype.line=function(x1,y1,x2,y2,col,w){this.cur.ops.push(this._c(col,1)+' '+n((w||.3)*K)+' w '+n(x1*K)+' '+n((PH-y1)*K)+' m '+n(x2*K)+' '+n((PH-y2)*K)+' l S')};
  /* arc in SVG-like coords (y down), degrees, increasing angle = clockwise on page */
  Doc.prototype.arc=function(cx,cy,r,a0,a1,col,w,cap){
    var segs=Math.max(1,Math.ceil(Math.abs(a1-a0)/90)), step=(a1-a0)/segs, ops=[], rad=Math.PI/180;
    var P=function(a){return [(cx+r*Math.cos(a*rad)),(cy+r*Math.sin(a*rad))]};
    var s=P(a0);ops.push(n(s[0]*K)+' '+n((PH-s[1])*K)+' m');
    for(var i=0;i<segs;i++){
      var A=a0+i*step,B=A+step,t=4/3*Math.tan((B-A)*rad/4),p0=P(A),p3=P(B);
      var c1=[p0[0]-t*r*Math.sin(A*rad),p0[1]+t*r*Math.cos(A*rad)], c2=[p3[0]+t*r*Math.sin(B*rad),p3[1]-t*r*Math.cos(B*rad)];
      ops.push(n(c1[0]*K)+' '+n((PH-c1[1])*K)+' '+n(c2[0]*K)+' '+n((PH-c2[1])*K)+' '+n(p3[0]*K)+' '+n((PH-p3[1])*K)+' c');
    }
    this.cur.ops.push(this._c(col,1)+' '+n(w*K)+' w '+(cap?'1 J ':'')+ops.join(' ')+' S');
  };
  Doc.prototype.poly=function(pts,fill){ /* pts: [[x,y,'m'|'l'|'c' ...]] raw mm coords with optional bezier triples */
    var o=[];pts.forEach(function(p,i){if(p.length===2)o.push(n(p[0]*K)+' '+n((PH-p[1])*K)+(i?' l':' m'));else o.push(n(p[0]*K)+' '+n((PH-p[1])*K)+' '+n(p[2]*K)+' '+n((PH-p[3])*K)+' '+n(p[4]*K)+' '+n((PH-p[5])*K)+' c')});
    this.cur.ops.push(this._c(fill)+' '+o.join(' ')+' h f');
  };
  Doc.prototype.width=function(s,bold,size){s=clean(s);var T=bold?WB:WN,w=0;for(var i=0;i<s.length;i++){var c=s.charCodeAt(i)-32;w+=(c>=0&&c<T.length)?T[c]:556}return w*size/1000*25.4/72};
  Doc.prototype.wrap=function(s,bold,size,maxW){
    var words=clean(s).split(/\s+/).filter(Boolean),lines=[],cur='';
    for(var i=0;i<words.length;i++){var t=cur?cur+' '+words[i]:words[i];if(this.width(t,bold,size)<=maxW||!cur)cur=t;else{lines.push(cur);cur=words[i]}}
    if(cur)lines.push(cur);return lines;
  };
  Doc.prototype.text=function(s,x,y,o){
    o=o||{};s=clean(s);var size=o.size||10,bold=o.bold,w=this.width(s,bold,size);
    if(o.align==='right')x-=w;else if(o.align==='center')x-=w/2;
    this.cur.ops.push('BT '+this._c(o.color||[0,0,0])+' /'+(bold?'F2':'F1')+' '+n(size)+' Tf '+n(x*K)+' '+n((PH-y)*K)+' Td ('+esc(s)+') Tj ET');
    return w;
  };
  Doc.prototype.paras=function(lines,x,y,o,lh){for(var i=0;i<lines.length;i++)this.text(lines[i],x,y+i*lh,o);return lines.length*lh};
  Doc.prototype.link=function(x,y,w,h,url){this.cur.links.push([x,y,w,h,url])};
  Doc.prototype.blob=function(){
    var objs=[],add=function(s){objs.push(s);return objs.length};
    add('<< /Type /Catalog /Pages 2 0 R >>');add('');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    var kids=[];
    this.pages.forEach(function(pg){
      var pid=objs.length+1, cid=pid+1, annots=[];
      add('');add('');
      pg.links.forEach(function(l){var aid=add('<< /Type /Annot /Subtype /Link /Border [0 0 0] /Rect ['+n(l[0]*K)+' '+n((PH-l[1]-l[3])*K)+' '+n((l[0]+l[2])*K)+' '+n((PH-l[1])*K)+'] /A << /S /URI /URI ('+esc(l[4])+') >> >>');annots.push(aid+' 0 R')});
      var stream=pg.ops.join('\n');
      objs[pid-1]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents '+cid+' 0 R'+(annots.length?' /Annots ['+annots.join(' ')+']':'')+' >>';
      objs[cid-1]='<< /Length '+stream.length+' >>\nstream\n'+stream+'\nendstream';
      kids.push(pid+' 0 R');
    });
    objs[1]='<< /Type /Pages /Kids ['+kids.join(' ')+'] /Count '+kids.length+' >>';
    var out='%PDF-1.4\n',offs=[];
    objs.forEach(function(o,i){offs.push(out.length);out+=(i+1)+' 0 obj\n'+o+'\nendobj\n'});
    var xr=out.length;out+='xref\n0 '+(objs.length+1)+'\n0000000000 65535 f \n';
    offs.forEach(function(o){out+=('0000000000'+o).slice(-10)+' 00000 n \n'});
    out+='trailer\n<< /Size '+(objs.length+1)+' /Root 1 0 R >>\nstartxref\n'+xr+'\n%%EOF';
    var u=new Uint8Array(out.length);for(var i=0;i<out.length;i++)u[i]=out.charCodeAt(i)&255;
    return new Blob([u],{type:'application/pdf'});
  };
  return {Doc:Doc,clean:clean};
})();

var DOM=D.domains, BR=D.briefs, ROUTES=D.routes;
var $=function(s,r){return (r||R).querySelector(s)};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var BW=1480, BH=1060, OFF=60;
var POS={enterprise:{x:800,y:185},build:{x:1344,y:430},data:{x:1168,y:850},cloud:{x:432,y:850},delivery:{x:256,y:430}};
var CORE={x:800,y:540};

var ENTRIES=[], byKey=new Map(), dById={}, TOTAL=0;
DOM.forEach(function(d){dById[d.id]=d;d.cats.forEach(function(c){c.tools.forEach(function(t){
  var e={name:t,key:t.toLowerCase(),d:d,c:c};ENTRIES.push(e);TOTAL++;
  if(!byKey.has(e.key))byKey.set(e.key,[]);byKey.get(e.key).push(e);});});});
var CATCOUNT=DOM.reduce(function(n,d){return n+d.cats.length},0);
var STAGES=DOM.filter(function(d){return d.stage});
var FOUND=DOM.filter(function(d){return !d.stage})[0];

var S={view:'atlas',focus:null,journey:null,q:'',tool:null,rtab:'journey',step:0,lens:null,stackOpen:false,stack:[],tour:false,tourPlay:false,cmp:[],cmpOpen:false,dl:false,busy:false,jopen:false,open:{},only:null};
var MARK=D.mark||'';
var tourTimer=null;
var ROLES=[
 {id:'cto',name:'CTO',cats:['enterprise-architecture-modeling','enterprise-enterprise-platforms-itsm','cloud-cloud-platforms','cloud-containers-orchestration','delivery-devops-ci-cd','delivery-security-devsecops','delivery-monitoring-observability','data-ai-ml-genai','practices-methodologies-practices','practices-emerging-tech']},
 {id:'delivery',name:'Delivery head',cats:['enterprise-project-collaboration','enterprise-enterprise-platforms-itsm','enterprise-low-code-rpa-automation','enterprise-workplace-endpoint','practices-methodologies-practices','delivery-devops-ci-cd','delivery-testing-qa','delivery-monitoring-observability']},
 {id:'arch',name:'Architect',cats:['enterprise-architecture-modeling','build-apis-integration','data-relational-databases','data-nosql-search','data-messaging-streaming','cloud-cloud-platforms','cloud-containers-orchestration','cloud-infrastructure-as-code','delivery-security-devsecops','delivery-monitoring-observability']},
 {id:'dev',name:'Developer',cats:['build-programming-languages','build-frontend','build-mobile-cross-platform','build-backend-frameworks','build-apis-integration','build-ides-dev-tools','data-relational-databases','delivery-devops-ci-cd','delivery-testing-qa']},
 {id:'data',name:'Data & AI',cats:['build-programming-languages','data-relational-databases','data-nosql-search','data-messaging-streaming','data-data-engineering','data-bi-visualization','data-ai-ml-genai','data-ai-agents-vector-stores']},
 {id:'sec',name:'Security',cats:['delivery-security-devsecops','delivery-artifacts-supply-chain','delivery-monitoring-observability','cloud-networking-web-servers','cloud-operating-systems-virtualization','cloud-cloud-platforms','enterprise-workplace-endpoint']},
 {id:'ops',name:'Cloud / SRE',cats:['cloud-cloud-platforms','cloud-containers-orchestration','cloud-infrastructure-as-code','cloud-serverless-platform-engineering','cloud-networking-web-servers','cloud-operating-systems-virtualization','delivery-devops-ci-cd','delivery-monitoring-observability','practices-methodologies-practices']}
];
var ESS=['build-programming-languages','build-backend-frameworks','data-relational-databases','cloud-cloud-platforms','cloud-containers-orchestration','cloud-infrastructure-as-code','delivery-devops-ci-cd','delivery-testing-qa','delivery-security-devsecops','delivery-monitoring-observability'];
var CATBY={};DOM.forEach(function(d){d.cats.forEach(function(c){CATBY[c.id]={c:c,d:d}})});
try{var sv=JSON.parse(localStorage.getItem('atlas-stack')||'[]');if(Array.isArray(sv))S.stack=sv.filter(function(k){return byKey.has(k)})}catch(_){}
function saveStack(){try{localStorage.setItem('atlas-stack',JSON.stringify(S.stack))}catch(_){}}
function inStack(k){return S.stack.indexOf(k)>-1}
function stackIn(c){return S.stack.filter(function(k){var e=byKey.get(k);return e&&e.some(function(x){return x.c===c})})}
function lensSet(){var r=ROLES.filter(function(x){return x.id===S.lens})[0];return r?r.cats:null}
var CAPS={};
function getCap(n){
  if(!CAPS[n])CAPS[n]=(window.claude&&typeof window.claude.use==='function')?Promise.resolve(window.claude.use(n)).catch(function(){return null}):Promise.resolve(null);
  return CAPS[n];
}
function saveCustoms(){
  try{localStorage.setItem('atlas-custom',JSON.stringify(ROUTES.filter(function(r){return r.custom}).slice(-6)))}catch(_){}
}
try{
  var cs=JSON.parse(localStorage.getItem('atlas-custom')||'[]');
  if(Array.isArray(cs))cs.forEach(function(r){
    if(!r||!r.id||!Array.isArray(r.tools)||!Array.isArray(r.phases))return;
    if(!r.tools.every(function(t){return byKey.has(String(t).toLowerCase())}))return;
    r.custom=true;r.kind='journey';ROUTES.push(r);
  });
}catch(_){}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove('on')},1800)}
var J=new Map(), JC=new Map(), RES=[];


function entryFor(key,cid){var es=byKey.get(key);if(!es)return null;return es.filter(function(x){return x.c.id===cid})[0]||es[0]}
function techCount(d){return d.cats.reduce(function(n,c){return n+c.tools.length},0)}
function matchCount(c){return c.tools.filter(function(t){return t.toLowerCase().indexOf(S.q)>-1}).length}

function setJourney(j){
  tourClear();S.journey=j||null;S.step=0;S.q='';$('#q').value='';hideResults();J=new Map();JC=new Map();
  if(j){j.tools.forEach(function(t,i){
    var es=byKey.get(t.toLowerCase());if(!es)return;var e=es[0];
    if(!J.has(e.key))J.set(e.key,{e:e,n:[]});J.get(e.key).n.push(i+1);
    if(!JC.has(e.c.id))JC.set(e.c.id,[]);JC.get(e.c.id).push({n:i+1,e:e});
  });}
  render();
}
function catState(c){
  if(S.journey)return JC.has(c.id)?'hit':'dim';
  if(S.q){var hit=c.name.toLowerCase().indexOf(S.q)>-1||matchCount(c)>0;return hit?'hit':'dim'}
  var ls=lensSet();if(ls)return ls.indexOf(c.id)>-1?'hit':'dim';
  return '';
}
function rowHtml(d,c){
  var badge='', right='<span class="cat-count">'+c.tools.length+'</span>';
  if(S.journey&&JC.has(c.id))badge=JC.get(c.id).map(function(x){return '<b>'+x.n+'</b>'}).join('');
  var tc=(S.tour&&S.journey&&stepEntry(S.journey,S.step)&&stepEntry(S.journey,S.step).c===c)?' tourcur':'';
  var pk=stackIn(c).length;if(pk)badge+='<i class="pick" title="In my stack">&#10003;'+pk+'</i>';
  if(S.q){var m=matchCount(c);if(m>0)right='<span class="hits">'+m+'</span>'}
  var tip=c.tools.slice(0,6).join(', ')+(c.tools.length>6?', and '+(c.tools.length-6)+' more':'');
  return '<button class="row '+catState(c)+tc+'" data-open-cat="'+c.id+'" data-dom="'+d.id+'" style="--c:'+d.cvar+'" title="'+esc(tip)+'">'+
    '<i class="node"></i><span class="rname">'+esc(c.name)+'</span>'+badge+right+'</button>';
}
function headHtml(d){
  return '<button class="dhead" data-open-domain="'+d.id+'" aria-label="Open '+esc(d.name)+'">'+
    '<span class="verb">'+(d.stage?'<span class="no">'+d.stage+'</span>':'')+esc(d.verb)+'</span>'+
    '<span class="dname">'+esc(d.name)+'</span>'+
    '<span class="dmeta">'+d.cats.length+' categories &middot; '+techCount(d)+' technologies</span></button>';
}
function isOpen(d){var o=S.open[d.id]||(S.journey&&d.cats.some(function(c){return JC.has(c.id)}))||(S.q&&d.cats.some(function(c){return matchCount(c)>0}));return o?' open':''}
function rowAll(d){return '<button class="rowall" data-open-domain="'+d.id+'">Open all of '+esc(d.name)+' &rarr;</button>'}
function renderAtlas(){
  $('#stagecards').innerHTML=STAGES.map(function(d){
    return '<section class="dcard'+isOpen(d)+'" data-stage="'+d.id+'" style="--c:'+d.cvar+'">'+headHtml(d)+'<div class="rows">'+d.cats.map(function(c){return rowHtml(d,c)}).join('')+rowAll(d)+'</div></section>';
  }).join('');
  $('#core').innerHTML='<div class="core-ring'+isOpen(FOUND)+'" style="--c:'+FOUND.cvar+'"><div class="core-in">'+headHtml(FOUND)+'<div class="rows">'+FOUND.cats.map(function(c){return rowHtml(FOUND,c)}).join('')+rowAll(FOUND)+'</div></div></div>';
  layout();
}

/* geometry */
function isRadial(){return host.clientWidth>=1060}
function fit(){
  var radial=isRadial();ROOT.classList.toggle('radial',radial);
  var host=$('#fit'), board=$('#board');
  if(!radial){board.style.transform='';host.style.height='';host.style.width='';return}
  var avail=$('#shell').clientWidth, s=Math.min(avail/BW,1.4);
  board.style.transform='translate('+(-OFF*s)+'px,0) scale('+s+')';host.style.width=(BW*s)+'px';host.style.height=(BH*s)+'px';
}
function layout(){
  fit();
  var cards=R.querySelectorAll('#stagecards .dcard');
  Array.prototype.forEach.call(cards,function(el){
    if(!isRadial()||S.view!=='atlas'){el.style.left='';el.style.top='';return}
    var p=POS[el.getAttribute('data-stage')];
    el.style.left=Math.round(p.x-el.offsetWidth/2)+'px';
    el.style.top=Math.round(p.y-el.offsetHeight/2)+'px';
  });
  drawLinks();
  drawSignal();
}
function pt(a,c,b,t){var u=1-t;return {x:u*u*a.x+2*u*t*c.x+t*t*b.x,y:u*u*a.y+2*u*t*c.y+t*t*b.y}}
function drawLinks(){
  var svg=$('#links'), out='', defs='';
  if(!isRadial()){svg.innerHTML='';return}
  STAGES.forEach(function(d){var p=POS[d.id];out+='<line class="spoke" x1="'+CORE.x+'" y1="'+CORE.y+'" x2="'+p.x+'" y2="'+p.y+'"/>'});
  STAGES.forEach(function(a,i){
    var b=STAGES[(i+1)%STAGES.length], A=POS[a.id], B=POS[b.id];
    var C={x:CORE.x+((A.x+B.x)/2-CORE.x)*1.25,y:CORE.y+((A.y+B.y)/2-CORE.y)*1.25};
    var gid='g'+i;
    defs+='<linearGradient id="'+gid+'" gradientUnits="userSpaceOnUse" x1="'+A.x+'" y1="'+A.y+'" x2="'+B.x+'" y2="'+B.y+'"><stop offset="0" stop-color="'+a.hex+'"/><stop offset="1" stop-color="'+b.hex+'"/></linearGradient>';
    var path='M'+A.x+' '+A.y+' Q'+C.x+' '+C.y+' '+B.x+' '+B.y;
    out+='<path class="flow" d="'+path+'" stroke="url(#'+gid+')" stroke-opacity=".22" stroke-width="10"/>';
    out+='<path class="flow run" d="'+path+'" stroke="url(#'+gid+')" stroke-width="3"/>';
    var m=pt(A,C,B,.5), tx=2*.5*(C.x-A.x)+2*.5*(B.x-C.x), ty=2*.5*(C.y-A.y)+2*.5*(B.y-C.y), L=Math.sqrt(tx*tx+ty*ty), ux=tx/L, uy=ty/L, px=-uy, py=ux;
    var tip=[m.x+ux*12,m.y+uy*12], b1=[m.x-ux*8+px*9,m.y-uy*8+py*9], b2=[m.x-ux*8-px*9,m.y-uy*8-py*9];
    out+='<polygon points="'+tip.join(',')+' '+b1.join(',')+' '+b2.join(',')+'" fill="'+b.hex+'"/>';
  });
  svg.innerHTML='<defs>'+defs+'</defs>'+out;
}

/* signal path: connects the rows a route passes through */
function drawSignal(){
  var svg=$('#sig');if(!svg)return;
  if(!isRadial()||S.view!=='atlas'||!S.journey){svg.innerHTML='';return}
  var board=$('#board'), br=board.getBoundingClientRect(), k=br.width/BW||1;
  var pts=[];
  S.journey.tools.forEach(function(t,i){
    var es=byKey.get(t.toLowerCase());if(!es)return;
    var row=R.querySelector('.row[data-open-cat="'+es[0].c.id+'"]');if(!row)return;
    var nd=row.querySelector('.node').getBoundingClientRect();
    var x=(nd.left+nd.width/2-br.left)/k, y=(nd.top+nd.height/2-br.top)/k;
    var last=pts[pts.length-1];
    if(last&&last.cid===es[0].c.id){last.n.push(i+1);return}
    pts.push({x:x,y:y,cid:es[0].c.id,n:[i+1]});
  });
  if(!pts.length){svg.innerHTML='';return}
  function through(arr){
    var d='M'+arr[0].x.toFixed(1)+' '+arr[0].y.toFixed(1);
    for(var i=1;i<arr.length;i++){
      var a=arr[i-1],b=arr[i], mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
      d+=' Q'+(mx+(CORE.x-mx)*.22).toFixed(1)+' '+(my+(CORE.y-my)*.22).toFixed(1)+' '+b.x.toFixed(1)+' '+b.y.toFixed(1);
    }
    return d;
  }
  var d=through(pts), ci=-1;
  if(S.tour){pts.forEach(function(p,i){if(p.n.indexOf(S.step+1)>-1)ci=i})}
  var nodes=pts.map(function(p,i){
    var label=p.n.length>1?p.n[0]+'+':String(p.n[0]);
    var cls='signode'+(i===0?' start':'')+(S.tour&&i>ci?' dim':'');
    var r=p.n.length>1?14:12;
    return '<g class="'+cls+'" transform="translate('+p.x.toFixed(1)+','+p.y.toFixed(1)+')">'+(S.tour&&i===ci?'<circle class="pulse" r="'+(r+2)+'"/>':'')+'<circle r="'+r+'"/><text>'+label+'</text></g>';
  }).join('');
  if(S.tour&&ci>-1){
    var dd=through(pts.slice(0,ci+1));
    svg.innerHTML='<path class="sigglow sigdim" d="'+d+'"/>'+(ci>0?'<path class="sigglow" d="'+dd+'"/><path class="sigline" d="'+dd+'"/>':'')+nodes;
  }else{
    svg.innerHTML='<path class="sigglow" d="'+d+'"/><path class="sigline" d="'+d+'"/>'+nodes;
  }
}

/* domain view */
function chip(d,c,t){
  var k=t.toLowerCase(), cls='chip', badge='';
  var isQ=S.q&&k.indexOf(S.q)>-1;
  var j=S.journey?J.get(k):null;
  if(isQ)cls+=' hit';
  if(j&&j.e.c===c){cls+=' inj';badge='<b>'+j.n.join(',')+'</b>'}
  if(S.q&&!isQ)cls+=' dim';
  if(S.journey&&!(j&&j.e.c===c))cls+=' dim';
  if(S.tool&&S.tool.key===k&&S.tool.c===c)cls+=' sel';
  if(inStack(k))cls+=' mine';
  return '<button class="'+cls+'" data-tk="'+esc(k)+'" data-cid="'+c.id+'">'+badge+esc(t)+'</button>';
}
function renderDomain(){
  var host=$('#domainView');
  if(S.view==='atlas'){host.innerHTML='';return}
  var d=dById[S.view];
  var tabs='<button class="tab" data-back style="--c:var(--cyan)">&larr; Atlas</button>'+DOM.map(function(x){
    return '<button class="tab '+(x.id===d.id?'on':'')+'" data-open-domain="'+x.id+'" style="--c:'+x.cvar+'"><span class="dot"></span>'+esc(x.name)+'</button>';}).join('');
  var cur=S.only?d.cats.filter(function(c){return c.id===S.only})[0]:null;
  var ls=lensSet();
  var rail='<nav class="catrail" aria-label="Categories in '+esc(d.name)+'"><button class="rail'+(cur?'':' on')+'" data-cat-pick="">All categories<span class="n">'+techCount(d)+'</span></button>'+d.cats.map(function(c){
    var bd='';if(S.journey&&JC.has(c.id))bd=JC.get(c.id).map(function(x){return '<b>'+x.n+'</b>'}).join('');
    var n='<span class="n">'+c.tools.length+'</span>';if(S.q){var m=matchCount(c);if(m>0)n='<span class="hits">'+m+'</span>'}
    var dim=(ls&&ls.indexOf(c.id)<0&&!S.journey&&!S.q)?' lensdim':'';
    return '<button class="rail'+(cur&&cur.id===c.id?' on':'')+dim+'" data-cat-pick="'+c.id+'"><span class="rt">'+esc(c.name)+'</span>'+bd+n+'</button>';}).join('')+'</nav>';
  function sec(c){
    return '<section class="cpanel" id="cat-'+c.id+'"><header><h3>'+esc(c.name)+'</h3><span class="cn">'+c.tools.length+' technologies</span></header>'+
      '<p class="cat-desc">'+esc(c.description)+'</p><div class="tgrid">'+c.tools.map(function(t){return chip(d,c,t)}).join('')+'</div></section>';}
  host.innerHTML='<div class="tabs">'+tabs+'</div>'+
    '<div class="dv-head" style="--c:'+d.cvar+'"><div class="eyebrow">'+(d.stage?'Stage '+d.stage+' &middot; ':'')+esc(d.verb)+' &middot; '+techCount(d)+' technologies</div><h2>'+esc(d.name)+'</h2><p>'+esc(d.tagline)+'</p></div>'+
    '<div class="dv-layout" style="--c:'+d.cvar+'">'+rail+'<div class="dv-body">'+(cur?sec(cur):d.cats.map(sec).join(''))+'</div></div>';

  var ar=host.querySelector('.rail.on');if(ar&&window.matchMedia('(max-width:800px)').matches){var rn=ar.parentNode;rn.scrollLeft=ar.offsetLeft-16}
}

function routeById(id){return ROUTES.filter(function(x){return x.id===id})[0]}
function stepEntry(r,i){var es=byKey.get(r.tools[i].toLowerCase());return es&&es[0]}
function renderJourneys(){
  var jo=S.jopen||(S.rtab==='own'&&!!S.journey&&!!S.journey.custom)||!!S.journey;
  $('#routesbox').setAttribute('data-open',jo?'1':'0');$('#planbtn').setAttribute('aria-expanded',String(jo));$('#plantxt').textContent=jo?'Hide journeys':'Plan a journey';
  var tabs=[['journey','Journeys'],['track','Role tracks'],['own','Your own']];
  $('#rtabs').innerHTML=tabs.map(function(t){return '<button class="rtab '+(S.rtab===t[0]?'on':'')+'" data-rtab="'+t[0]+'" aria-pressed="'+(S.rtab===t[0])+'">'+t[1]+'</button>'}).join('');
  $('#rhint').textContent=S.rtab==='own'?'':S.rtab==='journey'?'Pick a journey to see how a project goes from idea to running service, step by step.':'Pick a track to see the learning roadmap for a role, in the order to learn it.';
  var all=ROUTES.filter(function(r){return r.kind===S.rtab&&!r.custom}), lim=window.matchMedia('(max-width:700px)').matches?4:6;
  var shown=S.jmore||all.length<=lim+1?all:all.slice(0,lim);
  if(S.journey&&all.indexOf(S.journey)>=lim&&shown.indexOf(S.journey)<0)shown=shown.concat([S.journey]);
  $('#jbuttons').innerHTML=shown.map(function(j){
    var on=S.journey&&S.journey.id===j.id;
    return '<button class="jbtn '+(on?'on':'')+'" data-journey="'+j.id+'" aria-pressed="'+(on?'true':'false')+'"><span>'+esc(j.short)+'</span><small>'+j.tools.length+' steps</small></button>';}).join('')+
    (shown.length<all.length?'<button class="jbtn jmore" data-jmore>Show all '+all.length+' &rarr;</button>':'');
  var own=S.rtab==='own';$('#jbuttons').hidden=own;$('#ownbox').hidden=!own;$('#rhint').hidden=own;
  if(own)renderOwn();
  Array.prototype.forEach.call(R.querySelectorAll('.tabbar button'),function(b){
    var n=b.getAttribute('data-nav');b.classList.toggle('on',n==='atlas'?(S.view==='atlas'&&!S.journey):!!(S.journey&&S.journey.kind===n));});
  var p=$('#jpath');
  if(!S.journey||S.view==='roadmap'){p.hidden=true;p.innerHTML='';return}
  p.hidden=false;p.classList.toggle('touring',!!S.tour);
  var r=S.journey, cur=Math.min(S.step,r.tools.length-1);
  p.innerHTML='<div class="jpath-head"><div><strong>'+(r.kind==='track'?'Track: ':'Journey: ')+esc(r.name)+'</strong><span>'+esc(r.brief)+' An illustration, not a prescribed stack.</span></div><div class="jbtns">'+(S.tour?'':'<button class="playbtn" data-roadmap>&#9776; Roadmap</button><button class="playbtn" data-tour="start">&#9654; Play tour</button>')+'<button class="clear" data-clear-journey>Clear &times;</button></div></div>'+
    '<ol class="steps">'+r.tools.map(function(t,i){
      var e=stepEntry(r,i);
      return '<li><button class="step'+(i===cur?' cur':'')+'" data-tk="'+esc(t.toLowerCase())+'" data-cid="'+(e?e.c.id:'')+'" style="--c:'+(e?e.d.cvar:'var(--muted)')+'"><b>'+(i+1)+'</b>'+esc(t)+'</button></li>';}).join('')+'</ol>'+
    (S.tour?tourHtml(r,cur):'<div class="stepnote"><b>'+(cur+1)+'/'+r.tools.length+'</b>'+esc(r.notes[cur])+'</div>');
}
function tourHtml(r,cur){
  var k=r.tools[cur].toLowerCase(), b=BR[k]||['','','',[]], last=cur>=r.tools.length-1;
  return '<div class="tour"><div class="tprog'+(S.tourPlay&&!last?'':' paused')+'"><span></span></div>'+
    '<div class="ttext"><div class="kick">Tour &middot; step '+(cur+1)+' of '+r.tools.length+'</div><h4>'+esc(r.tools[cur])+' &mdash; '+esc(r.notes[cur])+'</h4>'+
    '<p>'+esc(b[0])+'</p><p class="note">'+esc(b[1])+'</p></div>'+
    '<div class="tctl"><button data-tour="prev"'+(cur<1?' disabled':'')+'>&larr; Back</button>'+
    '<button class="pri" data-tour="toggle">'+(last?'Replay':(S.tourPlay?'Pause':'Play'))+'</button>'+
    '<button data-tour="next"'+(last?' disabled':'')+'>Next &rarr;</button>'+
    '<button data-tour="brief">Open brief</button><button data-tour="exit">Exit tour</button></div></div>';
}
function tourClear(){S.tour=false;S.tourPlay=false;clearInterval(tourTimer);tourTimer=null}
function tourSchedule(){
  clearInterval(tourTimer);tourTimer=null;
  if(!S.tour||!S.tourPlay)return;
  tourTimer=setInterval(function(){
    if(!S.tour||!S.journey){tourClear();return}
    if(S.step<S.journey.tools.length-1){S.step++;render();tourFocus()}
    else{S.tourPlay=false;clearInterval(tourTimer);tourTimer=null;render()}
  },7000);
}
function tourFocus(){
  if(isRadial())return;
  var el=R.querySelector('.row.tourcur');
  if(el)el.scrollIntoView({block:'center',behavior:reduced?'auto':'smooth'});
}
function tourStart(){
  if(!S.journey)return;
  S.tool=null;S.stackOpen=false;S.cmpOpen=false;S.view='atlas';S.tour=true;S.step=0;S.tourPlay=!reduced;
  render();tourSchedule();if(!isRadial()){var jp=$('#jpath');if(jp)jp.scrollIntoView({block:'start'});setTimeout(tourFocus,300)}
}
function tourGo(i){S.step=Math.max(0,Math.min(S.journey.tools.length-1,i));render();tourSchedule();tourFocus()}

function bl(label,txt){return '<div class="bq"><small>'+label+'</small><p>'+esc(txt)+'</p></div>'}
function renderDrawer(){
  var el=$('#drawer'), sc=$('#scrim'), e=S.tool;
  if(!e){el.classList.remove('open');el.setAttribute('aria-hidden','true');return}
  var others=byKey.get(e.key).filter(function(x){return x!==e});
  var b=BR[e.key]||[e.name+' is listed under '+e.c.name+'.',e.c.description,'Explore its documentation to get started.',[]];
  var rs=ROUTES.filter(function(j){return j.tools.some(function(t){return t.toLowerCase()===e.key})});
  var sib=e.c.tools.filter(function(t){return t!==e.name});
  var rsHtml='';
  if(S.journey){
    var r=S.journey, idx=-1;r.tools.forEach(function(t,i){if(t.toLowerCase()===e.key&&idx<0)idx=i});
    if(idx>-1)rsHtml='<div class="rstep"><div class="dh" style="margin:0">'+(r.kind==='track'?'Track':'Journey')+' &middot; '+esc(r.short)+' &middot; step '+(idx+1)+' of '+r.tools.length+'</div><div>'+esc(r.notes[idx])+'</div>'+
      '<div class="rnav"><button data-rstep="'+(idx-1)+'"'+(idx<1?' disabled':'')+'>&larr; '+(idx>0?esc(r.tools[idx-1]):'Start')+'</button><button data-rstep="'+(idx+1)+'"'+(idx>=r.tools.length-1?' disabled':'')+'>'+(idx<r.tools.length-1?esc(r.tools[idx+1]):'End')+' &rarr;</button></div></div>';
  }
  var small=window.matchMedia('(max-width:700px)').matches;
  el.style.setProperty('--c',e.d.cvar);
  el.innerHTML='<div class="grab" aria-hidden="true"></div><div class="dtop"><div><div class="dkicker">'+esc(e.d.name)+' &rsaquo; '+esc(e.c.name)+'</div><h2>'+esc(e.name)+'</h2></div><button class="dclose" data-close-drawer aria-label="Close details">&times;</button></div>'+
    '<div class="sacts"><button class="stackbtn'+(inStack(e.key)?' on':'')+'" data-stack-toggle="'+esc(e.key)+'" aria-pressed="'+inStack(e.key)+'">'+(inStack(e.key)?'\u2713 In my stack':'+ Add to my stack')+'</button><button class="stackbtn'+(S.cmp.indexOf(e.key)>-1?' on':'')+'" data-cmp-toggle="'+esc(e.key)+'">'+(S.cmp.indexOf(e.key)>-1?'\u2713 Comparing':(S.cmp.length===1?'Compare with '+esc(nameOf(S.cmp[0])):'Compare'))+'</button></div>'+
    '<div class="brief">'+bl('What',b[0])+bl('Why it matters',b[1])+bl('How to start',b[2])+'</div>'+
    (b[3]&&b[3].length?'<div><div class="dh">Use cases</div><ul class="uses" style="margin-top:8px">'+b[3].map(function(u){return '<li>'+esc(u)+'</li>'}).join('')+'</ul></div>':'')+
    rsHtml+
    (rs.length?'<div><div class="dh">Journeys and tracks</div><div class="chips" style="margin-top:8px">'+rs.map(function(j){return '<button class="jbtn" data-journey="'+j.id+'"><span>'+esc(j.short)+'</span><small>'+(j.kind==='track'?'Role track':'Journey')+'</small></button>'}).join('')+'</div></div>':'')+
    '<div class="dbox"><small>Where it fits</small><strong>'+esc(e.c.name)+'</strong><p class="note">'+esc(e.c.description)+'</p>'+(others.length?'<p class="note">Also listed under '+others.map(function(x){return esc(x.c.name)}).join(', ')+'.</p>':'')+'</div>'+
    '<details class="more"'+(small?'':' open')+'><summary>More in this category ('+sib.length+')</summary><div class="chips" style="margin-top:4px">'+sib.map(function(t){return '<button class="chip" style="--c:'+e.d.cvar+'" data-tk="'+esc(t.toLowerCase())+'" data-cid="'+e.c.id+'">'+esc(t)+'</button>'}).join('')+'</div></details>';
  el.scrollTop=0;
  el.classList.add('open');el.setAttribute('aria-hidden','false');
}

function phaseColor(p){var e=byKey.get(p.tools[0].toLowerCase());return e?e[0].d.cvar:'var(--cyan)'}
function renderRoadmap(){
  var host=$('#roadmapView'), r=S.journey;
  if(!r){host.innerHTML='';return}
  var n=0;
  var strip=r.phases.map(function(p,i){return '<button class="rm-pill" style="--c:'+phaseColor(p)+'" data-rm-go="'+i+'"><b>'+(i+1)+'</b>'+esc(p.t)+'</button>'}).join('<span class="rm-arrow" aria-hidden="true">&rarr;</span>');
  var sw=ROUTES.filter(function(x){return r.custom?x.custom:(x.kind===r.kind&&!x.custom)}).map(function(x){return '<button class="lens'+(x.id===r.id?' on':'')+'" data-journey="'+x.id+'">'+esc(x.short)+'</button>'}).join('');
  var next=ROUTES.filter(function(x){return r.custom?x.custom:(x.kind===r.kind&&!x.custom)});var nx=next[(next.indexOf(r)+1)%next.length];
  var steps=r.phases.map(function(p,i){
    var chips=p.tools.map(function(t){n++;var e=byKey.get(t.toLowerCase())[0];
      return '<button class="chip" style="--c:'+e.d.cvar+'" data-tk="'+esc(t.toLowerCase())+'" data-cid="'+e.c.id+'"><b style="--c:'+e.d.cvar+'">'+n+'</b>'+esc(t)+'</button>'}).join('');
    return '<section class="rm-ph" id="ph-'+i+'" style="--c:'+phaseColor(p)+'"><span class="rm-n">'+(i+1)+'</span><h3>'+esc(p.t)+'</h3><p>'+esc(p.d)+'</p>'+
      '<div class="chips" style="margin:0">'+chips+'</div>'+
      '<div class="rm-meta"><div class="rm-out"><small>You end this phase with</small>'+esc(p.out)+'</div><div class="rm-risk"><small>Watch out for</small>'+esc(p.risk)+'</div></div></section>';
  }).join('');
  host.innerHTML='<div class="rm-top"><button class="tab" data-back style="--c:var(--cyan)">&larr; Atlas</button><div class="rm-sw" style="flex:1;min-width:0">'+sw+'</div></div>'+
    '<div class="rm-hero">'+(r.custom?'<span class="rm-custom">Drawn for you</span>':'')+'<div class="eyebrow">'+(r.kind==='track'?'Learning roadmap':'End-to-end journey')+' &middot; '+r.phases.length+' phases &middot; '+r.tools.length+' technologies</div><h2>'+esc(r.name)+'</h2><p>'+esc(r.story)+'</p>'+
    '<div class="rm-outcome"><small>'+(r.kind==='track'?'You will be able to':'At the end you have')+'</small>'+esc(r.outcome)+'</div></div>'+
    '<div><div class="dh" style="margin-bottom:6px">The route at a glance</div><div class="rm-strip">'+strip+'</div></div>'+
    '<div class="rm-line">'+steps+'</div>'+
    '<div class="rm-cta"><button class="pri" data-rm-atlas>See it on the atlas</button><button data-tour="start">&#9654; Play the tour</button><button data-rm-stack>Add all to my stack</button>'+(S.dl?'<button data-rm-pdf>Download PDF</button>':'')+'<a href="https://cal.com/hrishikesh.salunkhe/30min" target="_blank" rel="noopener">Talk to The Promise Office</a>'+(nx&&nx!==r?'<button data-journey="'+nx.id+'">Next: '+esc(nx.short)+' &rarr;</button>':'')+'</div>';
}

/* ---------- your own journey ---------- */
var EXAMPLES=['Launch a lending app for an NBFC','Add an AI helpdesk to our ITSM tool','Move an Oracle system to the cloud'];
function renderOwn(){
  var mine=ROUTES.filter(function(r){return r.custom}).reverse().slice(0,4);
  $('#ownex').innerHTML=mine.map(function(j){return '<button class="exbtn" style="border-style:solid;border-color:var(--cyan);color:var(--fg)" data-journey="'+j.id+'">'+esc(j.short)+'</button>'}).join('')+EXAMPLES.map(function(x,i){return '<button class="exbtn" data-own-ex="'+i+'">'+esc(x)+'</button>'}).join('');
}
function ownStatus(h){$('#ownstat').innerHTML=h;$('#ownstat').hidden=!h}
function allToolsByCat(){
  var out=[];DOM.forEach(function(d){d.cats.forEach(function(c){out.push(c.name+': '+c.tools.join(', '))})});return out.join('\n');
}
function ownPrompt(goal){
  return 'You design end-to-end IT delivery roadmaps for The Promise Office, a delivery and transformation advisory. A person describes a goal. Reply with ONLY one JSON object, no prose and no code fence.\n'+
  'Shape: {"name": short title, max 8 words, "story": 1-2 plain sentences setting the scene, "outcome": one sentence on what exists at the end, "phases": [{"t": phase title max 5 words, "d": 1-2 plain sentences on what happens, "out": what the team has at the end of the phase, "risk": one common pitfall, "tools": [["Exact Tool Name","what it does in this step, max 8 words"]]}]}\n'+
  'Rules: 4 to 6 phases in time order from idea to running and improving. 7 to 14 tools in total, 1 to 4 per phase, no tool repeated. Every tool name must be copied exactly from the list below. Plain language a non-engineer understands. Do not invent facts about the goal.\n'+
  'GOAL: '+goal+'\n\nTOOLS BY CATEGORY:\n'+allToolsByCat();
}
function clip(x,n){return String(x==null?'':x).replace(/\s+/g,' ').trim().slice(0,n)}
function buildCustom(obj){
  if(!obj||!Array.isArray(obj.phases))return null;
  var seen={}, phases=[], tools=[], notes=[];
  obj.phases.forEach(function(ph){
    if(!ph||!Array.isArray(ph.tools))return;
    var pt=[];
    ph.tools.forEach(function(t){
      var nm=Array.isArray(t)?t[0]:(t&&t.name)||t, nt=Array.isArray(t)?t[1]:(t&&t.note)||'';
      var es=byKey.get(String(nm).toLowerCase());if(!es)return;
      var e=es[0];if(seen[e.key])return;seen[e.key]=1;
      pt.push(e.name);tools.push(e.name);notes.push(clip(nt,90)||clip(ph.t,60));
    });
    if(pt.length)phases.push({t:clip(ph.t,60)||'Phase',d:clip(ph.d,320),out:clip(ph.out,160),risk:clip(ph.risk,160),tools:pt});
  });
  if(phases.length<2||tools.length<3)return null;
  var name=clip(obj.name,80)||'Your journey';
  return {id:'c-'+Date.now().toString(36),kind:'journey',custom:true,name:name,short:name.length>30?name.slice(0,28)+'...':name,
    brief:clip(obj.story,200),story:clip(obj.story,400),outcome:clip(obj.outcome,240),tools:tools,notes:notes,phases:phases};
}
function ownFallback(text){
  var toks=text.toLowerCase().split(/[^a-z0-9+#.]+/).filter(function(w){return w.length>2});
  var scored=ROUTES.filter(function(r){return !r.custom}).map(function(r){
    var hay=(r.name+' '+r.brief+' '+r.story+' '+r.tools.join(' ')).toLowerCase(), n=0;
    toks.forEach(function(w){if(hay.indexOf(w)>-1)n++});return {r:r,n:n}}).filter(function(x){return x.n>0}).sort(function(a,b){return b.n-a.n}).slice(0,3);
  return scored.length?'The live planner is not available here. Closest ready-made roadmaps: '+scored.map(function(x){return '<button class="exbtn" style="border-style:solid" data-journey="'+x.r.id+'">'+esc(x.r.short)+'</button>'}).join(' '):
    'The live planner is not available here, and no ready-made roadmap matches. Try the Journeys tab.';
}
var ownCtl=null;
async function ownGo(){
  var ta=$('#ownq'), text=clip(ta.value,300);
  if(text.length<6){ownStatus('Describe the goal in a few words, for example: '+esc(EXAMPLES[0]));return}
  if(S.busy)return;
  var sample=await getCap('sample');
  if(!sample){ownStatus(ownFallback(text));return}
  S.busy=true;$('#ownbox').classList.add('busy');R.querySelector('[data-own-stop]').hidden=false;
  ownStatus('Thinking<span class="dots"></span>');
  ownCtl=new AbortController();
  try{
    var res=await sample(ownPrompt(text),{signal:ownCtl.signal,modelTier:'default',cache:false,onText:function(t){ownStatus('Drawing the roadmap<span class="dots"></span>')}});
    var raw=String(res.text||''), a=raw.indexOf('{'), b=raw.lastIndexOf('}');
    var obj=null;try{obj=JSON.parse(raw.slice(a,b+1))}catch(_){}
    var r=buildCustom(obj);
    if(!r){ownStatus('That did not come back as a usable roadmap. Try rephrasing the goal.');return}
    ROUTES.push(r);saveCustoms();ownStatus('');
    S.tool=null;S.view='roadmap';S.rtab='own';setJourney(r);toTop();
  }catch(e){
    var c=e&&e.code;
    ownStatus(c==='cancelled'?'Stopped.':c==='not_granted'?'Permission to ask Claude was not given. '+ownFallback(text):c==='rate_limited'?'Busy right now. Wait a moment and try again.':'Could not draw this one. '+ownFallback(text));
  }finally{
    S.busy=false;ownCtl=null;$('#ownbox').classList.remove('busy');var st=R.querySelector('[data-own-stop]');if(st)st.hidden=true;
  }
}

/* ---------- PDF ---------- */
function drawMark(doc,x,y,size){
  var k=size/64, INK=[26,25,21], CREAM=[243,241,234], AMB=[240,180,60], WH=[255,255,255];
  doc.circle(x+32*k,y+32.5*k,32.7*k,INK);
  doc.arc(x+32*k,y+32*k,26.5*k,42.8,343,CREAM,5.6*k,true);
  doc.arc(x+32*k,y+32*k,26.5*k,343,402.8,AMB,5.6*k,true);
  doc.rrect(x+21.5*k,y+19.5*k,7.4*k,27*k,2.6*k,WH);
  var rad=Math.PI/180;
  function P(cx,cy,r,a){return [x+(cx+r*Math.cos(a*rad))*k,y+(cy+r*Math.sin(a*rad))*k]}
  function bez(cx,cy,r,a0,a1){var t=4/3*Math.tan((a1-a0)*rad/4),p0=P(cx,cy,r,a0),p3=P(cx,cy,r,a1);
    return [p0[0]-t*r*k*Math.sin(a0*rad),p0[1]+t*r*k*Math.cos(a0*rad),p3[0]+t*r*k*Math.sin(a1*rad),p3[1]-t*r*k*Math.cos(a1*rad),p3[0],p3[1]]}
  var pts=[P(28.65,26.6,12.4,-90),bez(28.65,26.6,12.4,-90,0),bez(28.65,26.6,12.4,0,90),P(29.06,26.6,5.6,90),bez(29.06,26.6,5.6,90,0),bez(29.06,26.6,5.6,0,-90)];
  doc.poly(pts,WH);
}
function makePdf(r){
  var doc=new PDFW.Doc(), W=210, H=297, M=16, CW=W-2*M;
  var NIGHT=[22,19,43], PLUM=[75,46,131], AMBER=[240,180,60], AMBD=[158,104,8], INK=[26,25,21], MUT=[107,103,94], CREAM=[243,241,234], LILAC=[183,166,217], GREEN=[47,143,91], WHITE=[255,255,255];
  function band(first){
    doc.rect(0,0,W,first?32:15,NIGHT);
    drawMark(doc,M,first?7:3.2,first?18:8.6);
    var x=M+(first?23:11.5);
    doc.text('THE PROMISE OFFICE',x,first?15:9.2,{bold:1,size:first?12:8.5,color:CREAM});
    if(first)doc.text('Make the promise deliverable',x,20.5,{size:8.5,color:LILAC});
    doc.text('THE LIVING IT ATLAS',W-M,first?15:9.2,{bold:1,size:first?8:7,color:AMBER,align:'right'});
  }
  band(true);
  var y=44;
  doc.text((r.kind==='track'?'LEARNING ROADMAP':'END-TO-END JOURNEY')+'  |  '+r.phases.length+' PHASES  |  '+r.tools.length+' TECHNOLOGIES',M,y,{bold:1,size:8,color:AMBD});y+=8;
  var tl=doc.wrap(r.name,1,21,CW);y+=doc.paras(tl,M,y+3,{bold:1,size:21,color:PLUM},9)+3;
  var st=doc.wrap(r.story,0,10.5,CW);y+=doc.paras(st,M,y+1,{size:10.5,color:INK},5)+4;
  var oc=doc.wrap(r.outcome,0,10,CW-10), oh=oc.length*5+11;
  doc.rrect(M,y,CW,oh,2,CREAM);doc.rect(M,y,1.6,oh,AMBER);
  doc.text(r.kind==='track'?'YOU WILL BE ABLE TO':'AT THE END YOU HAVE',M+5,y+5.5,{bold:1,size:7.5,color:AMBD});
  doc.paras(oc,M+5,y+11,{size:10,color:INK},5);y+=oh+10;
  var n=r.phases.length, gap=CW/n;
  doc.line(M+gap/2,y+4,M+CW-gap/2,y+4,LILAC,.6);
  r.phases.forEach(function(ph,i){
    var cx=M+gap*i+gap/2;doc.circle(cx,y+4,4,i%2?PLUM:AMBER);
    doc.text(String(i+1),cx,y+5.4,{bold:1,size:9,color:i%2?WHITE:INK,align:'center'});
    doc.paras(doc.wrap(ph.t,1,7.5,gap-3),cx,y+11.5,{bold:1,size:7.5,color:PLUM,align:'center'},3.4);
  });
  y+=28;
  var num=0;
  r.phases.forEach(function(ph,i){
    var dl=doc.wrap(ph.d,0,9.5,CW-12), ol=doc.wrap(ph.out,0,9,CW-34), rl=doc.wrap(ph.risk,0,9,CW-34);
    var tools=ph.tools.map(function(t){num++;return num+'. '+t}).join('  \u00b7  ');
    var tlines=doc.wrap(tools,1,9,CW-12);
    var need=10+dl.length*4.6+1.5+tlines.length*4.6+1.5+ol.length*4.4+1.2+rl.length*4.4+9;
    if(y+need>H-18){doc.addPage();band(false);y=26}
    doc.circle(M+3.5,y+3,3.5,i%2?PLUM:AMBER);
    doc.text(String(i+1),M+3.5,y+4.3,{bold:1,size:9,color:i%2?WHITE:INK,align:'center'});
    doc.text(ph.t,M+12,y+4,{bold:1,size:12.5,color:PLUM});
    var yy=y+10;
    doc.paras(dl,M+12,yy,{size:9.5,color:INK},4.6);yy+=dl.length*4.6+1.5;
    doc.paras(tlines,M+12,yy,{bold:1,size:9,color:PLUM},4.6);yy+=tlines.length*4.6+1.5;
    doc.text('END WITH',M+12,yy,{bold:1,size:8,color:GREEN});doc.paras(ol,M+34,yy,{size:9,color:INK},4.4);yy+=ol.length*4.4+1.2;
    doc.text('WATCH OUT',M+12,yy,{bold:1,size:8,color:AMBD});doc.paras(rl,M+34,yy,{size:9,color:INK},4.4);yy+=rl.length*4.4;
    if(i<r.phases.length-1)doc.line(M+3.5,y+7,M+3.5,yy+8,LILAC,.3);
    y=yy+9;
  });
  if(y+26>H-18){doc.addPage();band(false);y=26}
  doc.rrect(M,y,CW,22,3,NIGHT);
  doc.text('Need help delivering this?',M+6,y+9,{bold:1,size:11,color:CREAM});
  doc.text('Talk to The Promise Office - thepromiseoffice.com',M+6,y+16,{size:9,color:AMBER});
  doc.link(M,y,CW,22,'https://www.thepromiseoffice.com');
  var pages=doc.pages.length;
  for(var p=1;p<=pages;p++){doc.page(p);doc.line(M,H-12,W-M,H-12,LILAC,.2);
    doc.text('The Promise Office  |  Make the promise deliverable  |  An illustration, not a prescribed stack.',M,H-7.5,{size:7.5,color:MUT});
    doc.text('Page '+p+' of '+pages,W-M,H-7.5,{size:7.5,color:MUT,align:'right'})}
  return doc.blob();
}
async function exportPdf(){
  var r=S.journey;if(!r)return;
  var dl=await getCap('downloads');
  toast('Preparing PDF...');
  try{
    var blob=makePdf(r);
    var slug=r.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)||'roadmap';
    if(dl){await dl.save({filename:'roadmap-'+slug+'.pdf',data:blob})}else{var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='roadmap-'+slug+'.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000)}
    toast('PDF ready');
  }catch(e){
    var c=e&&e.code;
    if(c==='declined')return;
    toast('Could not save the PDF');
  }
}
S.dl=true;

function renderLens(){
  $('#lenschips').innerHTML='<button class="lens'+(S.lens?'':' on')+'" data-lens="">Everyone</button>'+ROLES.map(function(r){return '<button class="lens'+(S.lens===r.id?' on':'')+'" data-lens="'+r.id+'">'+esc(r.name)+'</button>'}).join('');
  $('#stackn').textContent=S.stack.length;
  var cur=ROLES.filter(function(x){return x.id===S.lens})[0];$('#lensnow').textContent=cur?cur.name:'Everyone';
  var n=$('#lensnote'), r=ROLES.filter(function(x){return x.id===S.lens})[0];
  if(r&&!S.journey&&!S.q){n.hidden=false;n.innerHTML='Viewing as <b>'+esc(r.name)+'</b>: '+r.cats.length+' of '+CATCOUNT+' categories in focus, the rest dimmed.'}else{n.hidden=true}
}
function coverage(){var n=0;DOM.forEach(function(d){d.cats.forEach(function(c){if(stackIn(c).length)n++})});return n}
function nameOf(k){var e=byKey.get(k);return e?e[0].name:k}
function renderStack(){
  var el=$('#stackpanel');
  if(!S.stackOpen){el.classList.remove('open');el.setAttribute('aria-hidden','true');return}
  var cov=coverage(), ec=ESS.filter(function(id){return stackIn(CATBY[id].c).length}).length;
  var h='<div class="grab" aria-hidden="true"></div><div class="dtop"><div><div class="dkicker" style="color:var(--cyan)">Build my stack</div><h2>My stack</h2></div><button class="dclose" data-close-drawer aria-label="Close">&times;</button></div>';
  h+='<p class="note">Open any technology and tap <b>Add to my stack</b>. See what you cover and where the gaps are.</p>';
  h+='<div><div class="dh">Coverage</div><p style="margin:6px 0"><b>'+S.stack.length+'</b> technologies &middot; <b>'+cov+'</b> of '+CATCOUNT+' categories &middot; essentials <b>'+ec+'</b> of '+ESS.length+'</p><div class="meter"><span style="width:'+Math.round(ec/ESS.length*100)+'%"></span></div></div>';
  h+='<div><div class="dh">Essentials checklist</div><div class="ess" style="margin-top:8px">'+ESS.map(function(id){
    var x=CATBY[id], picks=stackIn(x.c);
    return '<button class="essrow'+(picks.length?' ok':'')+'" style="--c:'+x.d.cvar+'" data-open-cat="'+id+'" data-dom="'+x.d.id+'"><i>'+(picks.length?'✓':'')+'</i><span>'+esc(x.c.name)+'</span><small>'+(picks.length?esc(picks.map(nameOf).join(', ')):'Gap: tap to choose')+'</small></button>';}).join('')+'</div></div>';
  var groups=DOM.map(function(d){
    var rows=d.cats.map(function(c){var p=stackIn(c);return p.length?'<div style="margin-top:8px"><div class="note">'+esc(c.name)+'</div><div class="chips" style="margin-top:4px">'+p.map(function(k){return '<button class="chip mine" style="--c:'+d.cvar+'" data-tk="'+esc(k)+'" data-cid="'+c.id+'">'+esc(nameOf(k))+'</button><button class="clear rmx" data-stack-rm="'+esc(k)+'" aria-label="Remove '+esc(nameOf(k))+'">&times;</button>'}).join('')+'</div></div>':''}).join('');
    return rows?'<div><div class="dh" style="color:'+d.cvar+'">'+esc(d.name)+'</div>'+rows+'</div>':'';}).join('');
  h+=groups||'<div class="dbox"><small>Nothing yet</small>Your picks will appear here, grouped by domain.</div>';
  h+='<div class="sacts"><button class="pri" data-stack-copy'+(S.stack.length?'':' disabled')+'>Copy summary</button><button data-stack-clear'+(S.stack.length?'':' disabled')+'>Clear</button></div>';
  el.style.setProperty('--c','var(--cyan)');el.innerHTML=h;
  el.classList.add('open');el.setAttribute('aria-hidden','false');
}
function stackText(){
  var out=['My IT stack ('+S.stack.length+' technologies, '+coverage()+' of '+CATCOUNT+' categories)',''];
  DOM.forEach(function(d){var ls=[];d.cats.forEach(function(c){var p=stackIn(c);if(p.length)ls.push('  '+c.name+': '+p.map(nameOf).join(', '))});if(ls.length){out.push(d.name);out=out.concat(ls)}});
  var gaps=ESS.filter(function(id){return !stackIn(CATBY[id].c).length}).map(function(id){return CATBY[id].c.name});
  if(gaps.length)out.push('','Essentials not yet covered: '+gaps.join(', '));
  return out.join('\n');
}
function copyText(t){
  function fb(){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand('copy')}catch(_){}a.remove();toast(ok?'Summary copied':'Copy blocked here')}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast('Summary copied')},fb)}else fb();
}
function toggleStack(k){var i=S.stack.indexOf(k);if(i>-1)S.stack.splice(i,1);else S.stack.push(k);saveStack();render()}

function toggleCmp(k){
  var i=S.cmp.indexOf(k);
  if(i>-1)S.cmp.splice(i,1);else{S.cmp.push(k);if(S.cmp.length>2)S.cmp.shift()}
  if(S.cmp.length===2){S.tool=null;S.stackOpen=false;S.cmpOpen=true}
  render();
}
function renderCmp(){
  var tray=$('#cmptray'), el=$('#cmppanel');
  var showTray=S.cmp.length>0&&!S.cmpOpen&&!S.tool;
  tray.hidden=!showTray;
  if(showTray)tray.innerHTML='<span class="lab">Compare</span>'+S.cmp.map(function(k){return '<span class="ct">'+esc(nameOf(k))+'<button data-cmp-rm="'+esc(k)+'" aria-label="Remove '+esc(nameOf(k))+'">&times;</button></span>'}).join('')+(S.cmp.length<2?'<span class="note">Pick a second technology</span>':'<button class="stackbtn" data-cmp-open>Compare &rarr;</button>');
  if(!(S.cmpOpen&&S.cmp.length===2)){el.classList.remove('open');el.setAttribute('aria-hidden','true');return}
  var E=S.cmp.map(function(k){return byKey.get(k)[0]}), B=S.cmp.map(function(k){return BR[k]||['','','',[]]});
  function col(i,html){return '<div class="cmpcol" style="--c:'+E[i].d.cvar+'"><span class="who">'+esc(E[i].name)+'</span>'+html+'</div>'}
  function sec(label,f){return '<div><div class="dh">'+label+'</div><div class="cmpgrid" style="margin-top:6px">'+col(0,f(0))+col(1,f(1))+'</div></div>'}
  var same=E[0].c===E[1].c;
  var verdict=same?'Both sit in <b>'+esc(E[0].c.name)+'</b>, so they are direct alternatives. Pick by team skills and the use cases below.':
    '<b>'+esc(E[0].name)+'</b> lives in '+esc(E[0].c.name)+' and <b>'+esc(E[1].name)+'</b> in '+esc(E[1].c.name)+'. They solve different problems and often work together.';
  var h='<div class="grab" aria-hidden="true"></div><div class="dtop"><div><div class="dkicker" style="color:var(--cyan)">Compare</div><h2>'+esc(E[0].name)+' <span style="color:var(--muted)">vs</span> '+esc(E[1].name)+'</h2></div><button class="dclose" data-close-drawer aria-label="Close">&times;</button></div>'+
    '<div class="cmpgrid">'+E.map(function(e){return '<div class="cmphead" style="--c:'+e.d.cvar+'"><div class="dkicker">'+esc(e.d.name)+' &rsaquo; '+esc(e.c.name)+'</div><h3>'+esc(e.name)+'</h3></div>'}).join('')+'</div>'+
    '<div class="cmpverdict">'+verdict+'</div>'+
    sec('What',function(i){return '<p>'+esc(B[i][0])+'</p>'})+
    sec('Why it matters',function(i){return '<p>'+esc(B[i][1])+'</p>'})+
    sec('How to start',function(i){return '<p>'+esc(B[i][2])+'</p>'})+
    sec('Reach for it when',function(i){return '<ul>'+(B[i][3]||[]).map(function(u){return '<li>'+esc(u)+'</li>'}).join('')+'</ul>'})+
    '<div class="sacts">'+E.map(function(e){return '<button data-tk="'+esc(e.key)+'" data-cid="'+e.c.id+'">Open '+esc(e.name)+'</button>'}).join('')+'<button data-cmp-clear>New comparison</button></div>';
  el.style.setProperty('--c','var(--cyan)');el.innerHTML=h;el.scrollTop=0;
  el.classList.add('open');el.setAttribute('aria-hidden','false');
}

function render(){
  var atlas=S.view==='atlas';
  var road=S.view==='roadmap';
  $('#atlasView').hidden=!atlas;$('#domainView').hidden=atlas||road;$('#roadmapView').hidden=!road;
  renderJourneys();renderLens();
  if(atlas)renderAtlas();else if(road){$('#domainView').innerHTML='';renderRoadmap()}else renderDomain();
  renderDrawer();renderStack();renderCmp();
  $('#scrim').classList.toggle('on',!!(S.tool||S.stackOpen||S.cmpOpen));
}
function scrollToCat(cid){
  var el=R.getElementById('cat-'+cid);if(!el)return;
  el.scrollIntoView({block:'center',behavior:reduced?'auto':'smooth'});
  el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');
}
function openDomain(id,cid){
  S.view=id;S.focus=cid||null;S.only=cid||null;S.tool=null;S.stackOpen=false;S.cmpOpen=false;tourClear();render();
  if(cid)scrollToCat(cid);else toTop();
}
function back(){tourClear();S.view='atlas';S.focus=null;S.only=null;S.tool=null;render();toTop()}
function openTool(e){
  var change=S.view!==e.d.id&&S.view!=='roadmap';
  S.tool=e;S.stackOpen=false;S.cmpOpen=false;if(S.tour){tourClear()}
  if(S.journey){var ix=-1;S.journey.tools.forEach(function(t,i){if(t.toLowerCase()===e.key&&ix<0)ix=i});if(ix>-1)S.step=ix}
  if(change){S.view=e.d.id;S.focus=e.c.id;S.only=e.c.id}else if(S.only&&S.only!==e.c.id&&S.view===e.d.id){S.only=e.c.id;S.focus=e.c.id}
  render();
  if(change)scrollToCat(e.c.id);
}

/* search */
function hideResults(){var r=$('#results');r.hidden=true;r.innerHTML='';RES=[]}
function showResults(raw){
  var r=$('#results'), q=S.q;
  if(!q){hideResults();return}
  var m=ENTRIES.filter(function(e){return e.key.indexOf(q)>-1});
  m.sort(function(a,b){return (b.key.indexOf(q)===0)-(a.key.indexOf(q)===0)||a.key.localeCompare(b.key)});
  RES=m.slice(0,8);
  r.innerHTML=RES.length?RES.map(function(e){
    return '<button class="res" role="option" data-tk="'+esc(e.key)+'" data-cid="'+e.c.id+'"><span>'+esc(e.name)+'</span><small>'+esc(e.c.name)+' &middot; '+esc(e.d.name)+'</small></button>';}).join('')
    :'<div class="none">No technology matches &ldquo;'+esc(raw)+'&rdquo;.</div>';
  r.hidden=false;
}
$('#q').addEventListener('input',function(ev){
  var raw=ev.target.value;S.q=raw.trim().toLowerCase();
  if(S.q&&S.journey){tourClear();S.journey=null;J=new Map();JC=new Map()}
  showResults(raw);render();
});
$('#q').addEventListener('keydown',function(ev){
  if(ev.key==='Enter'&&RES[0]){ev.preventDefault();var e=RES[0];hideResults();$('#q').value='';S.q='';openTool(e)}
});

on(R,'click',function(ev){
  var t=ev.target;
  var b=t.closest&&t.closest('[data-tk]');
  if(b){var e=entryFor(b.getAttribute('data-tk'),b.getAttribute('data-cid'));if(e){hideResults();if(S.q){S.q='';$('#q').value=''}openTool(e)}return}
  b=t.closest('[data-open-cat]');if(b){openDomain(b.getAttribute('data-dom'),b.getAttribute('data-open-cat'));return}
  b=t.closest('[data-cat-pick]');if(b){S.only=b.getAttribute('data-cat-pick')||null;S.focus=null;render();if(window.matchMedia('(max-width:800px)').matches){var dl=R.querySelector('.dv-layout');if(dl)dl.scrollIntoView({block:'start'})}return}
  b=t.closest('[data-plan]');if(b){var pj=!(S.jopen||S.journey);if(!pj){S.jopen=false;if(S.journey){setJourney(null)}}else S.jopen=true;render();if(pj){var pb=$('#routesbox');if(pb)pb.scrollIntoView({block:'nearest',behavior:reduced?'auto':'smooth'})}return}
  b=t.closest('.dhead');if(b&&window.matchMedia('(max-width:700px)').matches&&b.closest('#stagecards,#core')){var sd=b.getAttribute('data-open-domain');S.open[sd]=!S.open[sd];renderAtlas();return}
  b=t.closest('[data-open-domain]');if(b){openDomain(b.getAttribute('data-open-domain'));return}
  b=t.closest('[data-back]');if(b){back();return}
  b=t.closest('[data-tour]');
  if(b){var tv=b.getAttribute('data-tour');
    if(tv==='start')tourStart();
    else if(tv==='exit'){tourClear();render()}
    else if(tv==='prev')tourGo(S.step-1);
    else if(tv==='next')tourGo(S.step+1);
    else if(tv==='toggle'){if(S.step>=S.journey.tools.length-1){S.step=0;S.tourPlay=true}else S.tourPlay=!S.tourPlay;render();tourSchedule();tourFocus()}
    else if(tv==='brief'){var te=stepEntry(S.journey,S.step);tourClear();if(te)openTool(te)}
    return}
  b=t.closest('[data-cmp-toggle]');if(b){toggleCmp(b.getAttribute('data-cmp-toggle'));return}
  b=t.closest('[data-cmp-rm]');if(b){var ci=S.cmp.indexOf(b.getAttribute('data-cmp-rm'));if(ci>-1)S.cmp.splice(ci,1);S.cmpOpen=false;render();return}
  b=t.closest('[data-cmp-open]');if(b){if(S.cmp.length===2){S.cmpOpen=true;render()}return}
  b=t.closest('[data-cmp-clear]');if(b){S.cmp=[];S.cmpOpen=false;render();return}
  b=t.closest('[data-stack-toggle]');if(b){toggleStack(b.getAttribute('data-stack-toggle'));return}
  b=t.closest('[data-stack-rm]');if(b){toggleStack(b.getAttribute('data-stack-rm'));return}
  b=t.closest('[data-stack-open]');if(b){S.tool=null;S.cmpOpen=false;S.stackOpen=true;render();return}
  b=t.closest('[data-stack-copy]');if(b){copyText(stackText());return}
  b=t.closest('[data-stack-clear]');if(b){S.stack=[];saveStack();render();return}
  b=t.closest('[data-lens-toggle]');if(b){var lp=$('#lenschips');lp.hidden=!lp.hidden;b.setAttribute('aria-expanded',String(!lp.hidden));return}
  b=t.closest('[data-jmore]');if(b){S.jmore=true;renderJourneys();return}
  b=t.closest('[data-lens]');if(b){S.lens=b.getAttribute('data-lens')||null;$('#lenschips').hidden=true;$('#lensbtn').setAttribute('aria-expanded','false');render();return}
  b=t.closest('[data-rstep]');
  if(b){var ri=+b.getAttribute('data-rstep'), re=S.journey&&stepEntry(S.journey,ri);if(re){S.step=ri;openTool(re)}return}
  b=t.closest('[data-rtab]');if(b){S.rtab=b.getAttribute('data-rtab');renderJourneys();return}
  b=t.closest('[data-nav]');
  if(b){var nv=b.getAttribute('data-nav');S.tool=null;S.cmpOpen=false;
    if(nv==='atlas'){S.view='atlas';setJourney(null);toTop()}
    else if(nv==='stack'){S.stackOpen=true;render()}
    else if(nv==='search'){S.view='atlas';render();toTop();$('#q').focus()}
    else{S.rtab=nv;S.view='atlas';S.jopen=true;render();var rb=$('#routesbox');if(rb)rb.scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'})}
    return}
  b=t.closest('[data-journey]');
  if(b){var j=routeById(b.getAttribute('data-journey'));
    S.tool=null;S.cmpOpen=false;S.stackOpen=false;S.view='roadmap';S.rtab=j.kind;setJourney(j);toTop();return}
  b=t.closest('[data-own-go]');if(b){ownGo();return}
  b=t.closest('[data-own-stop]');if(b){if(ownCtl)ownCtl.abort();return}
  b=t.closest('[data-own-ex]');if(b){var ta=$('#ownq');ta.value=EXAMPLES[+b.getAttribute('data-own-ex')];ta.focus();ownStatus('');return}
  b=t.closest('[data-rm-pdf]');if(b){exportPdf();return}
  b=t.closest('[data-roadmap]');if(b&&S.journey){tourClear();S.view='roadmap';render();toTop();return}
  b=t.closest('[data-rm-atlas]');if(b){S.view='atlas';render();toTop();return}
  b=t.closest('[data-rm-go]');if(b){var ph=R.getElementById('ph-'+b.getAttribute('data-rm-go'));if(ph)ph.scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'});return}
  b=t.closest('[data-rm-stack]');if(b&&S.journey){var add=0;S.journey.tools.forEach(function(t2){var k=t2.toLowerCase();if(!inStack(k)){S.stack.push(k);add++}});saveStack();render();toast(add?add+' added to your stack':'Already in your stack');return}
  b=t.closest('[data-clear-journey]');if(b){setJourney(null);return}
  b=t.closest('[data-close-drawer]');if(b){S.tool=null;S.stackOpen=false;S.cmpOpen=false;render();return}
  if(!t.closest('.searchwrap'))hideResults();
  if(!t.closest('.lensmenu')){var lq=$('#lenschips');if(lq&&!lq.hidden){lq.hidden=true;$('#lensbtn').setAttribute('aria-expanded','false')}}
});
$('#ownq').addEventListener('keydown',function(ev){if(ev.key==='Enter'&&!ev.shiftKey){ev.preventDefault();ownGo()}});
on(document,'keydown',function(ev){
  var typing=/^(INPUT|TEXTAREA)$/.test(((R.activeElement||document.activeElement)||{}).tagName||'');
  if(ev.key==='/'&&!typing){ev.preventDefault();$('#q').focus();return}
  if(ev.key==='Escape'){
    if(!$('#results').hidden){hideResults();return}
    if(S.tool||S.stackOpen||S.cmpOpen){S.tool=null;S.stackOpen=false;S.cmpOpen=false;render();return}
    if(S.tour){tourClear();render();return}
    if(S.q){S.q='';$('#q').value='';render();return}
    if(S.view!=='atlas'){back()}
  }
});
on(window,'resize',function(){if(S.view==='atlas')layout();else fit()});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(S.view==='atlas')layout()});

render();
return function(){DEAD=true;L.forEach(function(x){x[0].removeEventListener(x[1],x[2])});try{clearInterval(tourTimer)}catch(_){}try{if(ownCtl)ownCtl.abort()}catch(_){}try{clearTimeout(toast.h)}catch(_){}};
}
