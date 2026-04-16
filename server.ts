import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mock match data update endpoint
  app.post('/api/admin/update-data', (req, res) => {
    console.log('Fetching latest match data from Kaggle...');
    res.json({ 
      message: 'Dataset updated and models retrained successfully.',
      lastUpdated: new Date().toISOString(),
      matchesAdded: 1,
      modelAccuracy: '84.2%'
    });
  });

  // Mock teams endpoint
  app.get('/api/teams', (req, res) => {
    res.json({ teams: ['CSK', 'MI', 'RCB', 'KKR', 'DC', 'RR', 'SRH', 'PBKS', 'GT', 'LSG'] });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
