
document.addEventListener('DOMContentLoaded', function () {
  // Display "this is not a YouTube page" if the user is not on a YouTube page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (!currentTab.url.includes('youtube.com')) {
      document.getElementById('caption-text').textContent = 'This is not a YouTube page.';
    }
  });

  // Trigger the download of stored captions when the "Download Captions" button is clicked
  document.getElementById('download-captions').addEventListener('click', function () {
    // Send a message to the content script to trigger the download
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'downloadCaptions' });
    });
  });
  // Trigger opening of new page when the "start quiz" button is clicked
  document.getElementById('start-quiz').addEventListener('click', function () {
    // open a new tab which is quiz.html
    chrome.tabs.create({ url: 'quiz.html' });
    });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.captionText) {
    document.getElementById('caption-text').textContent = request.captionText;
  }
});

