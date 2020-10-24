import { Account } from '../models/Account';
import { Transaction } from '../models/Transaction';

const defaultAccount = new Account();

export class Accounting {
  private account: Account;

  constructor(account: Account = defaultAccount) {
    this.account = account;
  }

  saveTransaction(transaction: Transaction): Promise<Transaction> {
    return this.account.commit(transaction);
  }

  getTransactionInHistory(id: string): Promise<Transaction> {
    return this.account.getTransaction(id);
  }

  getTransactionHistory(): Promise<Transaction[]> {
    return this.account.getTransactions();
  }

  getBalanceValue(): Promise<number> {
    return this.account.getValue();
  }

}
