document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messagesDiv = document.getElementById('messages');

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const message = document.getElementById('message').value.trim();

        if (username && message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');

            const usernameElement = document.createElement('div');
            usernameElement.classList.add('username');
            usernameElement.textContent = username;

            const messageContentElement = document.createElement('div');
            messageContentElement.classList.add('message-content');
            messageContentElement.textContent = message;

            messageElement.appendChild(usernameElement);
            messageElement.appendChild(messageContentElement);

            messagesDiv.appendChild(messageElement);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            messageForm.reset();
        }
    });
});