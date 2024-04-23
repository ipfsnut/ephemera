import axios from 'https://cdn.skypack.dev/axios';

// Function to send a single file to the SmartClick API
async function sendFileToAPI(file) {
  // Get the CID of the uploaded file
  const cid = await addFileToIPFS(file);

  // Construct the IPFS URL with the CID
  const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;

  // Send file to SmartClick API
  const options = {
    method: 'POST',
    url: 'https://emotion-detection2.p.rapidapi.com/emotion-detection',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '26f1a149b2msh0378a4df010a07cp144cadjsn717c2cd6561f',
      'X-RapidAPI-Host': 'emotion-detection2.p.rapidapi.com'
    },
    data: {
      url: ipfsUrl
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error sending file to SmartClick API:', error);
    return null;
  }
}

// Import the addFileToIPFS function from ipfsUpload.js
import { addFileToIPFS } from './ipfsUpload.js';

// Export the sendFileToAPI function
export { sendFileToAPI };
