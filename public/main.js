window.onload = () => {
  const messageContainer = document.querySelector("ul");
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
};
