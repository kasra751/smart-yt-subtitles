// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === 'initiateDownload') {
    downloadCaptions(request.captionText);
  }
});

// Function to download captions
function downloadCaptions(captionText) {
  if (captionText === '') {
    console.error('No captions available.');
    return;
  }

  const blob = new Blob([captionText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: 'all_subs.txt',
    saveAs: true // Prompt the user to save the file
  });
}