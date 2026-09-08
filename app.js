const pages = {
  dashboard:["Dashboard Executivo","Visão consolidada dos principais indicadores"],
  analytics:["IA Analytics","Inteligência artificial aplicada aos dados"],
  quality:["Data Quality","Qualidade, consistência e confiabilidade"],
  anomalies:["Detecção de Anomalias","Eventos fora do comportamento esperado"],
  sql:["SQL Explorer","Consultas e camada de dados"]
};

function go(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
  document.getElementById(page).classList.add("active-page");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  document.getElementById("pageTitle").textContent=pages[page][0];
  document.getElementById("pageSubtitle").textContent=pages[page][1];
  document.querySelector(".sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>go(b.dataset.page));
document.querySelectorAll("[data-page-link]").forEach(b=>b.onclick=()=>go(b.dataset.pageLink));

const canvas=document.getElementById("membersChart"), ctx=canvas.getContext("2d");
function drawLine(){
  const d=devicePixelRatio||1, w=canvas.clientWidth, h=canvas.clientHeight;
  canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);
  ctx.clearRect(0,0,w,h);
  const vals=[351,358,361,370,376,383,391,399,405,414,421,428];
  ctx.strokeStyle="#edf0f2";ctx.lineWidth=1;
  for(let y=25;y<h-25;y+=42){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  const max=440,min=340;
  ctx.beginPath(); vals.forEach((v,i)=>{let x=20+i*(w-40)/(vals.length-1), y=h-28-(v-min)/(max-min)*(h-60);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle="#b48935";ctx.lineWidth=3;ctx.stroke();
  vals.forEach((v,i)=>{let x=20+i*(w-40)/(vals.length-1),y=h-28-(v-min)/(max-min)*(h-60);ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle="#b48935";ctx.fill()});
}
const rc=document.getElementById("regionChart"), rctx=rc.getContext("2d");
function drawPie(){
  const d=devicePixelRatio||1,w=rc.clientWidth,h=rc.clientHeight;rc.width=w*d;rc.height=h*d;rctx.setTransform(d,0,0,d,0,0);rctx.clearRect(0,0,w,h);
  const data=[38,27,21,14],cx=w/2,cy=h/2-5,r=Math.min(w,h)*.33;let a=-Math.PI/2;
  data.forEach(v=>{const b=a+v/100*Math.PI*2;rctx.beginPath();rctx.moveTo(cx,cy);rctx.arc(cx,cy,r,a,b);rctx.closePath();rctx.fillStyle=["#b48935","#7b8790","#4f6675","#cdd3d7"][data.indexOf(v)];rctx.fill();a=b});
  rctx.beginPath();rctx.arc(cx,cy,r*.55,0,Math.PI*2);rctx.fillStyle="#fff";rctx.fill();
}
drawLine();drawPie();window.onresize=()=>{drawLine();drawPie()};

const responses={
 "Quais indicadores precisam de atenção?":"Identifiquei dois pontos prioritários: <b>inadimplência (+8,3%)</b> e <b>cancelamentos (+18,4%)</b>. A recomendação é cruzar esses indicadores por região, plano e tempo de permanência para localizar o principal fator de risco.",
 "Qual região apresenta maior risco?":"A análise demonstrativa aponta <b>São José do Rio Preto</b> como região de maior atenção, devido à elevação de cancelamentos. O próximo passo recomendado é segmentar os associados afetados e comparar com o histórico.",
 "Como está a retenção?":"A taxa de retenção está em <b>94,7%</b>, indicando um cenário saudável no conjunto demonstrativo. Ainda assim, existem bolsões regionais de cancelamento que merecem investigação.",
 "default":"Com base no dataset demonstrativo, encontrei padrões relevantes em receita, retenção, inadimplência e cancelamentos. Posso detalhar qualquer um desses indicadores ou comparar regiões."
};
function ask(q){
  const box=document.getElementById("chatMessages");
  box.insertAdjacentHTML("beforeend",`<div class="message user"><div><b>Você</b><p>${q}</p></div></div>`);
  setTimeout(()=>{box.insertAdjacentHTML("beforeend",`<div class="message ai"><div class="ai-orb small">✦</div><div><b>Prever AI</b><p>${responses[q]||responses.default}</p></div></div>`);box.scrollTop=box.scrollHeight},350);
}
document.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{go("analytics");ask(b.dataset.question)});
document.getElementById("sendBtn").onclick=()=>{const i=document.getElementById("chatInput"),q=i.value.trim();if(q){ask(q);i.value=""}};
document.getElementById("chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("sendBtn").click()});
document.getElementById("runSql").onclick=()=>{const r=document.getElementById("sqlResult");r.classList.remove("hidden");document.getElementById("runSql").textContent="✓ Executada"};
document.getElementById("refreshAnomalies").onclick=e=>{e.target.textContent="✓ Análise atualizada";setTimeout(()=>e.target.textContent="↻ Reprocessar análise",1500)};
document.getElementById("themeBtn").onclick=()=>document.documentElement.classList.toggle("dark");
document.getElementById("mobileMenu").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");

