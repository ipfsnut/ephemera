// Function to add a file to the local IPFS node
async function addFileToIPFS(file) {
    // Create a new instance of the IPFS node
    const node = await Ipfs.create();
  
    // Add the file to the IPFS node
    const { cid } = await node.add(file);
  
    // Stop the IPFS node
    await node.stop();
  
    // Return the CID of the added file
    return cid.toString();
  }
  
  // Export the addFileToIPFS function
  export { addFileToIPFS };
  