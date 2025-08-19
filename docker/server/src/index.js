import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { appRouter, createContext } from './trpc/router.js';
import { initDatabase } from './db/sqlite.js';
import { setupSocketHandlers } from './socket/handlers.js';
import { logger } from './utils/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:3011',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initDatabase();

// tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => createContext({ req, res, io }),
  })
);

// Socket.io handlers
setupSocketHandlers(io);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../../client/build');
  app.use(express.static(clientPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
} else {
  // Development endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: 'development' });
  });
}

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
httpServer.listen(PORT, () => {
  logger.info(`BMAD Context Engineering Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`Database: ${process.env.DATABASE_PATH}`);
});