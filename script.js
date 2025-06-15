document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userMessage = document.querySelector('#message').value;
  const chatBox = document.querySelector('#chatbox');

  chatBox.innerHTML += `<div class="user">🧍‍♂️ ${userMessage}</div>`;

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();

  chatBox.innerHTML += `<div class="bot">🤖 ${data.reply}</div>`;
  document.querySelector('#message').value = '';
});
