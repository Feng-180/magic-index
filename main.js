const container = document.getElementById("cards");

// 光圈跟随鼠标/手指
document.addEventListener("mousemove", e => {
  let circle = document.getElementById("cursorCircle");
  if(!circle){
    circle = document.createElement("div");
    circle.id="cursorCircle";
    circle.style.position="fixed";
    circle.style.width="40px";
    circle.style.height="40px";
    circle.style.border="2px solid #ff66cc";
    circle.style.borderRadius="50%";
    circle.style.pointerEvents="none";
    circle.style.transition="transform 0.05s, left 0.05s, top 0.05s";
    document.body.appendChild(circle);
  }
  circle.style.left = (e.clientX-20)+"px";
  circle.style.top = (e.clientY-20)+"px";
});

fetch('tools.json')
  .then(res => res.json())
  .then(tools => {
    tools.forEach(tool => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h2>${tool.title}</h2>
                        <p class="danger-${tool.danger}">危险等级：${tool.danger}</p>
                        <a href="${tool.url}" target="_blank">进入工具</a>`;
      container.appendChild(card);
    });

    // S 级随机高亮 1~3 个
    const sCards = Array.from(container.querySelectorAll(".danger-S")).map(p=>p.parentElement);
    const count = Math.min(3, sCards.length);
    const shuffled = sCards.sort(() => 0.5 - Math.random());
    for(let i=0;i<count;i++){
      shuffled[i].style.boxShadow = "0 0 30px #ff3300,0 0 60px #ff6600";
      shuffled[i].style.transform += " scale(1.08)";
    }
  })
  .catch(err=>{
    container.innerHTML='<p>工具数据加载失败，请检查 tools.json 是否存在或格式正确。</p>';
    console.error(err);
  });