const API_URL = "https://你的workers子域名.workers.dev"; // 之后会教你配置
const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("send");

let messages = [];

function addMessage(role, content) {
  const div = document.createElement("div");
  div.className = "msg " + (role === "user" ? "user" : "assistant");
  div.textContent = content;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

sendBtn.onclick = async () => {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  messages.push({ role: "user", content: text });
  addMessage("user", text);

  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen2.5-7b-instruct",
      messages
    })
  });

  const data = await resp.json();
  const reply = data.choices?.[0]?.message?.content || "（无返回内容）";

  messages.push({ role: "assistant", content: reply });
  addMessage("assistant", reply);
};
