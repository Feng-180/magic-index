const API_URL = "https://api.siliconflow.cn/v1/chat/completions";

const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("send");
const themeToggleBtn = document.getElementById("theme-toggle");

let messages = [];

/**
 * 添加一条消息到聊天窗口
 * 若为 assistant 且启用打字机效果，则使用 typeWriter 渐进显示
 */
function addMessage(role, content, useTypewriter = false) {
  const wrapper = document.createElement("div");
  wrapper.className = "msg " + (role === "user" ? "user" : "assistant");

  const inner = document.createElement("div");
  inner.className = "msg-content";

  // 用户消息直接当普通文本
  if (role === "user") {
    inner.textContent = content;
  } else {
    // 助手消息使用 Markdown 渲染为 HTML
    const html = marked.parse(content || "");
    if (useTypewriter) {
      // 打字机效果
      typeWriter(inner, html);
    } else {
      inner.innerHTML = html;
    }
  }

  wrapper.appendChild(inner);
  chatEl.appendChild(wrapper);
  chatEl.scrollTop = chatEl.scrollHeight;
}

/**
 * 打字机效果：逐字符显示 HTML 字符串
 */
function typeWriter(container, html) {
  // 为了不破坏 HTML 结构，我们这里简单按字符插入 innerHTML
  let i = 0;
  const speed = 15; // 数值越小越快

  const timer = setInterval(() => {
    container.innerHTML = html.slice(0, i);
    i++;
    if (i > html.length) {
      clearInterval(timer);
    }
    chatEl.scrollTop = chatEl.scrollHeight;
  }, speed);
}

sendBtn.onclick = async () => {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  messages.push({ role: "user", content: text });
  addMessage("user", text);

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages
      })
    });

    const data = await resp.json();
    console.log("API 返回内容：", data);

    const reply = data.choices?.[0]?.message?.content || "（无返回内容）";

    messages.push({ role: "assistant", content: reply });
    // 助手消息启用打字机效果
    addMessage("assistant", reply, true);
  } catch (e) {
    console.error(e);
    addMessage("assistant", "请求出错了，请稍后再试。", false);
  }
};

// 回车发送（可选）
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

/**
 * 深色模式切换
 * 使用 localStorage 记住用户选择
 */
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggleBtn.textContent = "切换浅色模式";
  } else {
    document.body.classList.remove("dark");
    themeToggleBtn.textContent = "切换深色模式";
  }
  localStorage.setItem("theme", theme);
}

// 初始化主题
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggleBtn.onclick = () => {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
};