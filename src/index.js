// backend/src/index.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAppServer } from './api/server.js';
import { DEFAULT_WORKOUTS } from './data/defaultWorkouts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const persistFilePath = path.resolve(__dirname, '../data/runtime_store.json');

const port = Number(process.env.PORT || 8080);
const server = createAppServer(DEFAULT_WORKOUTS, { persistFilePath });

server.listen(port, '0.0.0.0', () => {
  console.log(`BJJ Hybrid Node.js API listening on http://localhost:${port}`);
});
