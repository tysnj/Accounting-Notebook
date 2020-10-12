import { Transaction, TransactionType } from './Transaction';

export interface BalanceInterface {
  getValue(): number;
  getTransactions(): Transaction[];
  getTransaction(id: string): Transaction | undefined;
  apply(transaction: Transaction): Transaction;
}

const INITIAL_VALUE = 0;

export class Balance implements BalanceInterface {
  private value: number;
  private transactions: Transaction[];

  constructor(value: number = INITIAL_VALUE) {
    this.value = value;
    this.transactions = [];
  }

  getValue(): number {
    return this.value;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransaction(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  private canConfirm(transaction: Transaction): boolean {
    // If transaction is credit, it can always be accepted
     return (transaction.type === TransactionType.DEBIT ? this.value >= transaction.amount : true);
  }

  apply(transaction: Transaction): Transaction {
    if (!this.canConfirm(transaction)) throw new Error('Not enough founds');

    // update value
    if (transaction.type === TransactionType.DEBIT) this.value -= transaction.amount;
    else this.value += transaction.amount;

    // save history
    transaction.confirm();
    this.transactions.push(transaction);

    return transaction;
  }

}
