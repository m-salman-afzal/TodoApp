import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './Http/App.js';
import Sequelize from 'sequelize';
import { sequelize } from './mysql_db.js';

// dotenv.config({ path: 'config.env' });

// * Connect to MongoDb Atlas
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

sequelize
  .sync()
  .then((result) => {
    console.log(
      '--------------------------------\n Sequelize Connection Successful\n--------------------------------'
    );
  })
  .catch((err) => console.log(err));

// mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
//   console.log(
//     '--------------------------------\n Mongoose Connection Successful\n--------------------------------'
//   );
// });

// * Connect to Node Server
const ip = process.env.IP || '127.0.0.1';

const port = process.env.PORT || 8000;

const server = app.listen(port, ip, () => {
  console.log(`
-----------------------------
 Listening to ${ip}:${port}
-----------------------------`);
});
