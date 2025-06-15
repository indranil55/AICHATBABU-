document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userMessage = document.querySelector('#message').value.trim();
  const chatBox = document.querySelector('#chatbox');

  if (!userMessage) return;

  // ✅ ইউজার মেসেজ DOM-এ textContent দিয়ে বসানো (নিরাপদ)
  const userDiv = document.createElement('div');
  userDiv.className = 'user';
  userDiv.textContent = `🧍‍♂️ ${userMessage}`;
  chatBox.appendChild(userDiv);

  // Clear input
  document.querySelector('#message').value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // ✅ বট মেসেজ DOM-এ textContent দিয়ে বসানো (নিরাপদ)
    const botDiv = document.createElement('div');
    botDiv.className = 'bot';
    botDiv.textContent = `🤖 ${data.reply}`;
    chatBox.appendChild(botDiv);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bot';
    errorDiv.textContent = '⚠️ উত্তর আনতে সমস্যা হয়েছে!';
    chatBox.appendChild(errorDiv);
  }
});
