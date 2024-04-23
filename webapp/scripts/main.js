// Import necessary functions or modules
import { getUploadedFiles } from './fileUpload.js';
import { addFileToIPFS } from './ipfsUpload.js';
import { sendFileToAPI } from './apiIntegration.js'; // Assuming there's a file for API integration

// Get references to DOM elements
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const emotionResults = document.getElementById('emotionResults');
const sendFilesButton = document.getElementById('sendFilesButton');

// Event listener for file upload
fileInput.addEventListener('change', handleFileUpload);

// Event listener for sending files to the API
sendFilesButton.addEventListener('click', sendFilesToAPI);

// Function to handle file upload
function handleFileUpload(event) {
  // Clear previous file list
  fileList.innerHTML = '';

  // Get uploaded files
  const uploadedFiles = getUploadedFiles();

  // Loop through uploaded files and add them to the file list
  uploadedFiles.forEach((file) => {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  });

  // Enable the "Send Files" button if there are uploaded files
  sendFilesButton.disabled = uploadedFiles.length === 0;
}

// Server Debugging Scripts:

// Get references to debug panel and manual testing elements
const debugPanel = document.getElementById('debugPanel');
const cidInput = document.getElementById('cidInput');
const testCidButton = document.getElementById('testCidButton');

// Function to log messages to the debug panel
function logToDebugPanel(message) {
  const logElement = document.createElement('div');
  logElement.textContent = message;
  debugPanel.appendChild(logElement);
}

// Event listener for manual CID testing
testCidButton.addEventListener('click', () => {
  const cid = cidInput.value;
  // Call a function to test the CID (e.g., sendFileToAPI)
  sendFileToAPI(cid)
    .then(result => logToDebugPanel(`Result: ${result}`))
    .catch(error => logToDebugPanel(`Error: ${error}`));
});



// Function to send files to the API
async function sendFilesToAPI() {
  // Get uploaded files
  const uploadedFiles = getUploadedFiles();

  // Loop through uploaded files
  for (const file of uploadedFiles) {
    // Add file to IPFS and get the CID
    const cid = await addFileToIPFS(file);

    // Send file to the API (replace with your API integration logic)
    const result = await sendFileToAPI(cid);

    // Display the result in the emotion results section
    const resultElement = document.createElement('div');
    resultElement.textContent = `File: ${file.name}, Result: ${result}`;
    emotionResults.appendChild(resultElement);
  }
}
