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
  
// debugging

  async function addFileToIPFS(file) {
    try {
      const node = await Ipfs.create();
      const { cid } = await node.add(file);
      await node.stop();
      console.log(`File ${file.name} added to IPFS with CID: ${cid}`);
      return cid.toString();
    } catch (error) {
      console.error(`Error adding file ${file.name} to IPFS:`, error);
      throw error;
    }
  }
  