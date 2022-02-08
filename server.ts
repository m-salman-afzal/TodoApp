import { config } from './config';
import { app } from './Http/App';
import { sequelize } from './mysql_db';

sequelize
  .sync()
  .then(() => {
    console.log(
      '--------------------------------\n Sequelize Connection Successful\n--------------------------------'
    );
  })
  .catch((err: any) => console.log(err));

// * Connect to Node Server
const ip: string = config.IP || '127.0.0.1';

const port: number = config.PORT || 8000;

const server: object = app.listen(port, ip, () => {
  console.log(`
-----------------------------
 Listening to ${ip}:${port}
-----------------------------`);
});
