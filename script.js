// ⚠️ 警告：把 Key 写在前端代码里是不安全的！
// 如果你的网站是公开的，别人可能会盗用你的 Key。
// 建议：仅自己测试使用，或者设置 API Key 的额度限制。

const API_KEY = 'sk-xxxxxxxxxxxx'; // 在这里填入你的 API Key
const API_URL = 'https://api.deepseek.com/chat/completions'; // 如果用 OpenRouter，这里换成 OpenRouter 的地址

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = inputField.value;

    if (!userText) return;

    // 1. 显示用户的消息
    chatBox.innerHTML += `<div class="message user">你: ${userText}</div>`;
    inputField.value = '';

    // 2. 准备发送给 AI 的数据
    const data = {
        model: "deepseek-chat", // 这里填你想用的模型名字，例如 "mistralai/mistral-7b-instruct"
        messages: [
            {"role": "system", "content": "你是一个乐于助人的AI助手。"},
            {"role": "user", "content": userText}
        ]
    };

    try {
        // 3. 发送请求给 API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const aiText = result.choices[0].message.content;

        // 4. 显示 AI 的回复
        chatBox.innerHTML += `<div class="message ai">AI: ${aiText}</div>`;
        
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += `<div class="message error">出错了，请检查网络或 Key。</div>`;
    }
}