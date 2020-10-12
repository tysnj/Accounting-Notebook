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
  appServer.get('/api', (req, res) => {
    res.status(200).send({balance: balance.getValue()});
  });

  // transaction routes
  appServer.get('/api/transactions', (req, res) => {
    res.status(200).send(balance.getTransactions());
  });
  appServer.get('/api/transactions/:transactionId', (req, res) => {
    const transactionId = req.params.transactionId;
    if (!uuidValidate(transactionId)) {
      res.status(400).send('invalid ID supplied');
      return;
    }

    const transaction = balance.getTransaction(transactionId);

    if (transaction) {
      res.status(200).send(transaction);
    } else {
      res.status(404).send('transaction not found');
    }
  });
  appServer.post('/api/transactions', (req, res) => {
    const body = req.body;
    try {
      const transaction = Transaction.fromJSON(body);
      balance.apply(transaction);
      res.status(200).send(transaction);
    } catch (e) {
      res.status(400).send('Invalid input');
    }
  });

  return appServer;
}
