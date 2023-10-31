const axios = require('axios');

const apiUrl = 'http://localhost:3000/users/';

// Function to generate random data
function generateRandomData() {
  const randomString = Math.random().toString(36).substring(7);
  return {
    name: `User_${randomString}`,
    lastname: `Lastname_${randomString}`,
    email: `${randomString}@example.com`,
    username: `user_${randomString}`,
    password: `password_${randomString}`,
  };
}

// Number of requests to send
const numRequests = 10000;

// Send POST requests
async function sendRequests() {
  for (let i = 0; i < numRequests; i++) {
    const randomData = generateRandomData();

    try {
      const response = await axios.post(apiUrl, randomData);
      console.log(`Request ${i + 1}: Status ${response.status}`);
    } catch (error) {
      console.error(`Request ${i + 1}: Error ${(error as Error).message}`);
    }
  }
}

sendRequests();
