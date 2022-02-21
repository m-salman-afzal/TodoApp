import sequelize from 'sequelize';
import { config } from '../config';
import { app } from '../Http/App';
import { sequel } from '../App/Infrastructure/Database/Connections/mysql_db';
process.on('uncaughtException', (error: Error) => {
  console.log('Uncaught Exception. Shutting Down...⏬⏬');
  console.log('🤡🤡Error Name: ', error.name, 'Error Message: ', error.message);
});

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

const server = app.listen(port, ip, () => {
  console.log(`
-----------------------------
 Listening to ${ip}:${port}
-----------------------------`);
});

process.on('unhandledRejection', (error: Error) => {
  console.log('Unhandled Rejection. Shutting Down...⏬⏬');
  console.log('🤡🤡Error Name: ', error.name, 'Error Message: ', error.message);

  server.close(() => {
    process.exit(1);
  });
});
