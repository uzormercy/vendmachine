import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './utils/logger';

import routes from './routes';

const app = express();

const whiteList = '*';

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Access Denied'));
    }
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json(), morgan('dev'), cors(corsOptions));

routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
    );
  });
}

export default app;
