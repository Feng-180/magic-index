document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('tools-grid');

    // 加上随机数 ?t=，强行杀掉缓存
    fetch('./tools.json?t=' + new Date().getTime())
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = data.map(tool => {
                // 容错处理：不管是 name 还是 title，只要有字就显示出来
                const displayName = tool.name || tool.title || tool.label || "未命名的禁术";
                return `
                    <a href="${tool.url || '#'}" class="card" target="_blank">
                        <div class="icon">${tool.icon || '🔮'}</div>
                        <div class="name">${displayName}</div>
                    </a>
                `;
            }).join('');
        })
        .catch(err => {
            grid.innerHTML = '<p>读取失败，请检查 tools.json 格式</p>';
        });
});