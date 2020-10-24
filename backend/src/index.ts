import { createAppServer } from './server/appServer';
import { Account } from './models/Account';

const PORT = 8000;
const userAccount = new Account();
const appServer = createAppServer(userAccount);

appServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
