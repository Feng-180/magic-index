document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('tools-grid');

    // 加上 ./ 确保路径正确
    fetch('./tools.json')
        .then(response => response.json())
        .then(data => {
            grid.innerHTML = data.map(tool => {
                // 自动识别字段，防止出现 undefined
                const name = tool.name || tool.title || "未知禁术";
                const icon = tool.icon || "🔮";
                const url = tool.url || "#";
                
                return `
                    <a href="${url}" class="card" target="_blank">
                        <div class="icon">${icon}</div>
                        <div class="name">${name}</div>
                    </a>
                `;
            }).join('');
        })
        .catch(err => {
            console.error('加载失败:', err);
            grid.innerHTML = '<p>禁术目录加载失败</p>';
        });
});