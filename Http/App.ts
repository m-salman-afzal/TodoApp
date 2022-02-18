import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';

import { routeError } from './Controllers/ErrorController';
import { router as itemRouter } from './Routes/ItemRoutes';
import { router as userRouter } from './Routes/UserRoutes';
import * as AppError from '../Utils/BaseError';

// * Init Express server
const app: express.Application = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./public'));

// * Init cookie based session
// app.use(
//   cookieSession({
//     name: 'test123',
//     secret: 'many is so coool',
//     maxAge: 1000 * 60 * 60,
//   })
// );

// * Use morgan package to get console log of requests and responses
app.use(morgan('dev'));

// TODO Ask why the following middle does not work as expected
// app.use((req, res, next) => {
//   req.reqTime = new Date().toISOString();
//   console.log(req.reqTime);
//   next();
// });

app.use(express.json());
app.all('*', (req, res, next) => {
  next(
    new AppError.NotFound(
      `Unable to find ${req.originalUrl} for the ${req.method} method`
    )
  );
});
// * Define main routes which are then extended with queries and Ids
app.use('/todoApi/items', itemRouter);
app.use('/todoApi/users', userRouter);

// * Capture any and all routes or corresponding http methods that are not defined.

// * Global Error Handling Middleware
app.use(routeError);

export { app };
