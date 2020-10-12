import { Balance } from '../models/Balance';
import { Transaction } from '../models/Transaction';

const defaultBalance = new Balance();

export class AccountingService {
  private balance: Balance;

  constructor(balance: Balance = defaultBalance) {
    this.balance = balance;
  }

  saveTransaction(transaction: Transaction): Transaction {
    return this.balance.apply(transaction);
  }

  getTransactionInHistory(id: string) {
    return this.balance.getTransaction(id);
  }

  getTransactionHistory(): Transaction[] {
    return this.balance.getTransactions();
  }

  getBalanceStatus() {
    return this.balance.getValue();
  }

}
