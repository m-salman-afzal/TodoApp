import sequelize from 'sequelize';
import { config } from '../config';
import { app } from '../Http/App';
import { sequel } from '../Infrastructure/Connections/mysql_db';

sequel
  .sync()
  .then(() => {
    console.log(
      '--------------------------------\n Sequelize Connection Successful\n--------------------------------'
    );
  })
  .catch((err: sequelize.Error) => console.log(err));

// * Connect to Node Server
const ip: string = config.IP || '127.0.0.1';

const port: number = +config.PORT || 8000;

const server: object = app.listen(port, ip, () => {
  console.log(`
-----------------------------
 Listening to ${ip}:${port}
-----------------------------`);
});
