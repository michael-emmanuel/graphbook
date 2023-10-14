import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';

import path from 'path';

const root = path.join(__dirname, '../../');

const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['self'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', '*.amazonaws.com'],
    },
  })
);

app.use('/', express.static(path.join(root, 'dist/client')));

app.use('/uploads', express.static(path.join(root, 'uploads')));

app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000!'));
