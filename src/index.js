import app from './server.js';
import dbConnection from './db.js';

const port = 4000 ;

dbConnection.getConnect();

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});
