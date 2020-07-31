// this file connects to the remote prisma DB
const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.DFC_PRISMA_ENDPOINT,
  secret: process.env.DFC_PRISMA_SECRET,
  debug: false,
});

module.exports = db;
