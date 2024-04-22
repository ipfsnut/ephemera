// Get references to DOM elements
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const emotionResults = document.getElementById('emotionResults');
const sendFilesButton = document.getElementById('sendFilesButton');
const sendFilesIcon = document.getElementById('sendFilesIcon');

// Array to store uploaded files
let uploadedFiles = [];

// Event listener for file input
fileInput.addEventListener('change', handleFileUpload);

// Function to handle file upload
function handleFileUpload(event) {
  const files = event.target.files;

  // Clear previous file list
  fileList.innerHTML = '';

  // Loop through uploaded files
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Add file to uploadedFiles array
    uploadedFiles.push(file);

    // Create list item for file
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }

  // Enable "Send Files to API" button
  sendFilesButton.disabled = false;
}

// Event listener for "Send Files to API" button
sendFilesButton.addEventListener('click', sendFilesToAPI);

// Function to send files to API
async function sendFilesToAPI() {
  // Disable "Send Files to API" button and show spinner
  sendFilesButton.disabled = true;
  sendFilesIcon.classList.add('spinner');

  // Loop through uploaded files
  for (let i = 0; i < uploadedFiles.length; i++) {
    const file = uploadedFiles[i];

    // Send file to SmartClick API
    const result = await sendFileToAPI(file);

    // Display emotion detection result
    displayResult(result);

    // Wait for the next file to be processed (adjust delay as needed)
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Re-enable "Send Files to API" button and hide spinner
  sendFilesButton.disabled = false;
  sendFilesIcon.classList.remove('spinner');
}

// Function to send a single file to the SmartClick API
async function sendFileToAPI(file) {
  // Convert file to base64 string
  const base64 = await convertToBase64(file);

  // Send file to SmartClick API (replace with actual API call)
  const response = await fetch('https://api.smartclick.com/emotion-detection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ file: base64 })
  });

  // Return the API response
  return response.json();
}

// Function to convert a file to base64 string
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
}

// Function to display emotion detection result
function displayResult(result) {
  const resultElement = document.createElement('div');
  resultElement.textContent = `Emotion: ${result.emotion}`;
  emotionResults.appendChild(resultElement);
}
