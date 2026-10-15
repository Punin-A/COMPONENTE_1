import { createApp } from './app.js';
import { config } from './config.js';
import { ensureDataFile } from './repositories/records.repository.js';

async function startServer() {
  try {
    await ensureDataFile();
    createApp().listen(config.port, () => {
      console.log(`API disponible en http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar la API:', error.message);
    process.exitCode = 1;
  }
}

startServer();
