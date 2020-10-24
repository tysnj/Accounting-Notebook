import express from 'express';

const bodyParser = require('body-parser');
const cors = require('cors')
import { validate as uuidValidate } from 'uuid';

import { Account } from '../models/Account';
import { Transaction } from '../models/Transaction';
import { Accounting } from '../services/Accounting';

export function createAppServer(account: Account) {
  const appServer = express();
  appServer.use(bodyParser.json());
  appServer.use(cors());

  const accountingService = new Accounting(account);

  // Router loading
  appServer.get('/', (req, res) => res.send('Server is alive'));

  // default routes
  appServer.get('/api', async (req, res) => {
    res.status(200).send({balance: await accountingService.getBalanceValue()});
  });

  // transaction routes
  appServer.get('/api/transactions', async (req, res) => {
    res.status(200).send(await accountingService.getTransactionHistory());
  });
  appServer.get('/api/transactions/:transactionId', async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      if (!uuidValidate(transactionId)) {
        res.status(400).send('invalid ID supplied');
        return;
      }

      const transaction = await accountingService.getTransactionInHistory(transactionId);
      res.status(200).send(transaction);

    } catch (e) {
      res.status(404).send('transaction not found');
    }
  });
  appServer.post('/api/transactions', async (req, res) => {
    const body = req.body;
    try {
      const transaction = Transaction.fromJSON(body);
      await accountingService.saveTransaction(transaction);
      res.status(200).send(transaction);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  return appServer;
}
