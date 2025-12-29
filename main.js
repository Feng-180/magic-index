const container = document.getElementById("cards");

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
  })
  .catch(err => {
    container.innerHTML = '<p>工具数据加载失败，请检查 tools.json 是否存在或格式正确。</p>';
    console.error(err);
  });