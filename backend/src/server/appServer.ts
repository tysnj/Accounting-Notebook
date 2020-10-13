import express from 'express';

const bodyParser = require('body-parser');
import { validate as uuidValidate } from 'uuid';
import { Balance } from '../models/Balance';
import { Transaction } from '../models/Transaction';

export function createAppServer(balance: Balance) {
  const appServer = express();
  appServer.use(bodyParser.json());

  // Router loading
  appServer.get('/', (req, res) => res.send('Server is alive'));

  // default routes
  appServer.get('/api', async (req, res) => {
    res.status(200).send({balance: await balance.getValue()});
  });

  // transaction routes
  appServer.get('/api/transactions', async (req, res) => {
    res.status(200).send(await balance.getTransactions());
  });
  appServer.get('/api/transactions/:transactionId', async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      if (!uuidValidate(transactionId)) {
        res.status(400).send('invalid ID supplied');
        return;
      }

      const transaction = await balance.getTransaction(transactionId);
      res.status(200).send(transaction);

    } catch (e) {
      res.status(404).send('transaction not found');
    }
  });
  appServer.post('/api/transactions', async (req, res) => {
    const body = req.body;
    try {
      const transaction = Transaction.fromJSON(body);
      await balance.apply(transaction);
      res.status(200).send(transaction);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  return appServer;
}
