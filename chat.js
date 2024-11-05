document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const userInput = document.getElementById("user-input");
  const message = userInput.value;

  if (message.trim() === "") return;

  addMessage(message, "user-message"); // Thêm tin nhắn của người dùng vào giao diện
  userInput.value = "";

  fetch("http://localhost:5005/webhooks/rest/webhook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sender: "user", // ID người dùng
      message: message // Tin nhắn của người dùng
    })
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((response) => {
        if (response.text) {
          addMessage(response.text, "bot-message"); // Thêm tin nhắn của chatbot vào giao diện
        }
      });
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      addMessage("Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.", "bot-message");
    });
}

function addMessage(text, className) {
  const messageContainer = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.className = "message " + className;
  messageElement.innerText = text;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
