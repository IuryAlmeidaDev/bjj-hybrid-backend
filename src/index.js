// backend/src/index.js
import { createAppServer } from './api/server.js';

const port = Number(process.env.PORT || 8080);
const server = createAppServer();

server.listen(port, '0.0.0.0', () => {
  console.log(`BJJ Hybrid Node.js API listening on :${port}`);
});
