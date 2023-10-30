let started = false;

function fetchRandomQuestion() {
    fetch('http://localhost:3000/randomQuestion')
        .then(response => response.json())
        .then(data => {
            appendMessage(data.question, 'assistant');
        })
        .catch(error => {
            console.error('질문을 가져오는 데 문제가 발생했습니다:', error);
        });
}

function startMBTI() {
    if (!started) {
        started = true;
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('answerButtons').style.display = 'block';
        appendMessage('MBTI 테스트를 시작합니다!', 'assistant');
        fetchRandomQuestion();
    }
}

function submitAnswer(answer) {
    fetch('http://localhost:3000/submitAnswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer })
    })
    .then(() => {
        appendMessage(answer, 'user');
        fetchRandomQuestion();
    })
    .catch(error => {
        console.error('답변 제출 중 오류가 발생했습니다:', error);
    });
}

function appendMessage(message, role) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${role}`;
    messageElement.innerText = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}
