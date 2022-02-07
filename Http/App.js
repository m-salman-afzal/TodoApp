import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';

import { routeError } from './Controllers/ErrorController.js';
import { router as itemRouter } from './Routes/ItemRoutes.js';
import { router as userRouter } from './Routes/UserRoutes.js';
import { router as viewRouter } from './Routes/ViewRoutes.js';
import { AppError } from '../Utils/AppError.js';

// * Init Express server
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./public'));

// * Init cookie based session
app.use(
  cookieSession({
    name: 'test123',
    secret: 'many is so coool',
    maxAge: 1000 * 60 * 60,
  })
);

// * Use morgan package to get console log of requests and responses
app.use(morgan('dev'));

// TODO Ask why the following middle does not work as expected
// app.use((req, res, next) => {
//   req.reqTime = new Date().toISOString();
//   console.log(req.reqTime);
//   next();
// });

app.use(express.json());

// * Define main routes which are then extended with queries and Ids
app.use('/', viewRouter);
app.use('/todoApi/items', itemRouter);
app.use('/todoApi/users', userRouter);

// * Capture any and all routes or corresponding http methods that are not defined.
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Unable to find ${req.originalUrl} for the ${req.method} method`,
      404
    )
  );
});

// * Global Error Handling Middleware
app.use(routeError);

export { app };
