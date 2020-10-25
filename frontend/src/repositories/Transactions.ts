import axios from 'axios';

import { Repository } from './Repository';
import { Transaction } from '../stories/Transaction';

export class TransactionsRepository implements Repository<Transaction> {

  async getAll(): Promise<Transaction[]> {
    const transactionsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions`);
    return transactionsResponse.data;
  }
}
