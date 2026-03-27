const http = require('http');
const app = require('./app');
const { connectDB } = require('./db');
const { port } = require('./config/env.config');

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Server startup failed', err);
    process.exit(1);
  }
};

startServer();

module.exports = server;