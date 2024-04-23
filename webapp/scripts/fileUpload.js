// Get references to DOM elements
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

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

  // Notify main.js that files have been uploaded
  window.dispatchEvent(new CustomEvent('filesUploaded'));
}

const uploadButton = document.getElementById('uploadButton');


uploadButton.addEventListener('click', () => {
  // Trigger file upload functionality
  fileInput.click();
});

// Disable the upload button initially
uploadButton.disabled = true;

// Enable the upload button when files are selected
fileInput.addEventListener('change', () => {
  uploadButton.disabled = fileInput.files.length === 0;
});


// Function to get the uploaded files
function getUploadedFiles() {
  return uploadedFiles;
}

// Export functions
export { getUploadedFiles };
