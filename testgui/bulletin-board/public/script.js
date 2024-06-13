document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messageForm = document.getElementById('messageForm');
    const messagesDiv = document.getElementById('messages');

    // メッセージを表示する関数
    const displayMessage = (message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const usernameElement = document.createElement('div');
        usernameElement.classList.add('username');
        usernameElement.textContent = message.username;

        const messageContentElement = document.createElement('div');
        messageContentElement.classList.add('message-content');
        messageContentElement.textContent = message.message;

        messageElement.appendChild(usernameElement);
        messageElement.appendChild(messageContentElement);

        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // サーバーからのメッセージを取得して表示
    fetch('/messages')
        .then(response => response.json())
        .then(data => {
            data.forEach(displayMessage);
        });

    // フォームの送信処理
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const message = document.getElementById('message').value.trim();

        if (username && message) {
            const messageData = { username, message };

            // メッセージをサーバーに送信
            fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            })
            .then(response => response.json())
            .then(data => {
                displayMessage(data);
                document.getElementById('message').value = '';
            })
            .catch(error => console.error('Error:', error));
        }
    });

    // 新しいメッセージがサーバーから送信されたときに表示
    socket.on('newMessage', (message) => {
        displayMessage(message);
    });
});