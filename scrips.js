const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const topicSelect = document.getElementById("topic");
const clearButton = document.getElementById("clear-btn");
const storageStatus = document.getElementById("storage-status");

// Restore the two saved fields when the page loads.
window.addEventListener("DOMContentLoaded", function () {
  try {
    const savedName = localStorage.getItem("visitorName");
    const savedTopic = localStorage.getItem("visitorTopic");

    if (savedName !== null) {
      nameInput.value = savedName;
    }

    if (savedTopic !== null) {
      const topicExists = Array.from(topicSelect.options).some(
        function (option) {
          return option.value === savedTopic;
        }
      );

      if (topicExists) {
        topicSelect.value = savedTopic;
      }
    }
  } catch (error) {
    storageStatus.textContent =
      "Browser storage is unavailable. Your data cannot be restored.";
  }
});

// Browser validation runs before this submit handler.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  try {
    localStorage.setItem("visitorName", nameInput.value);
    localStorage.setItem("visitorTopic", topicSelect.value);

    storageStatus.textContent =
      "Your name and topic were saved in this browser. No message was sent.";

    alert("Thanks, " + nameInput.value + "! Saved locally.");
  } catch (error) {
    storageStatus.textContent =
      "Your browser could not save the data. Check its storage settings.";
  }
});

// Remove only this page's saved fields and reset the form.
clearButton.addEventListener("click", function () {
  try {
    localStorage.removeItem("visitorName");
    localStorage.removeItem("visitorTopic");

    form.reset();
    nameInput.value = "";
    topicSelect.value = "";

    storageStatus.textContent = "Saved name and topic have been cleared.";
    alert("Saved data cleared.");
  } catch (error) {
    storageStatus.textContent =
      "Saved data could not be cleared. Check your browser settings.";
  }
});s