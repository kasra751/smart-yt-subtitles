// Check if the current page is a YouTube page
if (window.location.hostname === 'www.youtube.com') {
  let allCaptionText = '';

  // Create an observer to watch for changes in the caption segment
  const observer = new MutationObserver(function (mutationsList) {
    const captionSegments = document.getElementsByClassName('ytp-caption-segment');
    if (captionSegments.length > 0) {
      let captionText = '';
      for (let i = 0; i < captionSegments.length; i++) {
        captionText += captionSegments[i].textContent.trim();
      }
      allCaptionText = captionText;
    }


            //######
    if (allCaptionText.length > 0) {
    fetch('http://localhost:5000/process_data', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
     },
    body: JSON.stringify(allCaptionText.split('\n').filter(Boolean)),
      })
  .then((response) => response.json())
  .then((backendData) => {
    // Processed data received from the Flask backend
    // Do whatever you want to do with the processedData in your extension
    console.log(backendData[0])
    chrome.runtime.sendMessage({ captionText: backendData });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }
      //######

  });


  // Start observing changes in the caption segment
  observer.observe(document.body, { childList: true, subtree: true });



  // Listen for messages from the popup script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === 'downloadCaptions') {
      try {
        downloadCaptions();
      } catch (error) {
        console.error(error);
      }
    }
  });

  // Function to send a message to the background script to initiate the download
  function downloadCaptions() {
    if (allCaptionText === '') {
      throw new Error('No captions available.');
    } else {
      chrome.runtime.sendMessage({ command: 'initiateDownload', captionText: allCaptionText });
      allCaptionText = ''; // Clear the stored captions
    }
  }
}
