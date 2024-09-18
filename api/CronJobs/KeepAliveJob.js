
// this file make sure to keep the server warm, using cron scheduling job for 1 min

const cron = require('node-cron');
const axios = require('axios');

const keepServerAlive = async () => {
  try {
    const response = await axios.get('https://unqiue-carving.onrender.com/keep-alive');
    console.log('Keep-alive request successful:', response.data);
  } catch (error) {
    console.error('Error making keep-alive request:', error);
  }
};

cron.schedule('*/5 * * * *', () => {
  console.log('Running keep-alive job...');
  keepServerAlive();
});
