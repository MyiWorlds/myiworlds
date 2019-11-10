import * as express from 'express';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/


const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to graphql-api!' });
});

const port = process.env.port || 8000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
