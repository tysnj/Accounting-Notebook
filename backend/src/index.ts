import { createAppServer } from './server/appServer';
import { Balance } from './models/Balance';

const PORT = 8000;
const userBalance = new Balance();
const appServer = createAppServer(userBalance);

appServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
