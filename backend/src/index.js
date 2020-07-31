const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode JWT for each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.DFC_APP_SECRET);
    req.userId = userId;
  }

  next();
});

// middleware for populating user
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await db.query.user({ where: { id: req.userId } }, '{ id, permissions, email, name }');
  req.user = user;

  return next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.DFC_FRONTEND_URL,
    },
    port: process.env.DFC_PORT,
  },
  (details) => {
    // eslint-disable-next-line
    console.log(`Server is now running on port http://localhost:${details.port}`);
  },
);
